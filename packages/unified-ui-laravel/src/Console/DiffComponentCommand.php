<?php

declare(strict_types=1);

namespace Rajeshwar\UnifiedUi\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Rajeshwar\UnifiedUi\Registry;
use Rajeshwar\UnifiedUi\UnifiedUiServiceProvider;

class DiffComponentCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 */
	protected $signature = 'ui:diff
        {component? : Component name to diff}
        {--all : Diff all installed components}
        {--summary : Show only a summary without the full diff output}
        {--json : Output diff results as JSON}
        {--offline : Use only the local registry bundled with the package}';

	/**
	 * The console command description.
	 */
	protected $description = "Compare local Unified UI component files against the registry version";

	/**
	 * The filesystem instance.
	 */
	protected Filesystem $files;

	/**
	 * The registry instance.
	 */
	protected Registry $registry;

	/**
	 * The project config.
	 *
	 * @var array<string, mixed>
	 */
	protected array $config;

	/**
	 * Diff result constants.
	 */
	protected const STATUS_IDENTICAL = "identical";
	protected const STATUS_MODIFIED = "modified";
	protected const STATUS_NOT_INSTALLED = "not_installed";
	protected const STATUS_NOT_IN_REGISTRY = "not_in_registry";
	protected const STATUS_ERROR = "error";

	public function __construct(Filesystem $files)
	{
		parent::__construct();
		$this->files = $files;
	}

	/**
	 * Execute the console command.
	 */
	public function handle(): int
	{
		$offline = (bool) $this->option("offline");
		$this->registry = new Registry(preferRemote: !$offline);
		$this->config = UnifiedUiServiceProvider::readConfig();

		$componentNames = $this->resolveComponentNames();

		if (empty($componentNames)) {
			return self::FAILURE;
		}

		$results = [];

		foreach ($componentNames as $name) {
			$result = $this->diffComponent($name);
			$results[$name] = $result;
		}

		if ((bool) $this->option("json")) {
			$this->renderJson($results);
		} elseif ((bool) $this->option("summary")) {
			$this->renderSummaryTable($results);
		} else {
			$this->renderFullDiff($results);
		}

		// Return non-zero if any component was modified (useful for CI).
		$hasModifications = collect($results)->contains(function (
			array $result,
		) {
			return ($result["status"] ?? "") === self::STATUS_MODIFIED;
		});

		return $hasModifications ? 1 : self::SUCCESS;
	}

	/**
	 * Resolve which component names to diff.
	 *
	 * @return list<string>
	 */
	protected function resolveComponentNames(): array
	{
		if ((bool) $this->option("all")) {
			return $this->findInstalledComponents();
		}

		$name = $this->argument("component");

		if (is_string($name) && $name !== "") {
			$name = strtolower(trim($name));

			if (!$this->registry->has($name)) {
				$this->components->error(
					"Component [{$name}] not found in the registry.",
				);
				$this->newLine();
				$this->line(
					"  Run <fg=green>php artisan ui:list</> to see all available components.",
				);

				// Suggest similar names.
				$suggestions = $this->findSimilarNames($name);
				if (!empty($suggestions)) {
					$this->newLine();
					$this->line("  <fg=yellow>Did you mean:</>");
					foreach ($suggestions as $suggestion) {
						$this->line("    <fg=cyan>{$suggestion}</>");
					}
				}

				return [];
			}

			return [$name];
		}

		// Interactive mode: let the user pick from installed components.
		$installed = $this->findInstalledComponents();

		if (empty($installed)) {
			$this->components->warn(
				"No Unified UI components are installed in this project.",
			);
			$this->newLine();
			$this->line(
				"  Add components first: <fg=green>php artisan ui:add button</>",
			);
			return [];
		}

		$selected = $this->components->choice(
			"Which component would you like to diff?",
			array_merge(["All installed"], $installed),
			0,
		);

		if ($selected === "All installed") {
			return $installed;
		}

		return is_array($selected) ? $selected : [$selected];
	}

	/**
	 * Find all component names that are currently installed in the project.
	 *
	 * @return list<string>
	 */
	protected function findInstalledComponents(): array
	{
		$componentsPath = $this->resolveComponentsPath();
		$installed = [];

		if (!is_dir($componentsPath)) {
			return [];
		}

		$bladeFiles = glob($componentsPath . "/*.blade.php");

		if ($bladeFiles === false) {
			return [];
		}

		$registryNames = $this->registry->names();

		foreach ($bladeFiles as $file) {
			$filename = basename($file, ".blade.php");

			if (in_array($filename, $registryNames, true)) {
				$installed[] = $filename;
			}
		}

		sort($installed);

		return $installed;
	}

	/**
	 * Diff a single component against the registry version.
	 *
	 * @return array{status: string, files: list<array{path: string, status: string, local_lines: int, registry_lines: int, diff_lines?: list<string>}>}
	 */
	protected function diffComponent(string $name): array
	{
		$component = $this->registry->get($name);

		if ($component === null) {
			return [
				"status" => self::STATUS_NOT_IN_REGISTRY,
				"files" => [],
			];
		}

		$files = $component["files"] ?? [];
		$fileResults = [];
		$overallStatus = self::STATUS_IDENTICAL;

		foreach ($files as $file) {
			$fileResult = $this->diffFile($name, $file);
			$fileResults[] = $fileResult;

			if ($fileResult["status"] === self::STATUS_MODIFIED) {
				$overallStatus = self::STATUS_MODIFIED;
			} elseif (
				$fileResult["status"] === self::STATUS_NOT_INSTALLED &&
				$overallStatus === self::STATUS_IDENTICAL
			) {
				$overallStatus = self::STATUS_NOT_INSTALLED;
			}
		}

		return [
			"status" => $overallStatus,
			"files" => $fileResults,
		];
	}

	/**
	 * Diff a single file within a component.
	 *
	 * @return array{path: string, type: string, status: string, local_lines: int, registry_lines: int, additions: int, deletions: int, diff_lines: list<string>}
	 */
	protected function diffFile(string $componentName, array $file): array
	{
		$type = $file["type"] ?? "blade";
		$relativePath = $file["path"] ?? "";
		$localPath = $this->resolveLocalPath($file);

		$result = [
			"path" => $relativePath,
			"type" => $type,
			"status" => self::STATUS_IDENTICAL,
			"local_lines" => 0,
			"registry_lines" => 0,
			"additions" => 0,
			"deletions" => 0,
			"diff_lines" => [],
		];

		// Check if the local file exists.
		if ($localPath === null || !$this->files->exists($localPath)) {
			$result["status"] = self::STATUS_NOT_INSTALLED;
			return $result;
		}

		// Read local content.
		$localContent = $this->files->get($localPath);
		$result["local_lines"] = substr_count($localContent, "\n") + 1;

		// Fetch registry content.
		$registryContent = $this->registry->fetchFileContent($file);

		if ($registryContent === null) {
			$result["status"] = self::STATUS_ERROR;
			return $result;
		}

		$result["registry_lines"] = substr_count($registryContent, "\n") + 1;

		// Normalize line endings for comparison.
		$localNormalized = str_replace("\r\n", "\n", rtrim($localContent));
		$registryNormalized = str_replace(
			"\r\n",
			"\n",
			rtrim($registryContent),
		);

		if ($localNormalized === $registryNormalized) {
			$result["status"] = self::STATUS_IDENTICAL;
			return $result;
		}

		// Files differ — compute the diff.
		$result["status"] = self::STATUS_MODIFIED;
		$diffLines = $this->computeUnifiedDiff(
			$localNormalized,
			$registryNormalized,
			$relativePath,
		);
		$result["diff_lines"] = $diffLines;

		// Count additions and deletions.
		foreach ($diffLines as $line) {
			if (str_starts_with($line, "+") && !str_starts_with($line, "+++")) {
				$result["additions"]++;
			} elseif (
				str_starts_with($line, "-") &&
				!str_starts_with($line, "---")
			) {
				$result["deletions"]++;
			}
		}

		return $result;
	}

	/**
	 * Compute a unified diff between two strings.
	 *
	 * @return list<string>
	 */
	protected function computeUnifiedDiff(
		string $local,
		string $registry,
		string $filename,
	): array {
		$localLines = explode("\n", $local);
		$registryLines = explode("\n", $registry);

		$diff = [];

		// Header.
		$diff[] = "--- a/{$filename} (local)";
		$diff[] = "+++ b/{$filename} (registry)";

		// Use a simple LCS-based diff algorithm.
		$hunks = $this->generateHunks($localLines, $registryLines);

		foreach ($hunks as $hunk) {
			$diff[] = $hunk;
		}

		return $diff;
	}

	/**
	 * Generate diff hunks using a simple line-by-line comparison.
	 *
	 * This implements a basic unified diff with context lines,
	 * suitable for console display.
	 *
	 * @param list<string> $oldLines
	 * @param list<string> $newLines
	 * @return list<string>
	 */
	protected function generateHunks(
		array $oldLines,
		array $newLines,
		int $contextLines = 3,
	): array {
		$output = [];
		$oldLen = count($oldLines);
		$newLen = count($newLines);

		// Compute the longest common subsequence table.
		$lcs = $this->computeLcsTable($oldLines, $newLines);

		// Backtrack to produce the edit script.
		$edits = $this->backtrackLcs(
			$lcs,
			$oldLines,
			$newLines,
			$oldLen,
			$newLen,
		);

		// Group edits into hunks with context.
		$rawLines = [];
		$oldIdx = 0;
		$newIdx = 0;

		foreach ($edits as $edit) {
			switch ($edit["type"]) {
				case "equal":
					$rawLines[] = [
						"type" => " ",
						"line" => $edit["line"],
						"old" => $oldIdx,
						"new" => $newIdx,
					];
					$oldIdx++;
					$newIdx++;
					break;
				case "delete":
					$rawLines[] = [
						"type" => "-",
						"line" => $edit["line"],
						"old" => $oldIdx,
						"new" => $newIdx,
					];
					$oldIdx++;
					break;
				case "insert":
					$rawLines[] = [
						"type" => "+",
						"line" => $edit["line"],
						"old" => $oldIdx,
						"new" => $newIdx,
					];
					$newIdx++;
					break;
			}
		}

		// Now group into hunks with context.
		$hunks = $this->groupIntoHunks($rawLines, $contextLines);

		foreach ($hunks as $hunk) {
			$firstOld = null;
			$firstNew = null;
			$oldCount = 0;
			$newCount = 0;
			$lines = [];

			foreach ($hunk as $entry) {
				if ($firstOld === null) {
					$firstOld = $entry["old"];
					$firstNew = $entry["new"];
				}

				$prefix = $entry["type"];
				$lines[] = $prefix . $entry["line"];

				if ($prefix === " " || $prefix === "-") {
					$oldCount++;
				}
				if ($prefix === " " || $prefix === "+") {
					$newCount++;
				}
			}

			$oldStart = ($firstOld ?? 0) + 1;
			$newStart = ($firstNew ?? 0) + 1;

			$output[] = "@@ -{$oldStart},{$oldCount} +{$newStart},{$newCount} @@";

			foreach ($lines as $line) {
				$output[] = $line;
			}
		}

		return $output;
	}

	/**
	 * Compute the LCS length table for two arrays of lines.
	 *
	 * For very large files, we limit the comparison to avoid memory/time issues.
	 *
	 * @param list<string> $a
	 * @param list<string> $b
	 * @return array<array<int>>
	 */
	protected function computeLcsTable(array $a, array $b): array
	{
		$m = count($a);
		$n = count($b);

		// For very large files, fall back to a simpler approach.
		if ($m * $n > 1_000_000) {
			return $this->computeLcsTableSimple($a, $b);
		}

		$table = array_fill(0, $m + 1, array_fill(0, $n + 1, 0));

		for ($i = 1; $i <= $m; $i++) {
			for ($j = 1; $j <= $n; $j++) {
				if ($a[$i - 1] === $b[$j - 1]) {
					$table[$i][$j] = $table[$i - 1][$j - 1] + 1;
				} else {
					$table[$i][$j] = max(
						$table[$i - 1][$j],
						$table[$i][$j - 1],
					);
				}
			}
		}

		return $table;
	}

	/**
	 * Simplified LCS for large files — uses a rolling window approach.
	 *
	 * @param list<string> $a
	 * @param list<string> $b
	 * @return array<array<int>>
	 */
	protected function computeLcsTableSimple(array $a, array $b): array
	{
		// For very large files, just return a minimal table that will
		// cause the backtracking to produce a line-by-line comparison.
		$m = count($a);
		$n = count($b);

		$table = array_fill(0, $m + 1, array_fill(0, $n + 1, 0));

		// Only compute for the first 500 lines to keep memory reasonable.
		$limit_m = min($m, 500);
		$limit_n = min($n, 500);

		for ($i = 1; $i <= $limit_m; $i++) {
			for ($j = 1; $j <= $limit_n; $j++) {
				if ($a[$i - 1] === $b[$j - 1]) {
					$table[$i][$j] = $table[$i - 1][$j - 1] + 1;
				} else {
					$table[$i][$j] = max(
						$table[$i - 1][$j],
						$table[$i][$j - 1],
					);
				}
			}
		}

		return $table;
	}

	/**
	 * Backtrack through the LCS table to produce an edit script.
	 *
	 * @param array<array<int>> $table
	 * @param list<string> $a
	 * @param list<string> $b
	 * @return list<array{type: string, line: string}>
	 */
	protected function backtrackLcs(
		array $table,
		array $a,
		array $b,
		int $i,
		int $j,
	): array {
		$edits = [];

		while ($i > 0 || $j > 0) {
			if (
				$i > 0 &&
				$j > 0 &&
				isset($table[$i][$j]) &&
				$a[$i - 1] === $b[$j - 1]
			) {
				array_unshift($edits, [
					"type" => "equal",
					"line" => $a[$i - 1],
				]);
				$i--;
				$j--;
			} elseif (
				$j > 0 &&
				($i === 0 ||
					(isset($table[$i][$j - 1], $table[$i - 1][$j]) &&
						$table[$i][$j - 1] >= $table[$i - 1][$j]))
			) {
				array_unshift($edits, [
					"type" => "insert",
					"line" => $b[$j - 1],
				]);
				$j--;
			} elseif ($i > 0) {
				array_unshift($edits, [
					"type" => "delete",
					"line" => $a[$i - 1],
				]);
				$i--;
			} else {
				break;
			}
		}

		return $edits;
	}

	/**
	 * Group raw diff entries into hunks with surrounding context lines.
	 *
	 * @param list<array{type: string, line: string, old: int, new: int}> $rawLines
	 * @return list<list<array{type: string, line: string, old: int, new: int}>>
	 */
	protected function groupIntoHunks(array $rawLines, int $contextLines): array
	{
		if (empty($rawLines)) {
			return [];
		}

		// Find indices of changed lines.
		$changedIndices = [];
		foreach ($rawLines as $idx => $entry) {
			if ($entry["type"] !== " ") {
				$changedIndices[] = $idx;
			}
		}

		if (empty($changedIndices)) {
			return [];
		}

		// Build ranges with context.
		$ranges = [];
		$currentStart = max(0, $changedIndices[0] - $contextLines);
		$currentEnd = min(
			count($rawLines) - 1,
			$changedIndices[0] + $contextLines,
		);

		foreach ($changedIndices as $idx) {
			$rangeStart = max(0, $idx - $contextLines);
			$rangeEnd = min(count($rawLines) - 1, $idx + $contextLines);

			if ($rangeStart <= $currentEnd + 1) {
				// Merge with current range.
				$currentEnd = max($currentEnd, $rangeEnd);
			} else {
				// Start a new range.
				$ranges[] = [$currentStart, $currentEnd];
				$currentStart = $rangeStart;
				$currentEnd = $rangeEnd;
			}
		}

		$ranges[] = [$currentStart, $currentEnd];

		// Extract hunks.
		$hunks = [];
		foreach ($ranges as [$start, $end]) {
			$hunk = [];
			for ($i = $start; $i <= $end; $i++) {
				$hunk[] = $rawLines[$i];
			}
			$hunks[] = $hunk;
		}

		return $hunks;
	}

	/**
	 * Render the full diff output with colored lines.
	 *
	 * @param array<string, array{status: string, files: list<array>}> $results
	 */
	protected function renderFullDiff(array $results): void
	{
		$this->newLine();

		$hasOutput = false;

		foreach ($results as $name => $result) {
			$status = $result["status"];

			switch ($status) {
				case self::STATUS_IDENTICAL:
					$this->components->twoColumnDetail(
						"<fg=cyan>{$name}</>",
						"<fg=green>✓ Identical to registry</>",
					);
					break;

				case self::STATUS_NOT_INSTALLED:
					$this->components->twoColumnDetail(
						"<fg=cyan>{$name}</>",
						"<fg=yellow>Not installed locally</>",
					);
					break;

				case self::STATUS_NOT_IN_REGISTRY:
					$this->components->twoColumnDetail(
						"<fg=cyan>{$name}</>",
						"<fg=red>Not found in registry</>",
					);
					break;

				case self::STATUS_MODIFIED:
					$this->components->twoColumnDetail(
						"<fg=cyan>{$name}</>",
						"<fg=yellow>Modified</>",
					);
					$this->newLine();

					foreach ($result["files"] as $fileResult) {
						if ($fileResult["status"] !== self::STATUS_MODIFIED) {
							continue;
						}

						$this->line(
							"  <fg=white;options=bold>{$fileResult["path"]}</>",
						);
						$this->line(
							sprintf(
								"  <fg=gray>Local: %d lines | Registry: %d lines | +%d -%d</>",
								$fileResult["local_lines"],
								$fileResult["registry_lines"],
								$fileResult["additions"],
								$fileResult["deletions"],
							),
						);
						$this->newLine();

						foreach ($fileResult["diff_lines"] as $diffLine) {
							$this->renderDiffLine($diffLine);
						}

						$this->newLine();
						$hasOutput = true;
					}
					break;

				case self::STATUS_ERROR:
					$this->components->twoColumnDetail(
						"<fg=cyan>{$name}</>",
						"<fg=red>Error fetching registry version</>",
					);
					break;
			}
		}

		// Summary.
		$this->renderInlineSummary($results);

		// Show update hint for modified components.
		$modified = array_keys(
			array_filter(
				$results,
				fn(array $r) => $r["status"] === self::STATUS_MODIFIED,
			),
		);

		if (!empty($modified)) {
			$this->newLine();
			$this->line("  <fg=yellow>To update modified components:</>");
			foreach ($modified as $name) {
				$this->line(
					"  <fg=green>php artisan ui:add {$name} --overwrite</>",
				);
			}
		}
	}

	/**
	 * Render a single diff line with appropriate coloring.
	 */
	protected function renderDiffLine(string $line): void
	{
		if (str_starts_with($line, "+++") || str_starts_with($line, "---")) {
			$this->line("  <fg=white;options=bold>{$line}</>");
		} elseif (str_starts_with($line, "@@")) {
			$this->line("  <fg=magenta>{$line}</>");
		} elseif (str_starts_with($line, "+")) {
			$this->line("  <fg=green>{$line}</>");
		} elseif (str_starts_with($line, "-")) {
			$this->line("  <fg=red>{$line}</>");
		} else {
			$this->line("  <fg=gray>{$line}</>");
		}
	}

	/**
	 * Render the summary table.
	 *
	 * @param array<string, array{status: string, files: list<array>}> $results
	 */
	protected function renderSummaryTable(array $results): void
	{
		$this->newLine();
		$this->components->info("Diff Summary");
		$this->newLine();

		$rows = [];

		foreach ($results as $name => $result) {
			$status = $result["status"];
			$files = $result["files"];

			$statusLabel = match ($status) {
				self::STATUS_IDENTICAL => "<fg=green>✓ Identical</>",
				self::STATUS_MODIFIED => "<fg=yellow>✎ Modified</>",
				self::STATUS_NOT_INSTALLED => "<fg=gray>— Not installed</>",
				self::STATUS_NOT_IN_REGISTRY => "<fg=red>✗ Not in registry</>",
				self::STATUS_ERROR => "<fg=red>⚠ Error</>",
				default => "<fg=gray>{$status}</>",
			};

			$totalAdditions = 0;
			$totalDeletions = 0;
			$fileCount = count($files);

			foreach ($files as $fileResult) {
				$totalAdditions += $fileResult["additions"] ?? 0;
				$totalDeletions += $fileResult["deletions"] ?? 0;
			}

			$changes =
				$status === self::STATUS_MODIFIED
					? sprintf(
						"<fg=green>+%d</> <fg=red>-%d</>",
						$totalAdditions,
						$totalDeletions,
					)
					: "<fg=gray>—</>";

			$rows[] = [
				"<fg=cyan>{$name}</>",
				$statusLabel,
				(string) $fileCount,
				$changes,
			];
		}

		$this->table(
			[
				"<fg=white;options=bold>Component</>",
				"<fg=white;options=bold>Status</>",
				"<fg=white;options=bold>Files</>",
				"<fg=white;options=bold>Changes</>",
			],
			$rows,
		);

		$this->renderInlineSummary($results);
	}

	/**
	 * Render a compact inline summary line.
	 *
	 * @param array<string, array{status: string, files: list<array>}> $results
	 */
	protected function renderInlineSummary(array $results): void
	{
		$total = count($results);
		$identical = count(
			array_filter(
				$results,
				fn(array $r) => $r["status"] === self::STATUS_IDENTICAL,
			),
		);
		$modified = count(
			array_filter(
				$results,
				fn(array $r) => $r["status"] === self::STATUS_MODIFIED,
			),
		);
		$notInstalled = count(
			array_filter(
				$results,
				fn(array $r) => $r["status"] === self::STATUS_NOT_INSTALLED,
			),
		);
		$errors = count(
			array_filter(
				$results,
				fn(array $r) => in_array(
					$r["status"],
					[self::STATUS_ERROR, self::STATUS_NOT_IN_REGISTRY],
					true,
				),
			),
		);

		$this->newLine();

		$parts = [];
		if ($identical > 0) {
			$parts[] = "<fg=green>{$identical} identical</>";
		}
		if ($modified > 0) {
			$parts[] = "<fg=yellow>{$modified} modified</>";
		}
		if ($notInstalled > 0) {
			$parts[] = "<fg=gray>{$notInstalled} not installed</>";
		}
		if ($errors > 0) {
			$parts[] = "<fg=red>{$errors} error(s)</>";
		}

		$this->components->twoColumnDetail(
			"<fg=white;options=bold>{$total} component(s) checked</>",
			implode(" · ", $parts),
		);
	}

	/**
	 * Render the results as JSON.
	 *
	 * @param array<string, array{status: string, files: list<array>}> $results
	 */
	protected function renderJson(array $results): void
	{
		$output = [];

		foreach ($results as $name => $result) {
			$entry = [
				"name" => $name,
				"status" => $result["status"],
				"files" => [],
			];

			foreach ($result["files"] as $fileResult) {
				$fileEntry = [
					"path" => $fileResult["path"],
					"type" => $fileResult["type"],
					"status" => $fileResult["status"],
					"local_lines" => $fileResult["local_lines"],
					"registry_lines" => $fileResult["registry_lines"],
					"additions" => $fileResult["additions"] ?? 0,
					"deletions" => $fileResult["deletions"] ?? 0,
				];

				if (
					$fileResult["status"] === self::STATUS_MODIFIED &&
					!empty($fileResult["diff_lines"])
				) {
					$fileEntry["diff"] = $fileResult["diff_lines"];
				}

				$entry["files"][] = $fileEntry;
			}

			$output[] = $entry;
		}

		$this->line(
			json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES),
		);
	}

	/**
	 * Resolve the absolute local path for a file entry.
	 */
	protected function resolveLocalPath(array $file): ?string
	{
		$type = $file["type"] ?? "blade";
		$relativePath = $file["path"] ?? "";

		if (empty($relativePath)) {
			return null;
		}

		$aliases = $this->config["aliases"] ?? [];
		$filename = basename($relativePath);

		return match ($type) {
			"blade" => base_path(
				($aliases["components"] ?? "resources/views/components/ui") .
					"/" .
					$filename,
			),
			"php" => base_path("app/View/Components/Ui/" . $filename),
			"css" => base_path(
				($aliases["css"] ?? "resources/css") . "/" . $filename,
			),
			"js" => base_path(
				($aliases["js"] ?? "resources/js") . "/" . $filename,
			),
			default => base_path($relativePath),
		};
	}

	/**
	 * Resolve the components directory path from config.
	 */
	protected function resolveComponentsPath(): string
	{
		return base_path(
			$this->config["aliases"]["components"] ??
				"resources/views/components/ui",
		);
	}

	/**
	 * Find component names in the registry that are similar to the given name.
	 *
	 * @return list<string>
	 */
	protected function findSimilarNames(string $name): array
	{
		$suggestions = [];
		$allNames = $this->registry->names();

		foreach ($allNames as $registryName) {
			$distance = levenshtein($name, $registryName);

			if ($distance <= 3) {
				$suggestions[$registryName] = $distance;
			} elseif (
				str_contains($registryName, $name) ||
				str_contains($name, $registryName)
			) {
				$suggestions[$registryName] = $distance;
			}
		}

		asort($suggestions);

		return array_slice(array_keys($suggestions), 0, 5);
	}
}

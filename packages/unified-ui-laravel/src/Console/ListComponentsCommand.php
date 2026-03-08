<?php

declare(strict_types=1);

namespace Rajeshwar\UnifiedUi\Console;

use Illuminate\Console\Command;
use Rajeshwar\UnifiedUi\Registry;

class ListComponentsCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 */
	protected $signature = 'ui:list
        {--search= : Filter components by name or description}
        {--type= : Filter by component type (blade, alpine)}
        {--json : Output as JSON instead of a table}
        {--installed : Only show components that are already installed locally}
        {--not-installed : Only show components that are NOT installed locally}
        {--offline : Use only the local registry bundled with the package}';

	/**
	 * The console command description.
	 */
	protected $description = "List all available Unified UI components";

	/**
	 * The registry instance.
	 */
	protected Registry $registry;

	/**
	 * Execute the console command.
	 */
	public function handle(): int
	{
		$offline = (bool) $this->option("offline");
		$this->registry = new Registry(preferRemote: !$offline);

		$components = $this->getFilteredComponents();

		if (empty($components)) {
			$this->renderEmpty();
			return self::SUCCESS;
		}

		if ((bool) $this->option("json")) {
			$this->renderJson($components);
		} else {
			$this->renderTable($components);
		}

		return self::SUCCESS;
	}

	/**
	 * Get components from the registry, applying any requested filters.
	 *
	 * @return array<string, array<string, mixed>>
	 */
	protected function getFilteredComponents(): array
	{
		$search = $this->option("search");
		$typeFilter = $this->option("type");
		$onlyInstalled = (bool) $this->option("installed");
		$onlyNotInstalled = (bool) $this->option("not-installed");

		// Start with all components or a search subset.
		$components =
			is_string($search) && $search !== ""
				? $this->registry->search($search)
				: $this->registry->all();

		// Filter by type.
		if (is_string($typeFilter) && $typeFilter !== "") {
			$typeFilter = strtolower(trim($typeFilter));

			$components = array_filter($components, function (
				array $component,
			) use ($typeFilter) {
				$types = $this->extractFileTypes($component);

				return match ($typeFilter) {
					"blade" => in_array("blade", $types, true),
					"alpine" => $this->requiresAlpine($component),
					default => true,
				};
			});
		}

		// Filter by installation status.
		if ($onlyInstalled) {
			$components = array_filter(
				$components,
				fn(array $component, string $name) => $this->isInstalled(
					$name,
					$component,
				),
				ARRAY_FILTER_USE_BOTH,
			);
		} elseif ($onlyNotInstalled) {
			$components = array_filter(
				$components,
				fn(array $component, string $name) => !$this->isInstalled(
					$name,
					$component,
				),
				ARRAY_FILTER_USE_BOTH,
			);
		}

		return $components;
	}

	/**
	 * Render the components as a formatted table.
	 *
	 * @param array<string, array<string, mixed>> $components
	 */
	protected function renderTable(array $components): void
	{
		$meta = $this->registry->meta();

		$this->newLine();
		$this->components->info(
			sprintf(
				"Unified UI Components — %d available (registry %s)",
				$meta["total_components"],
				$meta["version"],
			),
		);
		$this->newLine();

		$rows = [];

		foreach ($components as $name => $component) {
			$description = $component["description"] ?? "—";
			$types = $this->extractFileTypes($component);
			$typeLabels = $this->formatTypeLabels($types);
			$deps = $this->formatDependencies($component);
			$installed = $this->isInstalled($name, $component);
			$status = $installed ? "<fg=green>✓ installed</>" : "<fg=gray>—</>";

			$rows[] = [
				"<fg=cyan>{$name}</>",
				$this->truncate($description, 40),
				$typeLabels,
				$deps,
				$status,
			];
		}

		$this->table(
			[
				"<fg=white;options=bold>Component</>",
				"<fg=white;options=bold>Description</>",
				"<fg=white;options=bold>Type</>",
				"<fg=white;options=bold>Dependencies</>",
				"<fg=white;options=bold>Status</>",
			],
			$rows,
		);

		// Footer summary.
		$installedCount = count(
			array_filter(
				$components,
				fn(array $c, string $n) => $this->isInstalled($n, $c),
				ARRAY_FILTER_USE_BOTH,
			),
		);

		$this->newLine();
		$this->components->twoColumnDetail(
			"Total",
			sprintf(
				"<fg=cyan>%d</> component%s shown, <fg=green>%d</> installed",
				count($components),
				count($components) === 1 ? "" : "s",
				$installedCount,
			),
		);

		$this->newLine();
		$this->line(
			"  <fg=gray>Add a component:</>   <fg=green>php artisan ui:add button</>",
		);
		$this->line(
			"  <fg=gray>Add all:</>            <fg=green>php artisan ui:add --all</>",
		);
		$this->line(
			"  <fg=gray>Check for updates:</>  <fg=green>php artisan ui:diff button</>",
		);
	}

	/**
	 * Render the components as JSON output.
	 *
	 * @param array<string, array<string, mixed>> $components
	 */
	protected function renderJson(array $components): void
	{
		$output = [];

		foreach ($components as $name => $component) {
			$output[] = [
				"name" => $name,
				"description" => $component["description"] ?? null,
				"types" => $this->extractFileTypes($component),
				"files" => count($component["files"] ?? []),
				"dependencies" => [
					"components" =>
						$component["dependencies"]["components"] ?? [],
					"composer" => $component["dependencies"]["composer"] ?? [],
					"npm" => $component["dependencies"]["npm"] ?? [],
				],
				"installed" => $this->isInstalled($name, $component),
			];
		}

		$this->line(
			json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES),
		);
	}

	/**
	 * Render a message when no components match the filters.
	 */
	protected function renderEmpty(): void
	{
		$search = $this->option("search");
		$typeFilter = $this->option("type");

		$this->newLine();

		if (is_string($search) && $search !== "") {
			$this->components->warn(
				"No components matching \"{$search}\" found.",
			);
		} elseif (is_string($typeFilter) && $typeFilter !== "") {
			$this->components->warn(
				"No components of type \"{$typeFilter}\" found.",
			);
		} elseif ((bool) $this->option("installed")) {
			$this->components->warn("No components are installed yet.");
			$this->newLine();
			$this->line(
				"  Get started: <fg=green>php artisan ui:add button</>",
			);
		} elseif ((bool) $this->option("not-installed")) {
			$this->components->info("All components are already installed!");
		} else {
			$this->components->error(
				"The component registry is empty or could not be loaded.",
			);
			$this->newLine();
			$this->line(
				"  Try running with <fg=green>--offline</> to use the bundled registry,",
			);
			$this->line("  or check your network connection.");
		}
	}

	/**
	 * Extract all file types from a component definition.
	 *
	 * @return list<string>
	 */
	protected function extractFileTypes(array $component): array
	{
		$types = [];
		$files = $component["files"] ?? [];

		foreach ($files as $file) {
			$type = $file["type"] ?? "blade";
			if (!in_array($type, $types, true)) {
				$types[] = $type;
			}
		}

		return $types;
	}

	/**
	 * Format file type labels for display.
	 *
	 * @param list<string> $types
	 */
	protected function formatTypeLabels(array $types): string
	{
		if (empty($types)) {
			return "<fg=gray>blade</>";
		}

		$labels = [];

		foreach ($types as $type) {
			$labels[] = match ($type) {
				"blade" => "<fg=blue>blade</>",
				"php" => "<fg=magenta>class</>",
				"css" => "<fg=yellow>css</>",
				"js" => "<fg=green>js</>",
				default => "<fg=gray>{$type}</>",
			};
		}

		// Deduplicate display labels.
		return implode(" ", array_unique($labels));
	}

	/**
	 * Format the dependency information for display.
	 */
	protected function formatDependencies(array $component): string
	{
		$deps = $component["dependencies"] ?? [];
		$parts = [];

		$componentDeps = $deps["components"] ?? [];
		$composerDeps = $deps["composer"] ?? [];
		$npmDeps = $deps["npm"] ?? [];

		if (!empty($componentDeps)) {
			$count = count($componentDeps);
			$parts[] =
				"<fg=cyan>{$count} component" .
				($count === 1 ? "" : "s") .
				"</>";
		}

		if (!empty($composerDeps)) {
			$names = array_map(fn(string $p) => basename($p), $composerDeps);
			$parts[] = "<fg=yellow>" . implode(", ", $names) . "</>";
		}

		if (!empty($npmDeps)) {
			$parts[] = "<fg=green>" . implode(", ", $npmDeps) . "</>";
		}

		return empty($parts) ? "<fg=gray>none</>" : implode(" · ", $parts);
	}

	/**
	 * Check whether a component is installed in the project.
	 *
	 * A component is considered installed if at least one of its "blade" type
	 * files exists at the configured components path.
	 */
	protected function isInstalled(string $name, array $component): bool
	{
		$config = \Rajeshwar\UnifiedUi\UnifiedUiServiceProvider::readConfig();
		$componentsPath = base_path(
			$config["aliases"]["components"] ?? "resources/views/components/ui",
		);

		$files = $component["files"] ?? [];

		foreach ($files as $file) {
			$type = $file["type"] ?? "blade";

			if ($type === "blade") {
				$filename = basename($file["path"] ?? "");
				if (
					$filename &&
					file_exists($componentsPath . "/" . $filename)
				) {
					return true;
				}
			}
		}

		// Also check for a file matching the component name directly.
		$candidates = [$componentsPath . "/" . $name . ".blade.php"];

		foreach ($candidates as $candidate) {
			if (file_exists($candidate)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Check whether a component requires Alpine.js.
	 */
	protected function requiresAlpine(array $component): bool
	{
		$npmDeps = $component["dependencies"]["npm"] ?? [];

		if (in_array("alpinejs", $npmDeps, true)) {
			return true;
		}

		// Also check file content hints if available.
		$files = $component["files"] ?? [];

		foreach ($files as $file) {
			$path = $file["path"] ?? "";
			if (
				str_contains($path, "alpine") ||
				($file["type"] ?? "") === "js"
			) {
				return true;
			}
		}

		// Check if the component has Alpine.js markers in its description.
		$description = $component["description"] ?? "";

		return str_contains(strtolower($description), "alpine");
	}

	/**
	 * Truncate a string to a maximum length, appending an ellipsis if needed.
	 */
	protected function truncate(string $value, int $maxLength): string
	{
		if (mb_strlen($value) <= $maxLength) {
			return $value;
		}

		return mb_substr($value, 0, $maxLength - 1) . "…";
	}
}

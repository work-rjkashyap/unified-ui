<?php

declare(strict_types=1);

namespace Rajeshwar\UnifiedUi\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Rajeshwar\UnifiedUi\Registry;
use Rajeshwar\UnifiedUi\UnifiedUiServiceProvider;

class AddComponentCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 */
	protected $signature = 'ui:add
        {components?* : Component name(s) to add}
        {--all : Add all available components}
        {--overwrite : Overwrite existing files without prompting}
        {--dry-run : Show what would be installed without writing files}
        {--no-deps : Skip installing Composer/npm dependencies}
        {--offline : Use only the local registry bundled with the package}';

	/**
	 * The console command description.
	 */
	protected $description = "Add Unified UI component(s) to your Laravel project";

	/**
	 * The filesystem instance.
	 */
	protected Filesystem $files;

	/**
	 * The registry instance.
	 */
	protected Registry $registry;

	/**
	 * Track files that were written during this run.
	 *
	 * @var list<string>
	 */
	protected array $writtenFiles = [];

	/**
	 * Track files that were skipped during this run.
	 *
	 * @var list<string>
	 */
	protected array $skippedFiles = [];

	/**
	 * Composer packages that need to be installed.
	 *
	 * @var list<string>
	 */
	protected array $composerPackages = [];

	/**
	 * npm packages that need to be installed.
	 *
	 * @var list<string>
	 */
	protected array $npmPackages = [];

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
		// Ensure the project has been initialized.
		if (!$this->ensureInitialized()) {
			return self::FAILURE;
		}

		// Auto-install Alpine.js if enabled in config and not yet installed.
		$this->ensureAlpineInstalled();

		// Create registry instance.
		$offline = (bool) $this->option("offline");
		$this->registry = new Registry(preferRemote: !$offline);

		// Determine which components to install.
		$componentNames = $this->resolveRequestedComponents();

		if (empty($componentNames)) {
			$this->components->error(
				"No components specified. Use a name or --all.",
			);
			$this->newLine();
			$this->line("  <fg=gray>Examples:</>");
			$this->line("  <fg=green>php artisan ui:add button</>");
			$this->line("  <fg=green>php artisan ui:add button badge card</>");
			$this->line("  <fg=green>php artisan ui:add --all</>");

			return self::FAILURE;
		}

		// Validate all requested components exist in the registry.
		$invalid = $this->validateComponentNames($componentNames);

		if (!empty($invalid)) {
			$this->components->error(
				"The following components were not found in the registry:",
			);

			foreach ($invalid as $name) {
				$this->line("  <fg=red>•</> {$name}");
			}

			$this->newLine();
			$this->line(
				"  Run <fg=green>php artisan ui:list</> to see all available components.",
			);

			return self::FAILURE;
		}

		// Resolve the full dependency tree.
		$resolved = $this->resolveAllDependencies($componentNames);

		// Show the installation plan.
		$this->showInstallationPlan($resolved, $componentNames);

		if ((bool) $this->option("dry-run")) {
			$this->newLine();
			$this->components->info("Dry run complete. No files were written.");
			return self::SUCCESS;
		}

		// Confirm if adding many components.
		if (count($resolved) > 5) {
			if (
				!$this->components->confirm(
					sprintf(
						"Install %d components (including dependencies)?",
						count($resolved),
					),
					true,
				)
			) {
				$this->components->warn("Cancelled.");
				return self::SUCCESS;
			}
		}

		// Process each component.
		$this->newLine();
		$this->components->info("Installing components…");
		$this->newLine();

		$progressBar = $this->output->createProgressBar(count($resolved));
		$progressBar->setFormat(" %current%/%max% [%bar%] %message%");

		foreach ($resolved as $name) {
			$progressBar->setMessage("Adding {$name}…");
			$this->installComponent($name);
			$progressBar->advance();
		}

		$progressBar->setMessage("Done!");
		$progressBar->finish();
		$this->newLine(2);

		// Show summary.
		$this->showSummary($resolved);

		// Handle external dependencies.
		if (!(bool) $this->option("no-deps")) {
			$this->handleExternalDependencies();
		}

		// Print usage hints.
		$this->showUsageHints($componentNames);

		return self::SUCCESS;
	}

	/**
	 * Ensure the project has unified-ui.json. If not, suggest running init.
	 */
	protected function ensureInitialized(): bool
	{
		$configPath = base_path(UnifiedUiServiceProvider::CONFIG_FILENAME);

		if (!$this->files->exists($configPath)) {
			$this->components->warn(
				"Unified UI has not been initialized in this project.",
			);
			$this->newLine();

			if ($this->components->confirm("Run initialization now?", true)) {
				$this->call("ui:init");
				$this->newLine();
				return true;
			}

			$this->line("  Run <fg=green>php artisan ui:init</> first.");
			return false;
		}

		return true;
	}

	/**
	 * Ensure Alpine.js is installed when "alpine": true in config.
	 *
	 * This runs before any component is added so that Blade templates
	 * using x-data directives work immediately — even when the specific
	 * component does not list "alpinejs" as an explicit npm dependency
	 * in the registry.
	 */
	protected function ensureAlpineInstalled(): void
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$alpineEnabled = $config["alpine"] ?? true;

		if (!$alpineEnabled) {
			return;
		}

		if ($this->isNpmPackageInstalled("alpinejs")) {
			return;
		}

		$this->newLine();
		$this->components->warn(
			'Alpine.js is not installed. Installing automatically ("alpine": true in config)…',
		);

		$manager = $this->detectNpmPackageManager();
		$installCmd = match ($manager) {
			"pnpm" => "pnpm add alpinejs",
			"yarn" => "yarn add alpinejs",
			"bun" => "bun add alpinejs",
			default => "npm install alpinejs",
		};

		$this->line("  <fg=gray>Running:</> {$installCmd}");
		$this->newLine();

		$result = 0;
		passthru($installCmd, $result);

		if ($result === 0) {
			$this->newLine();
			$this->components->info("Alpine.js installed successfully.");
		} else {
			$this->newLine();
			$this->components->error(
				"Failed to install Alpine.js automatically. Install manually:",
			);
			$this->line("  <fg=green>{$installCmd}</>");
		}

		$this->newLine();
	}

	/**
	 * Determine which component names the user wants to install.
	 *
	 * @return list<string>
	 */
	protected function resolveRequestedComponents(): array
	{
		if ((bool) $this->option("all")) {
			return $this->registry->names();
		}

		$names = $this->argument("components");

		if (is_array($names) && !empty($names)) {
			// Normalize names: lowercase, trim.
			return array_map(fn(string $n) => strtolower(trim($n)), $names);
		}

		// Interactive: ask the user to pick from available components.
		$available = $this->registry->names();

		if (empty($available)) {
			$this->components->error(
				"The component registry is empty or could not be loaded.",
			);
			return [];
		}

		$selected = $this->components->choice(
			"Which component(s) would you like to add? (comma-separated)",
			$available,
			null,
			null,
			true,
		);

		return is_array($selected) ? $selected : [$selected];
	}

	/**
	 * Validate that all requested component names exist in the registry.
	 *
	 * @param list<string> $names
	 * @return list<string> Names that are NOT valid.
	 */
	protected function validateComponentNames(array $names): array
	{
		$invalid = [];

		foreach ($names as $name) {
			if (!$this->registry->has($name)) {
				$invalid[] = $name;
			}
		}

		return $invalid;
	}

	/**
	 * Resolve the full dependency tree for all requested components.
	 *
	 * @param list<string> $names
	 * @return list<string> Ordered list (dependencies first).
	 */
	protected function resolveAllDependencies(array $names): array
	{
		$resolved = [];
		$seen = [];

		foreach ($names as $name) {
			try {
				$this->registry->resolveDependencies($name, $resolved, $seen);
			} catch (\RuntimeException $e) {
				$this->components->error($e->getMessage());
			}
		}

		return $resolved;
	}

	/**
	 * Display the installation plan to the user.
	 *
	 * @param list<string> $resolved
	 * @param list<string> $requested
	 */
	protected function showInstallationPlan(
		array $resolved,
		array $requested,
	): void {
		$deps = array_diff($resolved, $requested);

		$this->newLine();
		$this->components->info(
			sprintf(
				"Installation plan: %d component%s",
				count($resolved),
				count($resolved) === 1 ? "" : "s",
			),
		);

		// Requested components.
		foreach ($requested as $name) {
			if (in_array($name, $resolved, true)) {
				$component = $this->registry->get($name);
				$desc = $component["description"] ?? "";
				$this->components->twoColumnDetail(
					"  <fg=green>+</> {$name}",
					"<fg=gray>{$desc}</>",
				);
			}
		}

		// Auto-resolved dependencies.
		if (!empty($deps)) {
			$this->newLine();
			$this->line("  <fg=yellow>Dependencies (auto-resolved):</>");

			foreach ($deps as $name) {
				$component = $this->registry->get($name);
				$desc = $component["description"] ?? "";
				$this->components->twoColumnDetail(
					"  <fg=yellow>↳</> {$name}",
					"<fg=gray>{$desc}</>",
				);
			}
		}
	}

	/**
	 * Install a single component — write all its files to the project.
	 */
	protected function installComponent(string $name): void
	{
		$component = $this->registry->get($name);

		if ($component === null) {
			return;
		}

		$files = $component["files"] ?? [];

		foreach ($files as $file) {
			$this->installFile($name, $file);
		}

		// Collect external dependencies.
		$this->collectExternalDependencies($component);
	}

	/**
	 * Install a single file entry from a component.
	 *
	 * @param array{type: string, path: string, url?: string, content?: string} $file
	 */
	protected function installFile(string $componentName, array $file): void
	{
		$type = $file["type"] ?? "blade";
		$relativePath = $file["path"] ?? "";

		if (empty($relativePath)) {
			return;
		}

		// Alpine.js components are just Blade templates with x-data directives —
		// no special runtime check needed. They work as long as Alpine is loaded
		// on the page.

		// Resolve the absolute destination path.
		$destinationPath = $this->resolveDestinationPath($file);

		if ($destinationPath === null) {
			$this->skippedFiles[] = "{$relativePath} (could not resolve path)";
			return;
		}

		// Check if file already exists.
		if ($this->files->exists($destinationPath)) {
			if (!(bool) $this->option("overwrite")) {
				// Read existing content and compare.
				$existingContent = $this->files->get($destinationPath);
				$newContent = $this->fetchContent($file);

				if ($newContent !== null && $existingContent === $newContent) {
					$this->skippedFiles[] = "{$relativePath} (identical)";
					return;
				}

				// File differs — will be overwritten only if we get here via --overwrite,
				// otherwise we skip and note it.
				$this->skippedFiles[] = "{$relativePath} (exists — use --overwrite to replace)";
				return;
			}
		}

		// Fetch the file content.
		$content = $this->fetchContent($file);

		if ($content === null) {
			$this->skippedFiles[] = "{$relativePath} (content not available)";
			return;
		}

		// Ensure the directory exists.
		$this->files->ensureDirectoryExists(dirname($destinationPath));

		// Write the file.
		$this->files->put($destinationPath, $content);

		$this->writtenFiles[] = $destinationPath;
	}

	/**
	 * Fetch the content for a file entry.
	 *
	 * Priority: inline content → remote URL → local stub.
	 */
	protected function fetchContent(array $file): ?string
	{
		// Inline content (for registry entries that embed the source directly).
		if (!empty($file["content"])) {
			return $file["content"];
		}

		// Use the registry to fetch (remote URL → local stub fallback).
		return $this->registry->fetchFileContent($file);
	}

	/**
	 * Resolve the absolute destination path for a file entry.
	 *
	 * Uses the unified-ui.json aliases to map file types to directories.
	 */
	protected function resolveDestinationPath(array $file): ?string
	{
		$type = $file["type"] ?? "blade";
		$relativePath = $file["path"] ?? "";

		if (empty($relativePath)) {
			return null;
		}

		$config = UnifiedUiServiceProvider::readConfig();
		$aliases = $config["aliases"] ?? [];

		switch ($type) {
			case "blade":
				$baseDir =
					$aliases["components"] ?? "resources/views/components/ui";
				$filename = basename($relativePath);
				return base_path($baseDir . "/" . $filename);

			case "php":
				// Class-based component PHP file → app/View/Components/Ui/
				$filename = basename($relativePath);
				return base_path("app/View/Components/Ui/" . $filename);

			case "alpine":
			case "css":
				$baseDir = $aliases["css"] ?? "resources/css";
				$filename = basename($relativePath);
				return base_path($baseDir . "/" . $filename);

			case "js":
				$baseDir = $aliases["js"] ?? "resources/js";
				$filename = basename($relativePath);
				return base_path($baseDir . "/" . $filename);

			default:
				// Fall back to writing at the exact relative path.
				return base_path($relativePath);
		}
	}

	/**
	 * Collect Composer and npm dependencies from a component definition.
	 */
	protected function collectExternalDependencies(array $component): void
	{
		$deps = $component["dependencies"] ?? [];

		if (isset($deps["composer"]) && is_array($deps["composer"])) {
			foreach ($deps["composer"] as $pkg) {
				if (!in_array($pkg, $this->composerPackages, true)) {
					$this->composerPackages[] = $pkg;
				}
			}
		}

		if (isset($deps["npm"]) && is_array($deps["npm"])) {
			foreach ($deps["npm"] as $pkg) {
				if (!in_array($pkg, $this->npmPackages, true)) {
					$this->npmPackages[] = $pkg;
				}
			}
		}
	}

	/**
	 * Handle external Composer and npm dependency installation.
	 */
	protected function handleExternalDependencies(): void
	{
		if (empty($this->composerPackages) && empty($this->npmPackages)) {
			return;
		}

		$this->newLine();
		$this->components->info("External Dependencies");

		// Read config to determine if Alpine.js auto-install is enabled.
		$config = UnifiedUiServiceProvider::readConfig();
		$alpineEnabled = $config["alpine"] ?? true;

		// Known Alpine.js-related packages that should be auto-installed
		// when "alpine": true in config.
		$alpinePackages = [
			"alpinejs",
			"@alpinejs/focus",
			"@alpinejs/collapse",
			"@alpinejs/morph",
			"@alpinejs/persist",
			"@alpinejs/intersect",
			"@alpinejs/mask",
			"@alpinejs/sort",
			"@alpinejs/anchor",
		];

		// Composer packages.
		if (!empty($this->composerPackages)) {
			$this->newLine();
			$this->line("  <fg=cyan>Composer packages required:</>");

			foreach ($this->composerPackages as $pkg) {
				$installed = $this->isComposerPackageInstalled($pkg);
				$status = $installed
					? "<fg=green>installed</>"
					: "<fg=yellow>missing</>";
				$this->line("    <fg=gray>•</> {$pkg} [{$status}]");
			}

			$missing = array_filter(
				$this->composerPackages,
				fn(string $pkg) => !$this->isComposerPackageInstalled($pkg),
			);

			if (!empty($missing)) {
				$this->newLine();
				$packages = implode(" ", $missing);

				if (
					$this->components->confirm(
						"Install missing Composer packages? ({$packages})",
						true,
					)
				) {
					$this->installComposerPackages($missing);
				} else {
					$this->newLine();
					$this->line(
						"  <fg=yellow>Install manually:</> <fg=green>composer require {$packages}</>",
					);
				}
			}
		}

		// npm packages.
		if (!empty($this->npmPackages)) {
			$this->newLine();
			$this->line("  <fg=cyan>npm packages required:</>");

			foreach ($this->npmPackages as $pkg) {
				$installed = $this->isNpmPackageInstalled($pkg);
				$status = $installed
					? "<fg=green>installed</>"
					: "<fg=yellow>missing</>";
				$this->line("    <fg=gray>•</> {$pkg} [{$status}]");
			}

			$missing = array_filter(
				$this->npmPackages,
				fn(string $pkg) => !$this->isNpmPackageInstalled($pkg),
			);

			if (!empty($missing)) {
				// Separate Alpine-related packages from other npm packages.
				$missingAlpine = array_values(
					array_filter(
						$missing,
						fn(string $pkg) => in_array(
							$pkg,
							$alpinePackages,
							true,
						),
					),
				);
				$missingOther = array_values(
					array_filter(
						$missing,
						fn(string $pkg) => !in_array(
							$pkg,
							$alpinePackages,
							true,
						),
					),
				);

				// Auto-install Alpine packages when "alpine": true in config.
				if (!empty($missingAlpine) && $alpineEnabled) {
					$alpineList = implode(" ", $missingAlpine);
					$this->newLine();
					$this->components->warn(
						"Auto-installing Alpine.js packages (\"alpine\": true in config): {$alpineList}",
					);
					$this->installNpmPackages($missingAlpine);
				} elseif (!empty($missingAlpine)) {
					// Alpine is disabled — just inform.
					$this->newLine();
					$manager = $this->detectNpmPackageManager();
					$alpineList = implode(" ", $missingAlpine);
					$this->line(
						"  <fg=yellow>Alpine packages needed (\"alpine\": false — skipping auto-install):</> <fg=green>{$manager} add {$alpineList}</>",
					);
				}

				// Prompt for remaining non-Alpine npm packages as before.
				if (!empty($missingOther)) {
					$this->newLine();
					$packages = implode(" ", $missingOther);

					if (
						$this->components->confirm(
							"Install missing npm packages? ({$packages})",
							true,
						)
					) {
						$this->installNpmPackages($missingOther);
					} else {
						$this->newLine();
						$this->line(
							"  <fg=yellow>Install manually:</> <fg=green>npm install {$packages}</>",
						);
					}
				}
			}
		}
	}

	/**
	 * Show the post-installation summary.
	 *
	 * @param list<string> $resolved
	 */
	protected function showSummary(array $resolved): void
	{
		$this->components->info("Installation Summary");
		$this->newLine();

		// Written files.
		if (!empty($this->writtenFiles)) {
			$this->line(
				sprintf(
					"  <fg=green>✓</> %d file%s written:",
					count($this->writtenFiles),
					count($this->writtenFiles) === 1 ? "" : "s",
				),
			);

			foreach ($this->writtenFiles as $path) {
				$relative = $this->relativePath($path);
				$this->line("    <fg=green>+</> {$relative}");
			}
		}

		// Skipped files.
		if (!empty($this->skippedFiles)) {
			$this->newLine();
			$this->line(
				sprintf(
					"  <fg=yellow>⚠</> %d file%s skipped:",
					count($this->skippedFiles),
					count($this->skippedFiles) === 1 ? "" : "s",
				),
			);

			foreach ($this->skippedFiles as $info) {
				$this->line("    <fg=yellow>-</> {$info}");
			}
		}

		if (empty($this->writtenFiles) && empty($this->skippedFiles)) {
			$this->line("  <fg=gray>No files to process.</>");
		}
	}

	/**
	 * Show usage hints for the installed components.
	 *
	 * @param list<string> $names
	 */
	protected function showUsageHints(array $names): void
	{
		$this->newLine();
		$this->components->info("Usage");
		$this->newLine();

		$shown = 0;

		foreach ($names as $name) {
			$component = $this->registry->get($name);

			if ($component === null) {
				continue;
			}

			$tag = $component["tag"] ?? "x-ui-{$name}";
			$example = $component["example"] ?? "<{$tag}>…</{$tag}>";

			$this->line("  <fg=cyan>{$name}</>");
			$this->line("  <fg=green>{$example}</>");
			$this->newLine();

			$shown++;

			// Only show hints for the first 5 to avoid clutter.
			if ($shown >= 5 && count($names) > 5) {
				$remaining = count($names) - $shown;
				$this->line(
					"  <fg=gray>…and {$remaining} more component(s).</>",
				);
				break;
			}
		}
	}

	/**
	 * Check whether a Composer package is installed in the project.
	 */
	protected function isComposerPackageInstalled(string $package): bool
	{
		$installedPath = base_path("vendor/composer/installed.json");

		if (!$this->files->exists($installedPath)) {
			return false;
		}

		$contents = $this->files->get($installedPath);
		$data = json_decode($contents, true);

		if (!is_array($data)) {
			return false;
		}

		// Composer 2 stores packages under a "packages" key.
		$packages = $data["packages"] ?? $data;

		foreach ($packages as $pkg) {
			if (isset($pkg["name"]) && $pkg["name"] === $package) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Check whether an npm package is listed in package.json.
	 */
	protected function isNpmPackageInstalled(string $package): bool
	{
		$packageJsonPath = base_path("package.json");

		if (!$this->files->exists($packageJsonPath)) {
			return false;
		}

		$contents = $this->files->get($packageJsonPath);
		$packageJson = json_decode($contents, true);

		if (!is_array($packageJson)) {
			return false;
		}

		$allDeps = array_merge(
			$packageJson["dependencies"] ?? [],
			$packageJson["devDependencies"] ?? [],
		);

		return array_key_exists($package, $allDeps);
	}

	/**
	 * Install Composer packages via shell command.
	 *
	 * @param list<string> $packages
	 */
	protected function installComposerPackages(array $packages): void
	{
		$packageList = implode(" ", $packages);
		$command = "composer require {$packageList}";

		$this->line("  <fg=gray>Running:</> {$command}");
		$this->newLine();

		$result = 0;
		passthru($command, $result);

		if ($result === 0) {
			$this->newLine();
			$this->components->info(
				"Composer packages installed successfully.",
			);
		} else {
			$this->newLine();
			$this->components->error(
				"Failed to install Composer packages. Install manually:",
			);
			$this->line("  <fg=green>{$command}</>");
		}
	}

	/**
	 * Install npm packages via shell command.
	 *
	 * @param list<string> $packages
	 */
	protected function installNpmPackages(array $packages): void
	{
		$packageList = implode(" ", $packages);

		// Detect package manager.
		$manager = $this->detectNpmPackageManager();
		$installCmd = match ($manager) {
			"pnpm" => "pnpm add {$packageList}",
			"yarn" => "yarn add {$packageList}",
			"bun" => "bun add {$packageList}",
			default => "npm install {$packageList}",
		};

		$this->line("  <fg=gray>Running:</> {$installCmd}");
		$this->newLine();

		$result = 0;
		passthru($installCmd, $result);

		if ($result === 0) {
			$this->newLine();
			$this->components->info("npm packages installed successfully.");
		} else {
			$this->newLine();
			$this->components->error(
				"Failed to install npm packages. Install manually:",
			);
			$this->line("  <fg=green>{$installCmd}</>");
		}
	}

	/**
	 * Detect which npm package manager the project uses.
	 */
	protected function detectNpmPackageManager(): string
	{
		if ($this->files->exists(base_path("pnpm-lock.yaml"))) {
			return "pnpm";
		}

		if ($this->files->exists(base_path("yarn.lock"))) {
			return "yarn";
		}

		if (
			$this->files->exists(base_path("bun.lockb")) ||
			$this->files->exists(base_path("bun.lock"))
		) {
			return "bun";
		}

		return "npm";
	}

	/**
	 * Get a project-relative path string for display.
	 */
	protected function relativePath(string $absolutePath): string
	{
		$basePath = base_path() . DIRECTORY_SEPARATOR;

		if (str_starts_with($absolutePath, $basePath)) {
			return substr($absolutePath, strlen($basePath));
		}

		return $absolutePath;
	}
}

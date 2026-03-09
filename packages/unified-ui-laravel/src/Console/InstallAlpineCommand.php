<?php

declare(strict_types=1);

namespace Rajeshwar\UnifiedUi\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Rajeshwar\UnifiedUi\UnifiedUiServiceProvider;

/**
 * Artisan command: php artisan ui:install-alpine
 *
 * Installs Alpine.js (and optional plugins) using the project's detected
 * package manager (npm / pnpm / yarn / bun), then patches the existing
 * app.js entrypoint to import and start Alpine.
 *
 * Behaviour summary
 * -----------------
 *  • Reads "alpine" flag from unified-ui.json — skips when false (unless --force).
 *  • Detects already-installed packages and skips them (unless --force).
 *  • After a successful npm install it patches the existing app.js:
 *      - File does not exist        → error, tells the user to create it first.
 *      - File exists, Alpine wired  → skips (unless --force).
 *      - File exists, no Alpine     → appends the bootstrap block.
 *      - --force + already wired    → strips old block and rewrites it.
 *  • Activates any @alpinejs/* plugins that were installed alongside core
 *    by appending their import + plugin() lines in the bootstrap block.
 *
 * Invocation
 * ----------
 *  1. Manual:        php artisan ui:install-alpine
 *  2. Composer hook: @php artisan ui:install-alpine --if-not-installed
 *  3. Internally by InitCommand and AddComponentCommand.
 */
class InstallAlpineCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 */
	protected $signature = 'ui:install-alpine
        {--force            : Re-install packages and overwrite the Alpine block in app.js even when already configured}
        {--if-not-installed : Exit silently when Alpine.js is already present — ideal for Composer hooks}
        {--plugins=         : Comma-separated @alpinejs/* plugins to install alongside core (e.g. focus,collapse)}
        {--dry-run          : Show what would happen without writing any files or running installs}';

	/**
	 * The console command description.
	 */
	protected $description = "Install Alpine.js (and optional plugins) and patch them into the project's existing app.js";

	/**
	 * The filesystem instance.
	 */
	protected Filesystem $files;

	/**
	 * All recognised @alpinejs/* plugin short-names mapped to their full package names.
	 *
	 * @var array<string, string>
	 */
	protected array $knownPlugins = [
		"focus" => "@alpinejs/focus",
		"collapse" => "@alpinejs/collapse",
		"morph" => "@alpinejs/morph",
		"persist" => "@alpinejs/persist",
		"intersect" => "@alpinejs/intersect",
		"mask" => "@alpinejs/mask",
		"sort" => "@alpinejs/sort",
		"anchor" => "@alpinejs/anchor",
	];

	public function __construct(Filesystem $files)
	{
		parent::__construct();
		$this->files = $files;
	}

	// =========================================================================
	// Entry point
	// =========================================================================

	/**
	 * Execute the console command.
	 */
	public function handle(): int
	{
		$force = (bool) $this->option("force");
		$ifNotInstalled = (bool) $this->option("if-not-installed");
		$dryRun = (bool) $this->option("dry-run");

		// ------------------------------------------------------------------
		// 1. Read project config and honour the "alpine": false flag.
		// ------------------------------------------------------------------
		$config = UnifiedUiServiceProvider::readConfig();
		$alpineEnabled = $config["alpine"] ?? true;

		if (!$alpineEnabled && !$force) {
			$this->components->warn(
				'"alpine": false is set in unified-ui.json — skipping. Pass --force to override.',
			);

			return self::SUCCESS;
		}

		// ------------------------------------------------------------------
		// 2. Resolve which npm packages need to be installed.
		// ------------------------------------------------------------------
		$packagesToInstall = $this->resolvePackages();

		if (empty($packagesToInstall)) {
			$this->components->error(
				"Could not resolve any packages to install.",
			);

			return self::FAILURE;
		}

		$missing = array_values(
			array_filter(
				$packagesToInstall,
				fn(string $pkg) => !$this->isNpmPackageInstalled($pkg),
			),
		);

		// ------------------------------------------------------------------
		// 3. Handle "already installed" case.
		// ------------------------------------------------------------------
		if (empty($missing)) {
			if ($ifNotInstalled) {
				// Silent no-op — used by Composer post-install hooks.
				return self::SUCCESS;
			}

			if (!$force) {
				$this->components->info("Alpine.js is already installed.");
				$this->newLine();

				// Still patch app.js in case it was never updated.
				return $this->patchAppJs($packagesToInstall, $dryRun, $force);
			}

			// --force: reinstall everything even if already present.
			$missing = $packagesToInstall;
		}

		// ------------------------------------------------------------------
		// 4. Show installation plan.
		// ------------------------------------------------------------------
		$manager = $this->detectNpmPackageManager();
		$pkgList = implode(" ", $missing);
		$installCmd = match ($manager) {
			"pnpm" => "pnpm add {$pkgList}",
			"yarn" => "yarn add {$pkgList}",
			"bun" => "bun add {$pkgList}",
			default => "npm install {$pkgList}",
		};

		$this->newLine();
		$this->components->info("Alpine.js — Auto Install");
		$this->newLine();
		$this->line(
			sprintf("  <fg=gray>Package manager:</> <fg=cyan>%s</>", $manager),
		);
		$this->newLine();
		$this->line("  <fg=gray>Packages to install:</>");

		foreach ($missing as $pkg) {
			$this->line("    <fg=green>+</> {$pkg}");
		}

		$this->newLine();

		// ------------------------------------------------------------------
		// 5. Dry-run: describe what would happen and stop.
		// ------------------------------------------------------------------
		if ($dryRun) {
			$this->line("  <fg=gray>Would run:</> {$installCmd}");
			$this->newLine();
			$this->describeDryRunAppJs($packagesToInstall);
			$this->newLine();
			$this->components->info("Dry run complete. No files were written.");

			return self::SUCCESS;
		}

		// ------------------------------------------------------------------
		// 6. Guard: package.json must exist.
		// ------------------------------------------------------------------
		if (!$this->files->exists(base_path("package.json"))) {
			$this->components->error(
				"No package.json found in the project root. " .
					"Run `npm init -y` first, then re-run this command.",
			);

			return self::FAILURE;
		}

		// ------------------------------------------------------------------
		// 7. Run the npm install.
		// ------------------------------------------------------------------
		$this->line("  <fg=gray>Running:</> {$installCmd}");
		$this->newLine();

		$exitCode = 0;
		passthru($installCmd, $exitCode);
		$this->newLine();

		if ($exitCode !== 0) {
			$this->components->error(
				"Package installation failed. Install manually:",
			);
			$this->line("  <fg=green>{$installCmd}</>");
			$this->newLine();

			return self::FAILURE;
		}

		$installedCount = count($missing);
		$this->components->info(
			sprintf(
				"%s installed successfully via %s.",
				$installedCount === 1
					? "Alpine.js"
					: "Alpine.js and " . ($installedCount - 1) . " plugin(s)",
				$manager,
			),
		);

		// ------------------------------------------------------------------
		// 8. Patch app.js.
		// ------------------------------------------------------------------
		$this->newLine();

		return $this->patchAppJs(
			$packagesToInstall,
			dryRun: false,
			force: $force,
		);
	}

	// =========================================================================
	// app.js patching
	// =========================================================================

	/**
	 * Create or patch the project's app.js to import and start Alpine.
	 *
	 * If app.js does not exist it is created with the bootstrap block.
	 * If it already exists the block is appended (or replaced with --force).
	 *
	 * @param list<string> $installedPackages  All packages that were (or are) installed.
	 */
	protected function patchAppJs(
		array $installedPackages,
		bool $dryRun,
		bool $force,
	): int {
		$appJsPath = $this->resolveAppJsPath();
		$relative = $this->relativePath($appJsPath);

		$plugins = array_values(
			array_filter(
				$installedPackages,
				fn(string $pkg) => $pkg !== "alpinejs",
			),
		);

		$this->components->info("app.js — Alpine Bootstrap");
		$this->newLine();

		// ------------------------------------------------------------------
		// File does not exist → create it with the bootstrap block.
		// ------------------------------------------------------------------
		if (!$this->files->exists($appJsPath)) {
			if ($dryRun) {
				$this->line(
					"  <fg=gray>Would create:</> {$relative} (Alpine bootstrap)",
				);
				$this->newLine();

				return self::SUCCESS;
			}

			$this->files->ensureDirectoryExists(dirname($appJsPath));
			$this->files->put(
				$appJsPath,
				$this->buildBootstrapBlock($plugins) . "\n",
			);

			$this->components->twoColumnDetail(
				"<fg=green>Created</> {$relative}",
				"Alpine bootstrap written",
			);
			$this->newLine();
			$this->printNextSteps($plugins);

			return self::SUCCESS;
		}

		// ------------------------------------------------------------------
		// Inspect the existing file.
		// ------------------------------------------------------------------
		$existing = $this->files->get($appJsPath);
		$hasAlpineImport = $this->containsAlpineImport($existing);
		$hasAlpineStart = $this->containsAlpineStart($existing);
		$alreadyWired = $hasAlpineImport && $hasAlpineStart;

		// ------------------------------------------------------------------
		// Already wired and no --force → skip core, but still activate plugins.
		// ------------------------------------------------------------------
		if ($alreadyWired && !$force) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> {$relative}",
				"Alpine.js is already wired — pass --force to overwrite",
			);
			$this->newLine();

			if (!empty($plugins)) {
				$this->activatePluginsInFile(
					$appJsPath,
					$existing,
					$plugins,
					$dryRun,
				);
			}

			return self::SUCCESS;
		}

		// ------------------------------------------------------------------
		// --force + already wired → strip the old block before rewriting.
		// ------------------------------------------------------------------
		$base =
			$force && $alreadyWired
				? $this->stripAlpineBlock($existing)
				: $existing;

		// ------------------------------------------------------------------
		// Build and append the bootstrap block.
		// ------------------------------------------------------------------
		$block = $this->buildBootstrapBlock($plugins);
		$newContent = rtrim($base) . "\n\n" . $block . "\n";

		if ($dryRun) {
			$action =
				$force && $alreadyWired
					? "replace Alpine block in"
					: "append Alpine bootstrap to";
			$this->line("  <fg=gray>Would {$action}:</> {$relative}");
			$this->newLine();

			return self::SUCCESS;
		}

		$this->files->put($appJsPath, $newContent);

		$action = $force && $alreadyWired ? "Replaced" : "Patched";
		$this->components->twoColumnDetail(
			"<fg=green>{$action}</> {$relative}",
			"Alpine bootstrap written",
		);

		$this->newLine();
		$this->printNextSteps($plugins);

		return self::SUCCESS;
	}

	// =========================================================================
	// Content helpers
	// =========================================================================

	/**
	 * Build the Alpine bootstrap block that is appended to app.js.
	 *
	 * Plugins are wired inline — no commented-out stubs, because we are only
	 * adding packages the user explicitly requested.
	 *
	 * @param list<string> $plugins  Full package names, e.g. ["@alpinejs/focus"].
	 */
	protected function buildBootstrapBlock(array $plugins): string
	{
		$lines = [];

		$lines[] =
			"// ---------------------------------------------------------------------------";
		$lines[] = "// Unified UI — Alpine.js bootstrap";
		$lines[] = "// Added by `php artisan ui:install-alpine`. Safe to edit.";
		$lines[] = "// Docs: https://unified-ui.space/docs/alpine";
		$lines[] =
			"// ---------------------------------------------------------------------------";
		$lines[] = "";
		$lines[] = "import Alpine from 'alpinejs';";

		foreach ($plugins as $pkg) {
			$importName = $this->pluginImportName($pkg);
			$lines[] = "import {$importName} from '{$pkg}';";
		}

		$lines[] = "";

		foreach ($plugins as $pkg) {
			$importName = $this->pluginImportName($pkg);
			$lines[] = "Alpine.plugin({$importName});";
		}

		if (!empty($plugins)) {
			$lines[] = "";
		}

		$lines[] =
			"// Expose Alpine globally for Blade templates and inline <script> blocks.";
		$lines[] = "window.Alpine = Alpine;";
		$lines[] = "";
		$lines[] =
			"// Start Alpine — must be the last statement in this block.";
		$lines[] = "Alpine.start();";

		return implode("\n", $lines);
	}

	/**
	 * Append import + plugin() lines for any plugins not yet present in the file.
	 *
	 * This is called when Alpine is already wired but new plugins were just
	 * installed and need to be registered.
	 *
	 * @param list<string> $plugins  Full package names.
	 */
	protected function activatePluginsInFile(
		string $appJsPath,
		string $content,
		array $plugins,
		bool $dryRun,
	): void {
		$toAdd = [];
		$relative = $this->relativePath($appJsPath);

		foreach ($plugins as $pkg) {
			$importName = $this->pluginImportName($pkg);

			// Only add if the import line is not already present.
			if (
				!str_contains($content, "from '{$pkg}'") &&
				!str_contains($content, "from \"{$pkg}\"")
			) {
				$toAdd[] = $pkg;
			}
		}

		if (empty($toAdd)) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> plugins",
				"All plugins are already registered in {$relative}",
			);
			$this->newLine();

			return;
		}

		// Insert the import lines just before the Alpine.start() call so the
		// plugin registrations sit directly above it.
		$pluginImports = "";
		$pluginRegister = "";

		foreach ($toAdd as $pkg) {
			$importName = $this->pluginImportName($pkg);
			$pluginImports .= "import {$importName} from '{$pkg}';\n";
			$pluginRegister .= "Alpine.plugin({$importName});\n";
		}

		// Inject before Alpine.start() if present, otherwise append to file.
		if (str_contains($content, "Alpine.start()")) {
			$injection = $pluginImports . $pluginRegister . "\n";
			$patched = str_replace(
				"Alpine.start()",
				$injection . "Alpine.start()",
				$content,
			);
		} else {
			$patched =
				rtrim($content) .
				"\n\n" .
				rtrim($pluginImports . $pluginRegister) .
				"\n";
		}

		if ($dryRun) {
			$this->line(
				"  <fg=gray>Would register plugins in {$relative}:</> " .
					implode(", ", $toAdd),
			);
			$this->newLine();

			return;
		}

		$this->files->put($appJsPath, $patched);

		$this->components->twoColumnDetail(
			"<fg=green>Patched</> {$relative}",
			"Registered: " . implode(", ", $toAdd),
		);
		$this->newLine();
	}

	/**
	 * Remove a previously written Unified UI Alpine bootstrap block from the file.
	 * Used when --force is passed and the block is already present.
	 */
	protected function stripAlpineBlock(string $content): string
	{
		$stripped =
			preg_replace(
				'/\n*\/\/ -{10,}\n\/\/ Unified UI — Alpine\.js bootstrap.*?Alpine\.start\(\);/s',
				"",
				$content,
			) ?? $content;

		return rtrim($stripped);
	}

	/**
	 * Check whether the file already imports Alpine.js from the alpinejs package.
	 */
	protected function containsAlpineImport(string $content): bool
	{
		return (bool) preg_match(
			'/import\s+\w+\s+from\s+[\'"]alpinejs[\'"]/',
			$content,
		);
	}

	/**
	 * Check whether the file already calls Alpine.start().
	 */
	protected function containsAlpineStart(string $content): bool
	{
		return str_contains($content, "Alpine.start()");
	}

	// =========================================================================
	// Path resolution
	// =========================================================================

	/**
	 * Resolve the absolute path to the project's JS entrypoint.
	 *
	 * Resolution order:
	 *   1. "aliases.js" in unified-ui.json + "/app.js"
	 *   2. Default: resources/js/app.js
	 */
	protected function resolveAppJsPath(): string
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$jsDir = $config["aliases"]["js"] ?? "resources/js";

		return base_path(rtrim($jsDir, "/") . "/app.js");
	}

	// =========================================================================
	// npm / package manager helpers
	// =========================================================================

	/**
	 * Resolve the full ordered list of npm packages to install.
	 *
	 * Always starts with "alpinejs" (core), followed by any @alpinejs/* plugins
	 * requested via --plugins (in the order they were specified).
	 *
	 * @return list<string>
	 */
	protected function resolvePackages(): array
	{
		$packages = ["alpinejs"];
		$pluginsOption = $this->option("plugins");

		if (is_string($pluginsOption) && $pluginsOption !== "") {
			foreach (
				array_map("trim", explode(",", $pluginsOption))
				as $shortOrFull
			) {
				if ($shortOrFull === "") {
					continue;
				}

				if (isset($this->knownPlugins[$shortOrFull])) {
					$packages[] = $this->knownPlugins[$shortOrFull];
				} elseif (str_starts_with($shortOrFull, "@alpinejs/")) {
					$packages[] = $shortOrFull;
				} else {
					$this->components->warn(
						"Unknown plugin \"{$shortOrFull}\" — skipping. " .
							"Known: " .
							implode(", ", array_keys($this->knownPlugins)),
					);
				}
			}
		}

		return array_values(array_unique($packages));
	}

	/**
	 * Check whether an npm package is present in the project's package.json.
	 */
	protected function isNpmPackageInstalled(string $package): bool
	{
		$path = base_path("package.json");

		if (!$this->files->exists($path)) {
			return false;
		}

		$json = json_decode($this->files->get($path), true);

		if (!is_array($json)) {
			return false;
		}

		$all = array_merge(
			$json["dependencies"] ?? [],
			$json["devDependencies"] ?? [],
		);

		return array_key_exists($package, $all);
	}

	/**
	 * Detect the npm-compatible package manager the project uses.
	 *
	 * Resolution order: pnpm → yarn → bun → npm (default).
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

	// =========================================================================
	// Output helpers
	// =========================================================================

	/**
	 * Print next-step instructions after app.js has been patched.
	 *
	 * @param list<string> $plugins
	 */
	protected function printNextSteps(array $plugins): void
	{
		$this->line("  <fg=gray>Next steps:</>");
		$this->newLine();
		$this->line(
			"  <fg=cyan>1.</> Ensure app.js is loaded by your Vite config (resources/js/app.js is the default).",
		);
		$this->newLine();

		if (!empty($plugins)) {
			$this->line(
				"  <fg=cyan>2.</> The following plugins were registered in app.js:",
			);

			foreach ($plugins as $pkg) {
				$importName = $this->pluginImportName($pkg);
				$this->line(
					"       <fg=green>Alpine.plugin({$importName})</> ← {$pkg}",
				);
			}

			$this->newLine();
		}

		$this->line(
			"  Run <fg=green>php artisan ui:add button</> to add your first component.",
		);
		$this->newLine();
	}

	/**
	 * Describe what the app.js step would do during a dry-run.
	 *
	 * @param list<string> $packages
	 */
	protected function describeDryRunAppJs(array $packages): void
	{
		$appJsPath = $this->resolveAppJsPath();
		$relative = $this->relativePath($appJsPath);

		$plugins = array_values(
			array_filter($packages, fn(string $pkg) => $pkg !== "alpinejs"),
		);

		if (!$this->files->exists($appJsPath)) {
			$this->line(
				"  <fg=gray>Would create:</> {$relative} (Alpine bootstrap)",
			);

			return;
		}

		$existing = $this->files->get($appJsPath);
		$alreadyWired =
			$this->containsAlpineImport($existing) &&
			$this->containsAlpineStart($existing);

		if ($alreadyWired) {
			$this->line(
				"  <fg=gray>Would skip {$relative}:</> Alpine.js is already wired.",
			);

			if (!empty($plugins)) {
				$this->line(
					"  <fg=gray>Would check plugins:</> " .
						implode(", ", $plugins),
				);
			}
		} else {
			$this->line(
				"  <fg=gray>Would append Alpine bootstrap to:</> {$relative}",
			);

			if (!empty($plugins)) {
				$this->line(
					"  <fg=gray>Plugins to register:</> " .
						implode(", ", $plugins),
				);
			}
		}
	}

	// =========================================================================
	// String utilities
	// =========================================================================

	/**
	 * Derive the JS import name for a plugin package.
	 *
	 * "@alpinejs/focus"    → "Focus"
	 * "@alpinejs/collapse" → "Collapse"
	 */
	protected function pluginImportName(string $packageName): string
	{
		$short = str_contains($packageName, "/")
			? substr($packageName, strrpos($packageName, "/") + 1)
			: $packageName;

		return ucfirst($short);
	}

	/**
	 * Return a project-relative path string suitable for console output.
	 */
	protected function relativePath(string $absolutePath): string
	{
		$base = base_path() . DIRECTORY_SEPARATOR;

		return str_starts_with($absolutePath, $base)
			? substr($absolutePath, strlen($base))
			: $absolutePath;
	}
}

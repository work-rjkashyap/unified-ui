<?php

declare(strict_types=1);

namespace Rajeshwar\UnifiedUi\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Rajeshwar\UnifiedUi\UnifiedUiServiceProvider;

class InitCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * Tailwind v4 is the only supported version — no --tailwind flag needed.
	 */
	protected $signature = 'ui:init
        {--force : Overwrite existing configuration files}
        {--css-path=resources/css : Path for CSS output}
        {--components-path=resources/views/components/ui : Path for Blade components}
        {--skip-npm : Skip npm package installation}';

	/**
	 * The console command description.
	 */
	protected $description = "Initialize Unified UI — creates config, design tokens CSS, and Tailwind v4 integration";

	/**
	 * The filesystem instance.
	 */
	protected Filesystem $files;

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
		$this->components->info("Initializing Unified UI for Laravel…");
		$this->newLine();

		$force = (bool) $this->option("force");
		$skipNpm = (bool) $this->option("skip-npm");

		// Step 1 — Create unified-ui.json config (used by CLI commands)
		$this->createConfig($force);

		// Step 2 — Publish config/unified-ui.php (Laravel config() integration)
		$this->publishPhpConfig($force);

		// Step 3 — Create resources/css/unified-ui.css (design tokens)
		$this->createDesignTokensCss($force);

		// Step 4 — Install npm packages (alpinejs + @work-rjkashyap/unified-ui)
		if (!$skipNpm) {
			$this->installNpmPackages($force);
		}

		// Step 5 — Write / patch app.css
		$this->writeAppCss($force);

		// Step 6 — Write / patch app.js
		$this->writeAppJs($force);

		// Step 7 — Ensure component directories exist
		$this->ensureDirectories();

		$this->newLine();
		$this->components->info("Unified UI initialized successfully! 🎉");
		$this->newLine();

		$this->line("  <fg=gray>Next steps:</>");
		$this->line("  <fg=cyan>1.</> Add your first component:");
		$this->line("     <fg=green>php artisan ui:add button</>");
		$this->newLine();
		$this->line("  <fg=cyan>2.</> Use it in your Blade templates:");
		$this->line(
			'     <fg=green><x-ui-button variant="primary">Click me</x-ui-button></>',
		);
		$this->newLine();
		$this->line("  <fg=cyan>3.</> List all available components:");
		$this->line("     <fg=green>php artisan ui:list</>");

		return self::SUCCESS;
	}

	/**
	 * Publish config/unified-ui.php into the Laravel project so that
	 * the package settings are accessible via config('unified-ui.*').
	 *
	 * This copies the package's bundled config/unified-ui.php stub into
	 * the project's config/ directory. It is idempotent — skipped when
	 * the file already exists unless --force is passed.
	 */
	protected function publishPhpConfig(bool $force): void
	{
		$destination = config_path(
			UnifiedUiServiceProvider::PHP_CONFIG_FILENAME,
		);
		$relative = "config/" . UnifiedUiServiceProvider::PHP_CONFIG_FILENAME;

		if ($this->files->exists($destination) && !$force) {
			$this->components->twoColumnDetail(
				"<fg=yellow>Skipped</> {$relative}",
				"already exists — use --force to overwrite",
			);
			return;
		}

		$source =
			dirname(__DIR__, 2) .
			"/config/" .
			UnifiedUiServiceProvider::PHP_CONFIG_FILENAME;

		$this->files->ensureDirectoryExists(config_path());
		$this->files->copy($source, $destination);

		$this->components->twoColumnDetail(
			"<fg=green>Created</> {$relative}",
			$destination,
		);
	}

	/**
	 * Create the unified-ui.json config file in the project root.
	 */
	protected function createConfig(bool $force): void
	{
		$configPath = base_path(UnifiedUiServiceProvider::CONFIG_FILENAME);

		if ($this->files->exists($configPath) && !$force) {
			if (
				!$this->components->confirm(
					"Config file [{$configPath}] already exists. Overwrite?",
					false,
				)
			) {
				$this->components->warn("Skipped config file creation.");
				return;
			}
		}

		$componentsPath = $this->option("components-path");
		$cssPath = $this->option("css-path");

		$config = [
			'$schema' => "https://unified-ui.space/schema/laravel.json",
			"aliases" => [
				"components" => $componentsPath,
				"alpine" => "resources/js",
				"css" => $cssPath,
				"js" => "resources/js",
			],
			"alpine" => true,
			"registry" => UnifiedUiServiceProvider::REGISTRY_URL,
		];

		$json =
			json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) .
			"\n";

		$this->files->put($configPath, $json);

		$this->components->twoColumnDetail(
			"<fg=green>Created</> unified-ui.json",
			$configPath,
		);
	}

	/**
	 * Create the CSS design tokens file with CSS custom properties and @theme.
	 */
	protected function createDesignTokensCss(bool $force): void
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$cssDir = base_path($config["aliases"]["css"] ?? "resources/css");
		$cssPath = $cssDir . "/unified-ui.css";

		if ($this->files->exists($cssPath) && !$force) {
			if (
				!$this->components->confirm(
					"CSS file [{$cssPath}] already exists. Overwrite?",
					false,
				)
			) {
				$this->components->warn("Skipped CSS file creation.");
				return;
			}
		}

		$this->files->ensureDirectoryExists($cssDir);

		$css = $this->generateDesignTokensCss();

		$this->files->put($cssPath, $css);

		$this->components->twoColumnDetail(
			"<fg=green>Created</> unified-ui.css",
			$cssPath,
		);
	}

	/**
	 * Install both required npm packages in a single run:
	 *   - alpinejs
	 *   - @work-rjkashyap/unified-ui
	 *
	 * Packages that are already present in package.json are skipped
	 * unless --force is passed.
	 */
	protected function installNpmPackages(bool $force): void
	{
		$this->newLine();
		$this->components->info("npm packages");
		$this->newLine();

		$required = ["alpinejs", "@work-rjkashyap/unified-ui"];

		$toInstall = $force
			? $required
			: array_values(
				array_filter(
					$required,
					fn(string $pkg) => !$this->isNpmPackageInstalled($pkg),
				),
			);

		// Report already-installed packages.
		foreach ($required as $pkg) {
			if (!in_array($pkg, $toInstall, true)) {
				$this->components->twoColumnDetail(
					"<fg=green>Already installed</> {$pkg}",
					"skipping",
				);
			}
		}

		if (empty($toInstall)) {
			$this->newLine();
			return;
		}

		if (!$this->files->exists(base_path("package.json"))) {
			$this->components->warn(
				"No package.json found — skipping npm install. Run `npm init -y` then re-run ui:init.",
			);
			$this->newLine();
			return;
		}

		$manager = $this->detectNpmPackageManager();
		$pkgList = implode(" ", $toInstall);
		$installCmd = match ($manager) {
			"pnpm" => "pnpm add {$pkgList}",
			"yarn" => "yarn add {$pkgList}",
			"bun" => "bun add {$pkgList}",
			default => "npm install {$pkgList}",
		};

		$this->line("  <fg=gray>Running:</> {$installCmd}");
		$this->newLine();

		$exitCode = 0;
		passthru($installCmd, $exitCode);
		$this->newLine();

		if ($exitCode === 0) {
			foreach ($toInstall as $pkg) {
				$this->components->twoColumnDetail(
					"<fg=green>Installed</> {$pkg}",
					"✓",
				);
			}
		} else {
			$this->components->error("npm install failed. Install manually:");
			$this->line("  <fg=green>{$installCmd}</>");
		}

		$this->newLine();
	}

	/**
	 * Write (or patch) resources/css/app.css with the exact imports needed:
	 *
	 *   @import "tailwindcss";
	 *   @import "./unified-ui.css";
	 *
	 * If the file does not exist it is created with both lines.
	 * If it exists but is missing one or both imports they are appended.
	 * If both are already present the step is skipped (idempotent).
	 */
	protected function writeAppCss(bool $force): void
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$cssDir = base_path($config["aliases"]["css"] ?? "resources/css");
		$appCssPath = $cssDir . "/app.css";
		$relative = str_replace(
			base_path() . DIRECTORY_SEPARATOR,
			"",
			$appCssPath,
		);

		$tailwindImport = '@import "tailwindcss";';
		$uiImport = '@import "@work-rjkashyap/unified-ui/styles.css";';
		$tokensImport = '@import "./unified-ui.css";';

		$this->newLine();
		$this->components->info("app.css");
		$this->newLine();

		// ── File does not exist → create with both imports ────────────────────
		if (!$this->files->exists($appCssPath)) {
			$this->files->ensureDirectoryExists($cssDir);
			$this->files->put(
				$appCssPath,
				implode("\n", [$tailwindImport, $uiImport, $tokensImport, ""]),
			);

			$this->components->twoColumnDetail(
				"<fg=green>Created</> {$relative}",
				"{$tailwindImport}  {$uiImport}  {$tokensImport}",
			);
			$this->newLine();
			return;
		}

		// ── File exists — inject any missing imports ──────────────────────────
		$content = $this->files->get($appCssPath);
		$missing = [];

		if (!str_contains($content, $tailwindImport)) {
			$missing[] = $tailwindImport;
		}
		if (!str_contains($content, $uiImport)) {
			$missing[] = $uiImport;
		}
		if (!str_contains($content, $tokensImport)) {
			$missing[] = $tokensImport;
		}

		if (empty($missing) && !$force) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> {$relative}",
				"imports already present",
			);
			$this->newLine();
			return;
		}

		foreach ($missing as $line) {
			$content = rtrim($content) . "\n" . $line . "\n";
		}

		$this->files->put($appCssPath, $content);

		$added = implode("  ", $missing);
		$this->components->twoColumnDetail(
			"<fg=green>Patched</> {$relative}",
			$added,
		);
		$this->newLine();
	}

	/**
	 * Write (or patch) resources/js/app.js with the exact content needed:
	 *
	 *   import Alpine from 'alpinejs';
	 *   window.Alpine = Alpine;
	 *   Alpine.start();
	 *
	 * If the file does not exist it is created with all lines.
	 * If it exists each line is checked individually and only missing
	 * lines are prepended (idempotent per-line).
	 */
	protected function writeAppJs(bool $force): void
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$jsDir = $config["aliases"]["js"] ?? "resources/js";
		$appJsPath = base_path(rtrim($jsDir, "/") . "/app.js");
		$relative = str_replace(
			base_path() . DIRECTORY_SEPARATOR,
			"",
			$appJsPath,
		);

		$this->newLine();
		$this->components->info("app.js");
		$this->newLine();

		$bootstrap = implode("\n", [
			"import Alpine from 'alpinejs';",
			"",
			"window.Alpine = Alpine;",
			"",
			"Alpine.start();",
		]);

		// ── File does not exist → create it ──────────────────────────────────
		if (!$this->files->exists($appJsPath)) {
			$this->files->ensureDirectoryExists(dirname($appJsPath));
			$this->files->put($appJsPath, $bootstrap . "\n");

			$this->components->twoColumnDetail(
				"<fg=green>Created</> {$relative}",
				"unified-ui + Alpine bootstrap written",
			);
			$this->newLine();
			return;
		}

		// ── File exists — check each required line individually ───────────────
		$content = $this->files->get($appJsPath);

		$checks = [
			"import Alpine" => "import Alpine from 'alpinejs';",
			"window.Alpine" => "window.Alpine = Alpine;",
			"Alpine.start()" => "Alpine.start();",
		];

		$missing = [];
		foreach ($checks as $needle => $line) {
			if (!str_contains($content, $needle)) {
				$missing[] = $line;
			}
		}

		if (empty($missing) && !$force) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> {$relative}",
				"all imports already present",
			);
			$this->newLine();
			return;
		}

		// Prepend the missing lines at the top so CSS loads first.
		$prepend = implode("\n", $missing);
		$this->files->put($appJsPath, $prepend . "\n\n" . ltrim($content));

		$this->components->twoColumnDetail(
			"<fg=green>Patched</> {$relative}",
			count($missing) . " line(s) prepended",
		);
		$this->newLine();
	}

	/**
	 * Ensure all target directories exist.
	 */
	protected function ensureDirectories(): void
	{
		$config = UnifiedUiServiceProvider::readConfig();

		$dirs = [
			"components" => base_path(
				$config["aliases"]["components"] ??
					"resources/views/components/ui",
			),
			"css" => base_path($config["aliases"]["css"] ?? "resources/css"),
			"js" => base_path($config["aliases"]["js"] ?? "resources/js"),
		];

		foreach ($dirs as $label => $dir) {
			$this->files->ensureDirectoryExists($dir);

			$this->components->twoColumnDetail(
				"<fg=green>Ensured</> {$label} directory",
				$dir,
			);
		}

		// Add a .gitkeep to the components directory so it's committed even if empty.
		$gitkeep = $dirs["components"] . "/.gitkeep";
		if (!$this->files->exists($gitkeep)) {
			$this->files->put($gitkeep, "");
		}
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
	 * Generate the CSS design tokens content.
	 *
	 * These CSS custom properties mirror the React Unified UI token system,
	 * mapping oklch colors, spacing, radius, shadows, and motion values.
	 *
	 * Always includes the Tailwind v4 @theme block.
	 */
	protected function generateDesignTokensCss(): string
	{
		return <<<'CSS'
		/*
		 * Unified UI — Design Tokens
		 * https://unified-ui.space
		 *
		 * Token-driven CSS custom properties for the Laravel component library.
		 * These variables power all Unified UI Blade components and integrate
		 * seamlessly with Tailwind CSS v4.
		 *
		 * Generated by: php artisan ui:init
		 */

		/* ============================================================
		 * Color Tokens (oklch)
		 *
		 * All color values are stored as raw oklch channels (L C H)
		 * without the oklch() wrapper, allowing alpha composition:
		 *   color: oklch(var(--ui-primary));
		 *   color: oklch(var(--ui-primary) / 0.5);
		 * ============================================================ */

		:root {
		    /* --- Brand / Primary --- */
		    --ui-primary: 0.637 0.237 262.12;
		    --ui-primary-foreground: 0.985 0.002 247.84;

		    /* --- Secondary --- */
		    --ui-secondary: 0.928 0.006 264.53;
		    --ui-secondary-foreground: 0.208 0.042 265.76;

		    /* --- Accent --- */
		    --ui-accent: 0.928 0.006 264.53;
		    --ui-accent-foreground: 0.208 0.042 265.76;

		    /* --- Destructive / Danger --- */
		    --ui-destructive: 0.577 0.245 27.33;
		    --ui-destructive-foreground: 0.985 0.002 247.84;

		    /* --- Muted --- */
		    --ui-muted: 0.928 0.006 264.53;
		    --ui-muted-foreground: 0.556 0.022 257.42;

		    /* --- Surface / Background --- */
		    --ui-background: 1.0 0.0 0.0;
		    --ui-foreground: 0.145 0.033 256.79;

		    /* --- Card --- */
		    --ui-card: 1.0 0.0 0.0;
		    --ui-card-foreground: 0.145 0.033 256.79;

		    /* --- Popover --- */
		    --ui-popover: 1.0 0.0 0.0;
		    --ui-popover-foreground: 0.145 0.033 256.79;

		    /* --- Border / Input / Ring --- */
		    --ui-border: 0.902 0.014 262.75;
		    --ui-input: 0.902 0.014 262.75;
		    --ui-ring: 0.637 0.237 262.12;

		    /* --- Success --- */
		    --ui-success: 0.627 0.194 149.21;
		    --ui-success-foreground: 0.985 0.002 247.84;

		    /* --- Warning --- */
		    --ui-warning: 0.769 0.188 70.08;
		    --ui-warning-foreground: 0.208 0.042 265.76;

		    /* --- Info --- */
		    --ui-info: 0.623 0.214 259.53;
		    --ui-info-foreground: 0.985 0.002 247.84;

		    /* ============================================================
		     * Spacing Tokens
		     * ============================================================ */
		    --ui-spacing-0: 0rem;
		    --ui-spacing-0-5: 0.125rem;
		    --ui-spacing-1: 0.25rem;
		    --ui-spacing-1-5: 0.375rem;
		    --ui-spacing-2: 0.5rem;
		    --ui-spacing-2-5: 0.625rem;
		    --ui-spacing-3: 0.75rem;
		    --ui-spacing-3-5: 0.875rem;
		    --ui-spacing-4: 1rem;
		    --ui-spacing-5: 1.25rem;
		    --ui-spacing-6: 1.5rem;
		    --ui-spacing-8: 2rem;
		    --ui-spacing-10: 2.5rem;
		    --ui-spacing-12: 3rem;
		    --ui-spacing-16: 4rem;
		    --ui-spacing-20: 5rem;
		    --ui-spacing-24: 6rem;

		    /* ============================================================
		     * Border Radius Tokens
		     * ============================================================ */
		    --ui-radius-sm: 0.25rem;
		    --ui-radius-md: 0.375rem;
		    --ui-radius-lg: 0.5rem;
		    --ui-radius-xl: 0.75rem;
		    --ui-radius-2xl: 1rem;
		    --ui-radius-full: 9999px;

		    /* ============================================================
		     * Shadow Tokens
		     * ============================================================ */
		    --ui-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.03);
		    --ui-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06);
		    --ui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07);
		    --ui-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08);
		    --ui-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08);

		    /* ============================================================
		     * Typography Tokens
		     * ============================================================ */
		    --ui-font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
		    --ui-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
		    --ui-font-size-xs: 0.75rem;
		    --ui-font-size-sm: 0.875rem;
		    --ui-font-size-base: 1rem;
		    --ui-font-size-lg: 1.125rem;
		    --ui-font-size-xl: 1.25rem;
		    --ui-font-size-2xl: 1.5rem;
		    --ui-font-size-3xl: 1.875rem;
		    --ui-font-size-4xl: 2.25rem;
		    --ui-line-height-tight: 1.25;
		    --ui-line-height-normal: 1.5;
		    --ui-line-height-relaxed: 1.625;
		    --ui-font-weight-normal: 400;
		    --ui-font-weight-medium: 500;
		    --ui-font-weight-semibold: 600;
		    --ui-font-weight-bold: 700;

		    /* ============================================================
		     * Motion / Animation Tokens
		     * ============================================================ */
		    --ui-duration-fast: 100ms;
		    --ui-duration-normal: 200ms;
		    --ui-duration-slow: 300ms;
		    --ui-duration-slower: 500ms;
		    --ui-ease-default: cubic-bezier(0.4, 0.0, 0.2, 1);
		    --ui-ease-in: cubic-bezier(0.4, 0.0, 1, 1);
		    --ui-ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
		    --ui-ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
		    --ui-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

		    /* ============================================================
		     * Z-Index Tokens
		     * ============================================================ */
		    --ui-z-dropdown: 50;
		    --ui-z-sticky: 100;
		    --ui-z-fixed: 200;
		    --ui-z-overlay: 300;
		    --ui-z-modal: 400;
		    --ui-z-popover: 500;
		    --ui-z-toast: 600;
		    --ui-z-tooltip: 700;

		    /* ============================================================
		     * Focus Ring
		     * ============================================================ */
		    --ui-ring-width: 2px;
		    --ui-ring-offset: 2px;
		}

		/* ============================================================
		 * Dark Mode Token Overrides
		 * ============================================================ */

		.dark,
		[data-theme="dark"] {
		    --ui-primary: 0.637 0.237 262.12;
		    --ui-primary-foreground: 0.985 0.002 247.84;

		    --ui-secondary: 0.268 0.028 260.03;
		    --ui-secondary-foreground: 0.928 0.006 264.53;

		    --ui-accent: 0.268 0.028 260.03;
		    --ui-accent-foreground: 0.928 0.006 264.53;

		    --ui-destructive: 0.577 0.245 27.33;
		    --ui-destructive-foreground: 0.985 0.002 247.84;

		    --ui-muted: 0.268 0.028 260.03;
		    --ui-muted-foreground: 0.556 0.022 257.42;

		    --ui-background: 0.145 0.033 256.79;
		    --ui-foreground: 0.985 0.002 247.84;

		    --ui-card: 0.145 0.033 256.79;
		    --ui-card-foreground: 0.985 0.002 247.84;

		    --ui-popover: 0.145 0.033 256.79;
		    --ui-popover-foreground: 0.985 0.002 247.84;

		    --ui-border: 0.268 0.028 260.03;
		    --ui-input: 0.268 0.028 260.03;
		    --ui-ring: 0.541 0.229 264.36;

		    --ui-success: 0.627 0.194 149.21;
		    --ui-success-foreground: 0.985 0.002 247.84;

		    --ui-warning: 0.769 0.188 70.08;
		    --ui-warning-foreground: 0.208 0.042 265.76;

		    --ui-info: 0.623 0.214 259.53;
		    --ui-info-foreground: 0.985 0.002 247.84;

		    --ui-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.15);
		    --ui-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.2), 0 1px 2px -1px rgb(0 0 0 / 0.2);
		    --ui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25);
		    --ui-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
		    --ui-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.35), 0 8px 10px -6px rgb(0 0 0 / 0.35);
		}

		@media (prefers-color-scheme: dark) {
		    :root:not([data-theme="light"]):not(.light) {
		        --ui-primary: 0.637 0.237 262.12;
		        --ui-primary-foreground: 0.985 0.002 247.84;

		        --ui-secondary: 0.268 0.028 260.03;
		        --ui-secondary-foreground: 0.928 0.006 264.53;

		        --ui-accent: 0.268 0.028 260.03;
		        --ui-accent-foreground: 0.928 0.006 264.53;

		        --ui-destructive: 0.577 0.245 27.33;
		        --ui-destructive-foreground: 0.985 0.002 247.84;

		        --ui-muted: 0.268 0.028 260.03;
		        --ui-muted-foreground: 0.556 0.022 257.42;

		        --ui-background: 0.145 0.033 256.79;
		        --ui-foreground: 0.985 0.002 247.84;

		        --ui-card: 0.145 0.033 256.79;
		        --ui-card-foreground: 0.985 0.002 247.84;

		        --ui-popover: 0.145 0.033 256.79;
		        --ui-popover-foreground: 0.985 0.002 247.84;

		        --ui-border: 0.268 0.028 260.03;
		        --ui-input: 0.268 0.028 260.03;
		        --ui-ring: 0.541 0.229 264.36;

		        --ui-success: 0.627 0.194 149.21;
		        --ui-success-foreground: 0.985 0.002 247.84;

		        --ui-warning: 0.769 0.188 70.08;
		        --ui-warning-foreground: 0.208 0.042 265.76;

		        --ui-info: 0.623 0.214 259.53;
		        --ui-info-foreground: 0.985 0.002 247.84;

		        --ui-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.15);
		        --ui-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.2), 0 1px 2px -1px rgb(0 0 0 / 0.2);
		        --ui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25);
		        --ui-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
		        --ui-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.35), 0 8px 10px -6px rgb(0 0 0 / 0.35);
		    }
		}

		/* ============================================================
		 * Tailwind CSS v4 @theme Integration
		 *
		 * These custom properties are automatically registered as
		 * utility classes by Tailwind v4 via the @theme directive.
		 * e.g. `bg-primary`, `text-muted-foreground`, `rounded-lg`
		 *
		 * No tailwind.config.js is needed — Tailwind v4 reads @theme
		 * directly from CSS.
		 * ============================================================ */

		@theme {
		    /* --- Colors --- */
		    --color-primary: oklch(var(--ui-primary));
		    --color-primary-foreground: oklch(var(--ui-primary-foreground));
		    --color-secondary: oklch(var(--ui-secondary));
		    --color-secondary-foreground: oklch(var(--ui-secondary-foreground));
		    --color-accent: oklch(var(--ui-accent));
		    --color-accent-foreground: oklch(var(--ui-accent-foreground));
		    --color-destructive: oklch(var(--ui-destructive));
		    --color-destructive-foreground: oklch(var(--ui-destructive-foreground));
		    --color-muted: oklch(var(--ui-muted));
		    --color-muted-foreground: oklch(var(--ui-muted-foreground));
		    --color-success: oklch(var(--ui-success));
		    --color-success-foreground: oklch(var(--ui-success-foreground));
		    --color-warning: oklch(var(--ui-warning));
		    --color-warning-foreground: oklch(var(--ui-warning-foreground));
		    --color-info: oklch(var(--ui-info));
		    --color-info-foreground: oklch(var(--ui-info-foreground));
		    --color-background: oklch(var(--ui-background));
		    --color-foreground: oklch(var(--ui-foreground));
		    --color-card: oklch(var(--ui-card));
		    --color-card-foreground: oklch(var(--ui-card-foreground));
		    --color-popover: oklch(var(--ui-popover));
		    --color-popover-foreground: oklch(var(--ui-popover-foreground));
		    --color-border: oklch(var(--ui-border));
		    --color-input: oklch(var(--ui-input));
		    --color-ring: oklch(var(--ui-ring));

		    /* --- Border Radius --- */
		    --radius-sm: var(--ui-radius-sm);
		    --radius-md: var(--ui-radius-md);
		    --radius-lg: var(--ui-radius-lg);
		    --radius-xl: var(--ui-radius-xl);
		    --radius-2xl: var(--ui-radius-2xl);
		    --radius-full: var(--ui-radius-full);

		    /* --- Shadows --- */
		    --shadow-xs: var(--ui-shadow-xs);
		    --shadow-sm: var(--ui-shadow-sm);
		    --shadow-md: var(--ui-shadow-md);
		    --shadow-lg: var(--ui-shadow-lg);
		    --shadow-xl: var(--ui-shadow-xl);

		    /* --- Font Families --- */
		    --font-sans: var(--ui-font-sans);
		    --font-mono: var(--ui-font-mono);

		    /* --- Transition Durations --- */
		    --duration-fast: var(--ui-duration-fast);
		    --duration-normal: var(--ui-duration-normal);
		    --duration-slow: var(--ui-duration-slow);
		    --duration-slower: var(--ui-duration-slower);

		    /* --- Transition Timing Functions --- */
		    --ease-ui-default: var(--ui-ease-default);
		    --ease-ui-in: var(--ui-ease-in);
		    --ease-ui-out: var(--ui-ease-out);
		    --ease-ui-in-out: var(--ui-ease-in-out);
		    --ease-ui-bounce: var(--ui-ease-bounce);

		    /* --- Z-Index --- */
		    --z-dropdown: var(--ui-z-dropdown);
		    --z-sticky: var(--ui-z-sticky);
		    --z-fixed: var(--ui-z-fixed);
		    --z-overlay: var(--ui-z-overlay);
		    --z-modal: var(--ui-z-modal);
		    --z-popover: var(--ui-z-popover);
		    --z-toast: var(--ui-z-toast);
		    --z-tooltip: var(--ui-z-tooltip);
		}

		/* ============================================================
		 * Utility Classes
		 * ============================================================ */

		/*
		 * Focus ring utility — consistent keyboard focus indicator.
		 * Usage: class="ui-focus-ring"
		 */
		.ui-focus-ring:focus-visible {
		    outline: var(--ui-ring-width) solid oklch(var(--ui-ring));
		    outline-offset: var(--ui-ring-offset);
		}

		/*
		 * Transition presets.
		 */
		.ui-transition {
		    transition-property: color, background-color, border-color, box-shadow, opacity, transform;
		    transition-timing-function: var(--ui-ease-default);
		    transition-duration: var(--ui-duration-normal);
		}

		.ui-transition-fast {
		    transition-property: color, background-color, border-color, box-shadow, opacity, transform;
		    transition-timing-function: var(--ui-ease-default);
		    transition-duration: var(--ui-duration-fast);
		}

		.ui-transition-slow {
		    transition-property: color, background-color, border-color, box-shadow, opacity, transform;
		    transition-timing-function: var(--ui-ease-default);
		    transition-duration: var(--ui-duration-slow);
		}

		/*
		 * Screen-reader only utility.
		 */
		.ui-sr-only {
		    position: absolute;
		    width: 1px;
		    height: 1px;
		    padding: 0;
		    margin: -1px;
		    overflow: hidden;
		    clip: rect(0, 0, 0, 0);
		    white-space: nowrap;
		    border-width: 0;
		}

		/*
		 * Not screen-reader only — reverses .ui-sr-only when focused.
		 */
		.ui-not-sr-only {
		    position: static;
		    width: auto;
		    height: auto;
		    padding: 0;
		    margin: 0;
		    overflow: visible;
		    clip: auto;
		    white-space: normal;
		}

		/* ============================================================
		 * Alpine.js Transition Utilities
		 *
		 * Pre-built CSS classes for Alpine.js x-transition directives.
		 * These work with the Unified UI motion tokens for consistency.
		 *
		 * Usage with Alpine:
		 *   x-transition:enter="ui-enter"
		 *   x-transition:enter-start="ui-enter-start"
		 *   x-transition:enter-end="ui-enter-end"
		 *   x-transition:leave="ui-leave"
		 *   x-transition:leave-start="ui-leave-start"
		 *   x-transition:leave-end="ui-leave-end"
		 * ============================================================ */

		.ui-enter {
		    transition: opacity var(--ui-duration-normal) var(--ui-ease-out),
		                transform var(--ui-duration-normal) var(--ui-ease-out);
		}
		.ui-enter-start {
		    opacity: 0;
		    transform: scale(0.95) translateY(-4px);
		}
		.ui-enter-end {
		    opacity: 1;
		    transform: scale(1) translateY(0);
		}
		.ui-leave {
		    transition: opacity var(--ui-duration-fast) var(--ui-ease-in),
		                transform var(--ui-duration-fast) var(--ui-ease-in);
		}
		.ui-leave-start {
		    opacity: 1;
		    transform: scale(1) translateY(0);
		}
		.ui-leave-end {
		    opacity: 0;
		    transform: scale(0.95) translateY(-4px);
		}

		/* Fade only (no scale/translate) */
		.ui-fade-enter {
		    transition: opacity var(--ui-duration-normal) var(--ui-ease-out);
		}
		.ui-fade-enter-start { opacity: 0; }
		.ui-fade-enter-end { opacity: 1; }
		.ui-fade-leave {
		    transition: opacity var(--ui-duration-fast) var(--ui-ease-in);
		}
		.ui-fade-leave-start { opacity: 1; }
		.ui-fade-leave-end { opacity: 0; }

		/* Slide down (for dropdowns, popovers) */
		.ui-slide-enter {
		    transition: opacity var(--ui-duration-normal) var(--ui-ease-out),
		                transform var(--ui-duration-normal) var(--ui-ease-out);
		}
		.ui-slide-enter-start {
		    opacity: 0;
		    transform: translateY(-8px);
		}
		.ui-slide-enter-end {
		    opacity: 1;
		    transform: translateY(0);
		}
		.ui-slide-leave {
		    transition: opacity var(--ui-duration-fast) var(--ui-ease-in),
		                transform var(--ui-duration-fast) var(--ui-ease-in);
		}
		.ui-slide-leave-start {
		    opacity: 1;
		    transform: translateY(0);
		}
		.ui-slide-leave-end {
		    opacity: 0;
		    transform: translateY(-8px);
		}

		/* ============================================================
		 * Skeleton wave animation
		 * ============================================================ */

		@keyframes ui-skeleton-wave-anim {
		    0% {
		        background-position: -200% 0;
		    }
		    100% {
		        background-position: 200% 0;
		    }
		}

		.ui-skeleton-wave {
		    background: linear-gradient(
		        90deg,
		        oklch(var(--ui-muted)) 25%,
		        oklch(var(--ui-muted) / 0.5) 50%,
		        oklch(var(--ui-muted)) 75%
		    );
		    background-size: 200% 100%;
		    animation: ui-skeleton-wave-anim 1.8s ease-in-out infinite;
		}

		/* ============================================================
		 * Backdrop blur utility (for modal / sheet / overlay)
		 * ============================================================ */

		.ui-backdrop {
		    background-color: oklch(var(--ui-background) / 0.6);
		    backdrop-filter: blur(4px);
		    -webkit-backdrop-filter: blur(4px);
		}

		.ui-backdrop-heavy {
		    background-color: oklch(var(--ui-background) / 0.8);
		    backdrop-filter: blur(8px);
		    -webkit-backdrop-filter: blur(8px);
		}

		/* ============================================================
		 * Custom scrollbar styles
		 * ============================================================ */

		.ui-scrollbar {
		    scrollbar-width: thin;
		    scrollbar-color: oklch(var(--ui-border)) transparent;
		}

		.ui-scrollbar::-webkit-scrollbar {
		    width: 6px;
		    height: 6px;
		}

		.ui-scrollbar::-webkit-scrollbar-track {
		    background: transparent;
		}

		.ui-scrollbar::-webkit-scrollbar-thumb {
		    background-color: oklch(var(--ui-border));
		    border-radius: var(--ui-radius-full);
		}

		.ui-scrollbar::-webkit-scrollbar-thumb:hover {
		    background-color: oklch(var(--ui-muted-foreground) / 0.5);
		}
		CSS;
	}
}

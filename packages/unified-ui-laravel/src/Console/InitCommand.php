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
        {--components-path=resources/views/components/ui : Path for Blade components}';

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

		// Step 1 — Create unified-ui.json
		$this->createConfig($force);

		// Step 2 — Create CSS design tokens file (includes @theme for Tailwind v4)
		$this->createDesignTokensCss($force);

		// Step 3 — Install @work-rjkashyap/unified-ui npm package and patch app.js/app.css
		$this->installUnifiedUiNpm($force);

		// Step 4 — Patch app.css to import the design tokens
		$this->patchAppCss($force);

		// Step 5 — Ensure component directories exist
		$this->ensureDirectories();

		// Step 6 — Detect dependencies (Alpine.js, Tailwind CSS) and patch app.js
		$this->detectEnvironment();

		$this->newLine();
		$this->components->info("Unified UI initialized successfully!");
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
	 * Install the @work-rjkashyap/unified-ui npm package and wire it into
	 * app.js (CSS import) so the design system styles are bundled by Vite.
	 *
	 * - Skips the npm install when the package is already listed in package.json
	 *   (unless --force is passed).
	 * - Always attempts to patch app.js so the import line is present even when
	 *   the package was already installed in a previous run.
	 */
	protected function installUnifiedUiNpm(bool $force): void
	{
		$pkg = "@work-rjkashyap/unified-ui";

		$this->newLine();
		$this->components->info("Unified UI — npm package");
		$this->newLine();

		$alreadyInstalled = $this->isNpmPackageInstalled($pkg);

		if ($alreadyInstalled && !$force) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> {$pkg}",
				"already in package.json — pass --force to reinstall",
			);
		} else {
			$manager = $this->detectNpmPackageManager();
			$installCmd = match ($manager) {
				"pnpm" => "pnpm add {$pkg}",
				"yarn" => "yarn add {$pkg}",
				"bun" => "bun add {$pkg}",
				default => "npm install {$pkg}",
			};

			$this->line("  <fg=gray>Running:</> {$installCmd}");
			$this->newLine();

			$result = 0;
			passthru($installCmd, $result);
			$this->newLine();

			if ($result === 0) {
				$this->components->twoColumnDetail(
					"<fg=green>Installed</> {$pkg}",
					"npm package ready",
				);
			} else {
				$this->components->error(
					"Failed to install {$pkg}. Install manually:",
				);
				$this->line("  <fg=green>{$installCmd}</>");
			}
		}

		// Always patch app.js — idempotent, skips if already present.
		$this->patchAppJsUnifiedUiImport();
	}

	/**
	 * Append an import of the Unified UI package styles into app.js so Vite
	 * bundles the CSS automatically.
	 *
	 * Line added:
	 *   import '@work-rjkashyap/unified-ui/styles.css';
	 */
	protected function patchAppJsUnifiedUiImport(): void
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$jsDir = $config["aliases"]["js"] ?? "resources/js";
		$appJsPath = base_path(rtrim($jsDir, "/") . "/app.js");

		$importLine = "import '@work-rjkashyap/unified-ui/styles.css';";
		$relative = str_replace(
			base_path() . DIRECTORY_SEPARATOR,
			"",
			$appJsPath,
		);

		// File doesn't exist yet — will be created by patchAppJs later; skip.
		if (!$this->files->exists($appJsPath)) {
			$this->components->twoColumnDetail(
				"<fg=yellow>Skipped</> {$relative}",
				"file not found — import will be added when app.js is created",
			);
			$this->newLine();
			return;
		}

		$existing = $this->files->get($appJsPath);

		if (str_contains($existing, $importLine)) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> {$relative}",
				"import already present",
			);
			$this->newLine();
			return;
		}

		// Prepend so the CSS loads before any component JS.
		$this->files->put($appJsPath, $importLine . "\n" . $existing);

		$this->components->twoColumnDetail(
			"<fg=green>Patched</> {$relative}",
			"import '@work-rjkashyap/unified-ui/styles.css' prepended",
		);
		$this->newLine();
	}

	/**
	 * Patch the project's main app.css to import the Unified UI tokens file.
	 *
	 * Adds:
	 *   @import "./unified-ui.css";
	 *
	 * If app.css does not exist it is created with both the Tailwind and
	 * Unified UI imports. If the import is already present the step is
	 * skipped (idempotent).
	 */
	protected function patchAppCss(bool $force): void
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$cssDir = base_path($config["aliases"]["css"] ?? "resources/css");
		$appCssPath = $cssDir . "/app.css";
		$relative = str_replace(
			base_path() . DIRECTORY_SEPARATOR,
			"",
			$appCssPath,
		);

		$importLine = '@import "./unified-ui.css";';
		$tailwindLine = '@import "tailwindcss";';

		$this->newLine();
		$this->components->info("app.css — Unified UI CSS");
		$this->newLine();

		// ── File does not exist → create it ──────────────────────────────────
		if (!$this->files->exists($appCssPath)) {
			$this->files->ensureDirectoryExists($cssDir);
			$this->files->put(
				$appCssPath,
				implode("\n", [$tailwindLine, $importLine, ""]),
			);

			$this->components->twoColumnDetail(
				"<fg=green>Created</> {$relative}",
				"Tailwind + Unified UI imports written",
			);
			$this->newLine();
			return;
		}

		// ── File exists — inspect it ──────────────────────────────────────────
		$existing = $this->files->get($appCssPath);

		if (str_contains($existing, $importLine) && !$force) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> {$relative}",
				'@import "./unified-ui.css" already present — pass --force to overwrite',
			);
			$this->newLine();
			return;
		}

		// ── Append the import ─────────────────────────────────────────────────
		$this->files->put(
			$appCssPath,
			rtrim($existing) . "\n" . $importLine . "\n",
		);

		$this->components->twoColumnDetail(
			"<fg=green>Patched</> {$relative}",
			'@import "./unified-ui.css" appended',
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
	 * Detect and report on required / optional dependencies.
	 *
	 * Alpine.js is the primary JS framework for interactive components.
	 * Tailwind CSS v4 is required.
	 */
	protected function detectEnvironment(): void
	{
		$this->newLine();
		$this->components->info("Environment");

		// Read config to check if Alpine.js is enabled.
		$config = UnifiedUiServiceProvider::readConfig();
		$alpineEnabled = $config["alpine"] ?? true;

		// Alpine.js — required for interactive components
		$alpineInstalled = $this->isNpmPackageInstalled("alpinejs");
		$this->components->twoColumnDetail(
			"Alpine.js",
			$alpineInstalled
				? "<fg=green>Installed</> — interactive components ready"
				: "<fg=yellow>Not detected</> — required for interactive components",
		);

		if (!$alpineInstalled) {
			$this->newLine();

			if ($alpineEnabled) {
				// Auto-install Alpine.js when "alpine": true in config (no prompt).
				$this->components->warn(
					'Alpine.js was not detected. Installing automatically ("alpine": true in config)…',
				);
				$this->installAlpineJs();
			} else {
				// Alpine is disabled in config — just inform the user.
				$this->components->warn(
					"Alpine.js was not detected in package.json.",
				);
				$manager = $this->detectNpmPackageManager();
				$this->line(
					"  <fg=yellow>Install manually if needed:</> <fg=green>{$manager} add alpinejs</>",
				);
			}
		}

		// Tailwind CSS v4
		$tailwindInstalled = $this->isNpmPackageInstalled("tailwindcss");
		$this->components->twoColumnDetail(
			"Tailwind CSS",
			$tailwindInstalled
				? "<fg=green>Installed</>"
				: "<fg=red>Not detected</> — Unified UI requires Tailwind CSS v4",
		);

		if (!$tailwindInstalled) {
			$this->newLine();
			$this->components->warn(
				"Tailwind CSS was not detected in package.json. Please install it:",
			);
			$manager = $this->detectNpmPackageManager();
			$this->line(
				"  <fg=green>{$manager} add -D tailwindcss @tailwindcss/vite</>",
			);
		}

		// @alpinejs/focus — optional but recommended
		$alpineFocusInstalled = $this->isNpmPackageInstalled("@alpinejs/focus");
		if ($alpineInstalled && !$alpineFocusInstalled) {
			$this->components->twoColumnDetail(
				"Alpine Focus Plugin",
				"<fg=gray>Not installed</> — optional, improves keyboard navigation",
			);
		}

		// @alpinejs/collapse — optional
		$alpineCollapseInstalled = $this->isNpmPackageInstalled(
			"@alpinejs/collapse",
		);
		if ($alpineInstalled && !$alpineCollapseInstalled) {
			$this->components->twoColumnDetail(
				"Alpine Collapse Plugin",
				"<fg=gray>Not installed</> — optional, smooth accordion/collapsible animations",
			);
		}
	}

	/**
	 * Install Alpine.js via the detected package manager.
	 */
	protected function installAlpineJs(): void
	{
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
				"Failed to install Alpine.js. Install manually:",
			);
			$this->line("  <fg=green>{$installCmd}</>");
		}

		// Patch app.js to import and start Alpine regardless of whether the
		// npm install succeeded — the user may fix it manually afterwards.
		$this->patchAppJs();
	}

	/**
	 * Patch (or create) app.js with the Alpine.js bootstrap block.
	 *
	 * Kept self-contained on InitCommand so $this->components is always
	 * available — cross-command delegation via the container produces a null
	 * $components property because run() has not been called on the delegate.
	 */
	protected function patchAppJs(): void
	{
		$config = UnifiedUiServiceProvider::readConfig();
		$jsDir = $config["aliases"]["js"] ?? "resources/js";
		$appJsPath = base_path(rtrim($jsDir, "/") . "/app.js");
		$relative = str_replace(
			base_path() . DIRECTORY_SEPARATOR,
			"",
			$appJsPath,
		);

		$alpineBlock = implode("\n", [
			"// ---------------------------------------------------------------------------",
			"// Unified UI — Alpine.js bootstrap",
			"// Added by `php artisan ui:init`. Safe to edit.",
			"// Docs: https://unified-ui.space/docs/alpine",
			"// ---------------------------------------------------------------------------",
			"",
			"import Alpine from 'alpinejs';",
			"",
			"// Expose Alpine globally for Blade templates and inline <script> blocks.",
			"window.Alpine = Alpine;",
			"",
			"// Start Alpine — must be the last statement in this block.",
			"Alpine.start();",
		]);

		$this->newLine();
		$this->components->info("app.js — Alpine Bootstrap");
		$this->newLine();

		// ── File does not exist → create it ──────────────────────────────────
		if (!$this->files->exists($appJsPath)) {
			$this->files->ensureDirectoryExists(dirname($appJsPath));
			$this->files->put($appJsPath, $alpineBlock . "\n");

			$this->components->twoColumnDetail(
				"<fg=green>Created</> {$relative}",
				"Alpine bootstrap written",
			);
			$this->newLine();
			return;
		}

		// ── File exists — skip if already wired ───────────────────────────────
		$existing = $this->files->get($appJsPath);
		$hasImport = (bool) preg_match(
			'/import\s+\w+\s+from\s+[\'"]alpinejs[\'"]/',
			$existing,
		);
		$hasStart = str_contains($existing, "Alpine.start()");

		if ($hasImport && $hasStart) {
			$this->components->twoColumnDetail(
				"<fg=green>Skipped</> {$relative}",
				"Alpine.js already wired",
			);
			$this->newLine();
			return;
		}

		// ── Append bootstrap block ────────────────────────────────────────────
		$this->files->put(
			$appJsPath,
			rtrim($existing) . "\n\n" . $alpineBlock . "\n",
		);

		$this->components->twoColumnDetail(
			"<fg=green>Patched</> {$relative}",
			"Alpine bootstrap appended",
		);
		$this->newLine();
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

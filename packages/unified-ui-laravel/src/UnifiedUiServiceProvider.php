<?php

declare(strict_types=1);

namespace Rajeshwar\UnifiedUi;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Rajeshwar\UnifiedUi\Console\AddComponentCommand;
use Rajeshwar\UnifiedUi\Console\DiffComponentCommand;
use Rajeshwar\UnifiedUi\Console\InitCommand;
use Rajeshwar\UnifiedUi\Console\ListComponentsCommand;

class UnifiedUiServiceProvider extends ServiceProvider
{
	/**
	 * The prefix used for all package Blade components.
	 */
	public const PREFIX = "ui";

	/**
	 * The registry URL for fetching component definitions.
	 */
	public const REGISTRY_URL = "https://raw.githubusercontent.com/imrj05/unified-ui-laravel/main/registry.json";

	/**
	 * The config filename used in the Laravel project root.
	 */
	public const CONFIG_FILENAME = "unified-ui.json";

	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		$this->app->singleton("unified-ui.registry", function () {
			return new Registry();
		});
	}

	/**
	 * Bootstrap any package services.
	 */
	public function boot(): void
	{
		$this->registerCommands();
		$this->registerViews();
		$this->registerComponents();
		$this->registerPublishing();
	}

	/**
	 * Register the Artisan commands provided by the package.
	 */
	protected function registerCommands(): void
	{
		if ($this->app->runningInConsole()) {
			$this->commands([
				InitCommand::class,
				AddComponentCommand::class,
				ListComponentsCommand::class,
				DiffComponentCommand::class,
			]);
		}
	}

	/**
	 * Register the package's Blade views so components work out of the box
	 * when installed via Composer (without copying stubs).
	 */
	protected function registerViews(): void
	{
		$stubsPath = $this->stubsPath();

		// Load packaged stubs as a view namespace: <x-ui::button />
		$this->loadViewsFrom($stubsPath, self::PREFIX);

		// Allow publishing stubs into the project
		$this->publishes(
			[
				$stubsPath => resource_path("views/vendor/" . self::PREFIX),
			],
			"unified-ui-views",
		);
	}

	/**
	 * Register anonymous Blade components from the stubs directory.
	 *
	 * When the package is installed via Composer the components are available
	 * as <x-ui-button />, <x-ui-badge />, etc. without needing to copy files.
	 *
	 * If the user has copied components into their project via `php artisan ui:add`,
	 * those local files take precedence automatically because Laravel resolves
	 * project views before package views.
	 */
	protected function registerComponents(): void
	{
		// Register the anonymous component namespace so that <x-ui-button />
		// resolves to the package stubs when no local override exists.
		Blade::anonymousComponentPath($this->stubsPath(), self::PREFIX);

		// If the user has a local unified-ui components directory, register
		// it with higher priority so local copies override package stubs.
		$localPath = $this->resolveLocalComponentsPath();

		if ($localPath && is_dir($localPath)) {
			Blade::anonymousComponentPath($localPath, self::PREFIX);
		}
	}

	/**
	 * Register publishable assets.
	 */
	protected function registerPublishing(): void
	{
		if ($this->app->runningInConsole()) {
			// CSS design tokens
			$this->publishes(
				[
					__DIR__ .
					"/../resources/css/unified-ui.css" => resource_path(
						"css/unified-ui.css",
					),
				],
				"unified-ui-css",
			);

			// Config file
			$this->publishes(
				[
					__DIR__ . "/../stubs/unified-ui.json" => base_path(
						"unified-ui.json",
					),
				],
				"unified-ui-config",
			);
		}
	}

	/**
	 * Resolve the local components path from unified-ui.json config,
	 * falling back to the default location.
	 */
	protected function resolveLocalComponentsPath(): ?string
	{
		$configPath = base_path(self::CONFIG_FILENAME);

		if (file_exists($configPath)) {
			$config = json_decode(file_get_contents($configPath), true);

			if (isset($config["aliases"]["components"])) {
				$path = $config["aliases"]["components"];

				// Support both absolute and relative paths
				return str_starts_with($path, "/") ? $path : base_path($path);
			}
		}

		// Default location
		$defaultPath = resource_path("views/components/ui");

		return is_dir($defaultPath) ? $defaultPath : null;
	}

	/**
	 * Get the path to the package stubs directory.
	 */
	public static function stubsPath(): string
	{
		return __DIR__ . "/../stubs";
	}

	/**
	 * Get the path to the package registry file.
	 */
	public static function registryPath(): string
	{
		return __DIR__ . "/../registry.json";
	}

	/**
	 * Load and decode the local registry.json bundled with the package.
	 *
	 * @return array<string, mixed>
	 */
	public static function loadLocalRegistry(): array
	{
		$path = static::registryPath();

		if (!file_exists($path)) {
			return [];
		}

		$contents = file_get_contents($path);

		if ($contents === false) {
			return [];
		}

		$decoded = json_decode($contents, true);

		return is_array($decoded) ? $decoded : [];
	}

	/**
	 * Read the project's unified-ui.json configuration.
	 *
	 * @return array<string, mixed>
	 */
	public static function readConfig(): array
	{
		$path = base_path(self::CONFIG_FILENAME);

		if (!file_exists($path)) {
			return static::defaultConfig();
		}

		$contents = file_get_contents($path);

		if ($contents === false) {
			return static::defaultConfig();
		}

		$decoded = json_decode($contents, true);

		return is_array($decoded)
			? array_replace_recursive(static::defaultConfig(), $decoded)
			: static::defaultConfig();
	}

	/**
	 * Get the default configuration values.
	 *
	 * Alpine.js is the primary JS framework for interactive components.
	 * Tailwind CSS v4 is the only supported version — v4 auto-detects
	 * CSS custom properties via the @theme directive, so no JS config
	 * file is needed.
	 *
	 * @return array<string, mixed>
	 */
	public static function defaultConfig(): array
	{
		return [
			"aliases" => [
				"components" => "resources/views/components/ui",
				"alpine" => "resources/js",
				"css" => "resources/css",
				"js" => "resources/js",
			],
			"alpine" => true,
			"registry" => self::REGISTRY_URL,
		];
	}
}

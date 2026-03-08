<?php

declare(strict_types=1);

namespace Rajeshwar\UnifiedUi;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class Registry
{
	/**
	 * Cache key for the remote registry.
	 */
	protected const CACHE_KEY = "unified-ui:registry";

	/**
	 * Cache TTL in seconds (1 hour).
	 */
	protected const CACHE_TTL = 3600;

	/**
	 * The resolved registry data.
	 *
	 * @var array<string, mixed>|null
	 */
	protected ?array $data = null;

	/**
	 * Whether to prefer the remote registry over the local bundled one.
	 */
	protected bool $preferRemote;

	/**
	 * The remote registry URL.
	 */
	protected string $remoteUrl;

	public function __construct(
		?string $remoteUrl = null,
		bool $preferRemote = true,
	) {
		$config = UnifiedUiServiceProvider::readConfig();
		$this->remoteUrl =
			$remoteUrl ??
			($config["registry"] ?? UnifiedUiServiceProvider::REGISTRY_URL);
		$this->preferRemote = $preferRemote;
	}

	/**
	 * Get all component definitions from the registry.
	 *
	 * @return array<string, array<string, mixed>>
	 */
	public function all(): array
	{
		$data = $this->resolve();

		return $data["components"] ?? [];
	}

	/**
	 * Get a single component definition by name.
	 *
	 * @return array<string, mixed>|null
	 */
	public function get(string $name): ?array
	{
		$components = $this->all();

		return $components[$name] ?? null;
	}

	/**
	 * Check whether a component exists in the registry.
	 */
	public function has(string $name): bool
	{
		return $this->get($name) !== null;
	}

	/**
	 * Get a list of all available component names.
	 *
	 * @return list<string>
	 */
	public function names(): array
	{
		return array_keys($this->all());
	}

	/**
	 * Search components by name or description (case-insensitive partial match).
	 *
	 * @return array<string, array<string, mixed>>
	 */
	public function search(string $query): array
	{
		$query = mb_strtolower($query);
		$results = [];

		foreach ($this->all() as $name => $component) {
			$nameMatch = str_contains(mb_strtolower($name), $query);
			$descMatch =
				isset($component["description"]) &&
				str_contains(mb_strtolower($component["description"]), $query);

			if ($nameMatch || $descMatch) {
				$results[$name] = $component;
			}
		}

		return $results;
	}

	/**
	 * Resolve the full dependency tree for a component (recursive).
	 *
	 * Returns an ordered list of component names that must be installed,
	 * including the requested component itself (listed last).
	 *
	 * @return list<string>
	 *
	 * @throws \RuntimeException If a dependency is not found in the registry.
	 */
	public function resolveDependencies(
		string $name,
		array &$resolved = [],
		array &$seen = [],
	): array {
		if (in_array($name, $resolved, true)) {
			return $resolved;
		}

		if (in_array($name, $seen, true)) {
			// Circular dependency detected — skip to avoid infinite recursion.
			return $resolved;
		}

		$seen[] = $name;

		$component = $this->get($name);

		if ($component === null) {
			throw new \RuntimeException(
				"Component [{$name}] not found in the registry.",
			);
		}

		// Resolve internal component dependencies first.
		$deps = $component["dependencies"]["components"] ?? [];

		foreach ($deps as $dep) {
			$this->resolveDependencies($dep, $resolved, $seen);
		}

		$resolved[] = $name;

		return $resolved;
	}

	/**
	 * Get the Composer package dependencies for a component and all its transitive deps.
	 *
	 * @return list<string>
	 */
	public function composerDependencies(string $name): array
	{
		$components = $this->resolveDependencies($name);
		$packages = [];

		foreach ($components as $componentName) {
			$component = $this->get($componentName);
			if ($component && isset($component["dependencies"]["composer"])) {
				foreach ($component["dependencies"]["composer"] as $pkg) {
					if (!in_array($pkg, $packages, true)) {
						$packages[] = $pkg;
					}
				}
			}
		}

		return $packages;
	}

	/**
	 * Get the npm package dependencies for a component and all its transitive deps.
	 *
	 * @return list<string>
	 */
	public function npmDependencies(string $name): array
	{
		$components = $this->resolveDependencies($name);
		$packages = [];

		foreach ($components as $componentName) {
			$component = $this->get($componentName);
			if ($component && isset($component["dependencies"]["npm"])) {
				foreach ($component["dependencies"]["npm"] as $pkg) {
					if (!in_array($pkg, $packages, true)) {
						$packages[] = $pkg;
					}
				}
			}
		}

		return $packages;
	}

	/**
	 * Get the files that need to be written for a component.
	 *
	 * @return list<array{type: string, path: string, url: string}>
	 */
	public function files(string $name): array
	{
		$component = $this->get($name);

		if ($component === null) {
			return [];
		}

		return $component["files"] ?? [];
	}

	/**
	 * Fetch the raw content for a single file entry from the registry.
	 *
	 * Attempts the remote URL first, then falls back to the local stubs directory.
	 */
	public function fetchFileContent(array $file): ?string
	{
		// Try the URL (GitHub raw) first.
		if (!empty($file["url"])) {
			$content = $this->fetchUrl($file["url"]);
			if ($content !== null) {
				return $content;
			}
		}

		// Fallback: read from the local stubs bundled with the package.
		return $this->readLocalStub($file);
	}

	/**
	 * Resolve the full registry data — remote first, then local fallback.
	 *
	 * @return array<string, mixed>
	 */
	public function resolve(): array
	{
		if ($this->data !== null) {
			return $this->data;
		}

		if ($this->preferRemote) {
			$remote = $this->fetchRemote();
			if ($remote !== null) {
				$this->data = $remote;
				return $this->data;
			}
		}

		// Fall back to the local registry bundled with the package.
		$this->data = $this->loadLocal();

		return $this->data;
	}

	/**
	 * Force a fresh fetch from the remote registry (bypass cache).
	 *
	 * @return array<string, mixed>
	 */
	public function refresh(): array
	{
		$this->data = null;
		$this->clearCache();

		return $this->resolve();
	}

	/**
	 * Clear the cached remote registry.
	 */
	public function clearCache(): void
	{
		try {
			Cache::forget(self::CACHE_KEY);
		} catch (\Throwable) {
			// Cache may not be available in all contexts.
		}
	}

	/**
	 * Fetch and decode the remote registry, with caching.
	 *
	 * @return array<string, mixed>|null
	 */
	protected function fetchRemote(): ?array
	{
		// Try the cache first.
		try {
			$cached = Cache::get(self::CACHE_KEY);
			if (is_array($cached)) {
				return $cached;
			}
		} catch (\Throwable) {
			// Cache driver may not be configured.
		}

		$content = $this->fetchUrl($this->remoteUrl);

		if ($content === null) {
			return null;
		}

		$decoded = json_decode($content, true);

		if (!is_array($decoded)) {
			return null;
		}

		// Store in cache.
		try {
			Cache::put(self::CACHE_KEY, $decoded, self::CACHE_TTL);
		} catch (\Throwable) {
			// Silently continue without caching.
		}

		return $decoded;
	}

	/**
	 * Load the registry.json file bundled with the package.
	 *
	 * @return array<string, mixed>
	 */
	protected function loadLocal(): array
	{
		return UnifiedUiServiceProvider::loadLocalRegistry();
	}

	/**
	 * Fetch content from a URL via HTTP.
	 */
	protected function fetchUrl(string $url): ?string
	{
		try {
			// Prefer Laravel's Http client when available.
			if (class_exists(Http::class)) {
				$response = Http::timeout(15)
					->connectTimeout(10)
					->withHeaders([
						"Accept" => "application/json, text/plain, */*",
						"User-Agent" => "unified-ui-laravel/1.0",
					])
					->get($url);

				if ($response->successful()) {
					return $response->body();
				}

				return null;
			}

			// Fallback to file_get_contents for minimal environments.
			$context = stream_context_create([
				"http" => [
					"timeout" => 15,
					"header" => "User-Agent: unified-ui-laravel/1.0\r\n",
				],
			]);

			$content = @file_get_contents($url, false, $context);

			return $content !== false ? $content : null;
		} catch (\Throwable) {
			return null;
		}
	}

	/**
	 * Read a file from the local stubs directory.
	 *
	 * The file entry's "path" is resolved relative to the stubs directory,
	 * stripping any leading path segments that match the default aliases.
	 */
	protected function readLocalStub(array $file): ?string
	{
		$relativePath = $file["path"] ?? "";

		if (empty($relativePath)) {
			return null;
		}

		// Extract just the filename from the path.
		$filename = basename($relativePath);

		// Try direct path in stubs directory.
		$candidates = [
			UnifiedUiServiceProvider::stubsPath() . "/" . $filename,
			UnifiedUiServiceProvider::stubsPath() . "/" . $relativePath,
		];

		// Also check for type-based subdirectories.
		$type = $file["type"] ?? "blade";
		if ($type === "alpine") {
			$candidates[] =
				UnifiedUiServiceProvider::stubsPath() . "/alpine/" . $filename;
		} elseif ($type === "php") {
			$candidates[] =
				dirname(UnifiedUiServiceProvider::stubsPath()) .
				"/src/Components/" .
				$filename;
		} elseif ($type === "js") {
			$candidates[] =
				UnifiedUiServiceProvider::stubsPath() . "/js/" . $filename;
		}

		foreach ($candidates as $candidate) {
			if (file_exists($candidate)) {
				$content = file_get_contents($candidate);
				return $content !== false ? $content : null;
			}
		}

		return null;
	}

	/**
	 * Get metadata about the registry (version, component count, etc.).
	 *
	 * @return array<string, mixed>
	 */
	public function meta(): array
	{
		$data = $this->resolve();

		return [
			"version" => $data["version"] ?? "unknown",
			"updated_at" => $data["updated_at"] ?? null,
			"total_components" => count($data["components"] ?? []),
			"source" =>
				$this->data !== null && $this->preferRemote
					? "remote"
					: "local",
		];
	}
}

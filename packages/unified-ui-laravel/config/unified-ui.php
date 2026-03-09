<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Component Aliases / Path Overrides
    |--------------------------------------------------------------------------
    |
    | Controls where Unified UI reads from and writes to inside your project.
    | All relative paths are resolved from the Laravel base_path().
    |
    | components  — Where published / copy-pasted Blade components live.
    |               Local files here take precedence over the package stubs.
    | css         — Where unified-ui.css (design tokens) is written.
    | js          — Where app.js / Alpine bootstrap is written.
    | alpine      — Where additional Alpine component JS files are placed.
    |
    */

    'aliases' => [
        'components' => 'resources/views/components/ui',
        'css'        => 'resources/css',
        'js'         => 'resources/js',
        'alpine'     => 'resources/js',
    ],

    /*
    |--------------------------------------------------------------------------
    | Alpine.js Integration
    |--------------------------------------------------------------------------
    |
    | Set to true (default) to enable Alpine.js-powered interactive components.
    | When false, only static/CSS-only Blade components will be scaffolded and
    | the `ui:init` command will skip injecting the Alpine bootstrap into app.js.
    |
    */

    'alpine' => true,

    /*
    |--------------------------------------------------------------------------
    | Component Registry URL
    |--------------------------------------------------------------------------
    |
    | The remote registry used by `php artisan ui:add` and `php artisan ui:list`
    | to fetch component definitions and files.
    |
    | You can point this at a self-hosted registry for private / forked builds.
    |
    */

    'registry' => 'https://raw.githubusercontent.com/imrj05/unified-ui-laravel/main/registry.json',

    /*
    |--------------------------------------------------------------------------
    | Registry Cache TTL (seconds)
    |--------------------------------------------------------------------------
    |
    | How long the remote registry response is cached via Laravel's cache driver.
    | Set to 0 to disable caching entirely (useful during development).
    |
    */

    'registry_cache_ttl' => 3600,

    /*
    |--------------------------------------------------------------------------
    | Blade Component Prefix
    |--------------------------------------------------------------------------
    |
    | The prefix used for all Unified UI Blade components. With the default
    | value of "ui" you use components like <x-ui-button />, <x-ui-card />.
    |
    | Changing this after installing components requires re-publishing the
    | stubs and updating all existing usages in your templates.
    |
    */

    'prefix' => 'ui',

    /*
    |--------------------------------------------------------------------------
    | Dark Mode Strategy
    |--------------------------------------------------------------------------
    |
    | Controls how dark mode is activated.
    |
    |   "class"       — Toggled by adding the `.dark` class to <html>.
    |   "media"       — Follows the OS/browser prefers-color-scheme setting.
    |   "data-theme"  — Toggled via the `data-theme="dark"` attribute on <html>.
    |
    */

    'dark_mode' => 'class',

    /*
    |--------------------------------------------------------------------------
    | Installed Components
    |--------------------------------------------------------------------------
    |
    | A record of components that have been added to your project via
    | `php artisan ui:add`. This list is managed automatically by the CLI
    | and is used by `php artisan ui:diff` to detect upstream changes.
    |
    | You may add entries manually if you copied components without the CLI.
    |
    */

    'installed_components' => [
        // 'button',
        // 'card',
        // 'badge',
    ],

];

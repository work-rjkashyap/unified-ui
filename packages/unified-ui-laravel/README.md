<p align="center">
    <img src="https://unified-ui.space/logo.svg" width="80" alt="Unified UI Logo" />
</p>

<h1 align="center">Unified UI for Laravel</h1>

<p align="center">
    A scalable, token-driven Blade component library for Laravel.<br>
    75+ components built on Tailwind CSS &amp; Alpine.js.<br>
    Install the Composer package <strong>or</strong> copy-paste with the Artisan CLI.
</p>

<p align="center">
    <a href="https://packagist.org/packages/rajeshwar/unified-ui-laravel"><img src="https://img.shields.io/packagist/v/rajeshwar/unified-ui-laravel.svg?style=flat-square" alt="Latest Version on Packagist"></a>
    <a href="https://packagist.org/packages/rajeshwar/unified-ui-laravel"><img src="https://img.shields.io/packagist/dt/rajeshwar/unified-ui-laravel.svg?style=flat-square" alt="Total Downloads"></a>
    <a href="https://github.com/imrj05/unified-ui-laravel/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
    <a href="https://unified-ui.space"><img src="https://img.shields.io/badge/docs-unified--ui.space-blueviolet?style=flat-square" alt="Documentation"></a>
</p>

---

## About

**Unified UI for Laravel** is the server-side counterpart to the [Unified UI React design system](https://unified-ui.space). It brings the same token-driven architecture, consistent visual language, and developer experience to the Laravel ecosystem using Blade components and Alpine.js.

### Key Features

- **Token-driven** — Every color, spacing, radius, shadow, and motion value comes from CSS custom properties. Override a few variables, retheme everything.
- **Two distribution modes** — Install the full Composer package for zero-config convenience, or copy-paste individual components with the Artisan CLI for full source ownership.
- **75+ components** — Buttons, Cards, Modals, Tables, Inputs, Badges, Tabs, Accordions, Dropdowns, and more.
- **Dark mode native** — All tokens and components respect light/dark mode via CSS custom properties with zero config.
- **Tailwind CSS v4** — First-class support with native `@theme` integration for seamless token mapping.
- **Alpine.js powered** — Interactive components use Alpine.js for lightweight, declarative client-side behavior with zero build step.
- **Accessible** — Proper ARIA attributes, keyboard navigation, and focus management baked into every component.
- **Laravel 10, 11 & 12** — Supports all actively maintained Laravel versions.

---

## Requirements

| Dependency   | Version                                                 |
| ------------ | ------------------------------------------------------- |
| PHP          | ^8.1                                                    |
| Laravel      | ^10.0 \| ^11.0 \| ^12.0                                 |
| Tailwind CSS | v4.x                                                    |
| Alpine.js    | ^3.0 _(optional — required for interactive components)_ |

---

## Installation

### Option A: Composer Package (Recommended)

Install the package — all components are immediately available as `<x-ui-*>` tags:

```bash
composer require rajeshwar/unified-ui-laravel
```

The service provider is auto-discovered. Components are registered under the `ui` prefix and work out of the box:

```blade
<x-ui-button variant="primary">Click me</x-ui-button>
<x-ui-badge variant="success">Active</x-ui-badge>
<x-ui-card>
    <x-ui-card.header>
        <x-ui-card.title>Hello World</x-ui-card.title>
    </x-ui-card.header>
    <x-ui-card.body>
        <p>Card content goes here.</p>
    </x-ui-card.body>
</x-ui-card>
```

### Option B: Artisan CLI (Copy & Paste)

Like shadcn/ui — components are copied directly into your project. You own the source and can modify anything.

#### 1. Install the package

```bash
composer require rajeshwar/unified-ui-laravel --dev
```

#### 2. Initialize your project

```bash
php artisan ui:init
```

This creates:

- `unified-ui.json` — configuration file with path aliases
- `resources/css/unified-ui.css` — design token CSS custom properties
- Tailwind CSS `@theme` integration instructions

#### 3. Add components

```bash
php artisan ui:add button
php artisan ui:add button badge card input
php artisan ui:add --all
```

The CLI automatically resolves and installs all dependencies (other components, Composer packages, npm packages).

#### 4. Use in your Blade templates

```blade
<x-ui-button variant="primary" size="lg">Submit</x-ui-button>
```

---

## Artisan Commands

| Command                        | Description                                                           |
| ------------------------------ | --------------------------------------------------------------------- |
| `php artisan ui:init`          | Initialize project — creates config, CSS tokens, Tailwind integration |
| `php artisan ui:add <name...>` | Add one or more components with automatic dependency resolution       |
| `php artisan ui:add --all`     | Add all available components                                          |
| `php artisan ui:list`          | List all available components in a formatted table                    |
| `php artisan ui:diff <name>`   | Compare local file against the registry version                       |

### Command Options

```bash
# Force overwrite existing config/CSS
php artisan ui:init --force

# Overwrite existing component files
php artisan ui:add button --overwrite

# Preview what would be installed without writing files
php artisan ui:add button --dry-run

# Skip external dependency installation prompts
php artisan ui:add modal --no-deps

# Use only the local bundled registry (offline mode)
php artisan ui:add button --offline

# Filter component list
php artisan ui:list --search=form
php artisan ui:list --type=blade
php artisan ui:list --installed
php artisan ui:list --not-installed

# Output as JSON
php artisan ui:list --json
php artisan ui:diff button --json

# Diff all installed components at once
php artisan ui:diff --all

# Summary-only diff (no full output)
php artisan ui:diff --all --summary
```

---

## Configuration

After running `php artisan ui:init`, a `unified-ui.json` file is created at your project root:

```json
{
	"$schema": "https://unified-ui.space/schema/laravel.json",
	"aliases": {
		"components": "resources/views/components/ui",
		"css": "resources/css",
		"js": "resources/js"
	},
	"registry": "https://raw.githubusercontent.com/imrj05/unified-ui-laravel/main/registry.json"
}
```

### Configuration Options

| Key                  | Description                             | Default                         |
| -------------------- | --------------------------------------- | ------------------------------- |
| `aliases.components` | Where Blade component files are written | `resources/views/components/ui` |
| `aliases.css`        | Where CSS files are written             | `resources/css`                 |
| `aliases.js`         | Where JavaScript files are written      | `resources/js`                  |
| `registry`           | URL to the component registry JSON      | GitHub raw URL                  |

---

## Design Tokens

Unified UI uses CSS custom properties (design tokens) as the single source of truth for all visual values. These are defined in `resources/css/unified-ui.css` and power every component.

### Color Tokens (oklch)

All colors use the [oklch color space](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) for perceptual uniformity:

```css
:root {
	--ui-primary: 0.637 0.237 262.12;
	--ui-primary-foreground: 0.985 0.002 247.84;
	--ui-destructive: 0.577 0.245 27.33;
	--ui-success: 0.627 0.194 149.21;
	/* ... */
}
```

Use them in your own styles:

```css
.my-element {
	background: oklch(var(--ui-primary));
	color: oklch(var(--ui-primary-foreground));
	/* With alpha */
	border-color: oklch(var(--ui-primary) / 0.5);
}
```

### Token Categories

| Category       | Examples                                                                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Colors**     | `--ui-primary`, `--ui-secondary`, `--ui-destructive`, `--ui-success`, `--ui-warning`, `--ui-info`, `--ui-muted`, `--ui-background`, `--ui-foreground`, `--ui-card`, `--ui-popover`, `--ui-border`, `--ui-ring` |
| **Spacing**    | `--ui-spacing-0` through `--ui-spacing-24`                                                                                                                                                                     |
| **Radius**     | `--ui-radius-sm`, `--ui-radius-md`, `--ui-radius-lg`, `--ui-radius-xl`, `--ui-radius-2xl`, `--ui-radius-full`                                                                                                  |
| **Shadows**    | `--ui-shadow-xs`, `--ui-shadow-sm`, `--ui-shadow-md`, `--ui-shadow-lg`, `--ui-shadow-xl`                                                                                                                       |
| **Typography** | `--ui-font-sans`, `--ui-font-mono`, `--ui-font-size-*`, `--ui-line-height-*`, `--ui-font-weight-*`                                                                                                             |
| **Motion**     | `--ui-duration-fast`, `--ui-duration-normal`, `--ui-duration-slow`, `--ui-ease-default`, `--ui-ease-bounce`                                                                                                    |
| **Z-Index**    | `--ui-z-dropdown`, `--ui-z-modal`, `--ui-z-popover`, `--ui-z-toast`, `--ui-z-tooltip`                                                                                                                          |

### Dark Mode

Dark mode works automatically via three methods:

1. **Class-based** — Add the `dark` class to `<html>` or any ancestor element
2. **Data attribute** — Add `data-theme="dark"` to `<html>` or any ancestor
3. **System preference** — Automatically detects `prefers-color-scheme: dark` unless overridden

### Tailwind CSS Integration

The CSS file includes a `@theme` block that automatically registers all tokens as Tailwind utilities:

```css
@import "tailwindcss";
@import "./unified-ui.css";
```

Now you can use `bg-primary`, `text-muted-foreground`, `rounded-lg`, etc. directly in your Blade templates.

---

## Components

### Component Categories

| Category          | Components                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Form Controls** | `button`, `input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `switch`, `slider`, `label`, `form`, `form-group` |
| **Data Display**  | `card`, `badge`, `avatar`, `table`, `stat`, `accordion`, `collapsible`                                                    |
| **Feedback**      | `alert`, `spinner`, `skeleton`, `progress`, `empty-state`, `banner`                                                       |
| **Overlays**      | `modal`, `dropdown`, `tooltip`, `popover`, `sheet`, `alert-dialog`, `command`                                             |
| **Navigation**    | `tabs`, `breadcrumb`, `pagination`                                                                                        |
| **Layout**        | `stack`, `container`, `separator`, `aspect-ratio`, `scroll-area`                                                          |
| **Typography**    | `heading`, `text`, `kbd`, `code`                                                                                          |
| **Alpine**        | `alpine-counter` _(example integration)_                                                                                  |

### Component Examples

#### Button

```blade
{{-- Variants --}}
<x-ui-button variant="primary">Primary</x-ui-button>
<x-ui-button variant="secondary">Secondary</x-ui-button>
<x-ui-button variant="destructive">Danger</x-ui-button>
<x-ui-button variant="outline">Outline</x-ui-button>
<x-ui-button variant="ghost">Ghost</x-ui-button>
<x-ui-button variant="link">Link</x-ui-button>

{{-- Sizes --}}
<x-ui-button size="xs">Extra Small</x-ui-button>
<x-ui-button size="sm">Small</x-ui-button>
<x-ui-button size="md">Medium</x-ui-button>
<x-ui-button size="lg">Large</x-ui-button>

{{-- States --}}
<x-ui-button loading>Saving…</x-ui-button>
<x-ui-button disabled>Disabled</x-ui-button>
<x-ui-button fullWidth>Full Width</x-ui-button>

{{-- As anchor --}}
<x-ui-button as="a" href="/dashboard" variant="outline">Dashboard</x-ui-button>
```

#### Card

```blade
<x-ui-card>
    <x-ui-card.header bordered>
        <x-ui-card.title>Team Members</x-ui-card.title>
        <x-ui-card.description>Manage your team and permissions.</x-ui-card.description>
        <x-slot:action>
            <x-ui-button variant="outline" size="sm">Invite</x-ui-button>
        </x-slot:action>
    </x-ui-card.header>
    <x-ui-card.body>
        <p>Card content goes here.</p>
    </x-ui-card.body>
    <x-ui-card.footer bordered justify="between">
        <span class="text-sm text-muted-foreground">3 members</span>
        <x-ui-button variant="primary">Save Changes</x-ui-button>
    </x-ui-card.footer>
</x-ui-card>
```

#### Input

```blade
{{-- Basic input with label and validation --}}
<x-ui-input
    name="email"
    label="Email Address"
    type="email"
    placeholder="you@example.com"
    :error="$errors->first('email')"
    required
/>

{{-- With icons --}}
<x-ui-input name="search" placeholder="Search…" icon-left="search" />

{{-- As textarea --}}
<x-ui-input name="bio" label="Biography" as="textarea" rows="4" />
```

#### Badge

```blade
<x-ui-badge>Default</x-ui-badge>
<x-ui-badge variant="success">Active</x-ui-badge>
<x-ui-badge variant="destructive" size="lg">Critical</x-ui-badge>
<x-ui-badge variant="outline" dot>Online</x-ui-badge>
<x-ui-badge variant="warning" removable>Beta</x-ui-badge>
```

#### Alert

```blade
<x-ui-alert variant="success" title="Payment received">
    Your payment of $49.99 has been processed successfully.
</x-ui-alert>

<x-ui-alert variant="destructive" dismissible>
    Something went wrong. Please try again.
</x-ui-alert>
```

#### Avatar

```blade
{{-- With image --}}
<x-ui-avatar src="/img/user.jpg" alt="Jane Doe" />

{{-- With initials --}}
<x-ui-avatar name="Jane Doe" />

{{-- With status --}}
<x-ui-avatar src="/img/user.jpg" status="online" size="lg" />

{{-- Avatar group --}}
<div class="flex -space-x-2">
    <x-ui-avatar src="/img/u1.jpg" ring size="sm" />
    <x-ui-avatar src="/img/u2.jpg" ring size="sm" />
    <x-ui-avatar initials="+3" ring size="sm" />
</div>
```

---

## Project Structure

### Composer Package (installed via `composer require`)

```
your-laravel-app/
├── vendor/
│   └── rajeshwar/unified-ui-laravel/
│       ├── src/
│       │   ├── UnifiedUiServiceProvider.php
│       │   ├── Registry.php
│       │   └── Console/
│       │       ├── InitCommand.php
│       │       ├── AddComponentCommand.php
│       │       ├── ListComponentsCommand.php
│       │       └── DiffComponentCommand.php
│       ├── stubs/                    ← Blade component templates
│       │   ├── button.blade.php
│       │   ├── badge.blade.php
│       │   ├── card.blade.php
│       │   ├── card/
│       │   │   ├── header.blade.php
│       │   │   ├── body.blade.php
│       │   │   ├── title.blade.php
│       │   │   ├── description.blade.php
│       │   │   └── footer.blade.php
│       │   └── ...
│       ├── resources/css/            ← Design token CSS
│       ├── registry.json             ← Component registry
│       └── composer.json
```

### After `php artisan ui:init` + `php artisan ui:add button card`

```
your-laravel-app/
├── unified-ui.json                            ← Project config
├── resources/
│   ├── css/
│   │   └── unified-ui.css                     ← Design tokens
│   └── views/
│       └── components/
│           └── ui/                            ← Your owned components
│               ├── button.blade.php
│               ├── card.blade.php
│               └── card/
│                   ├── header.blade.php
│                   ├── body.blade.php
│                   ├── title.blade.php
│                   ├── description.blade.php
│                   └── footer.blade.php
```

---

## How It Works

### Two Distribution Modes

|                   | **Composer Package**                            | **Artisan CLI**              |
| ----------------- | ----------------------------------------------- | ---------------------------- |
| **Install**       | `composer require rajeshwar/unified-ui-laravel` | `php artisan ui:add button`  |
| **Updates**       | Composer update                                 | Re-run CLI or `ui:diff`      |
| **File location** | `vendor/` (read-only)                           | Your project (editable)      |
| **Customization** | Override via CSS tokens                         | Edit source directly         |
| **Best for**      | Zero-config consistency                         | Full control & customization |

### Component Resolution Priority

When both the Composer package and local files exist, Laravel resolves components in this order:

1. **Local project** — `resources/views/components/ui/button.blade.php`
2. **Package stubs** — `vendor/rajeshwar/unified-ui-laravel/stubs/button.blade.php`

This means you can install the full package via Composer and then selectively override individual components by copying them with `php artisan ui:add button`.

### Registry System

The CLI fetches component definitions from a JSON registry:

- **Remote registry** — fetched from GitHub and cached for 1 hour
- **Local registry** — bundled with the package as `registry.json`
- **Fallback** — if the remote is unavailable, the local registry is used automatically

Each registry entry defines:

- Component name and description
- File entries with type, path, and remote URL
- Composer and npm dependencies
- Internal component dependencies (auto-resolved)

### Safety

- The CLI will **never overwrite** existing files unless you pass `--overwrite`
- Use `php artisan ui:diff <name>` to review changes before updating
- The `--dry-run` flag previews what would be installed without writing anything

---

## Alpine.js Integration

Alpine.js components (modals, dropdowns, tabs, counters, etc.) declare `alpinejs` as an npm dependency. The CLI will:

1. Detect whether Alpine.js is in your `package.json`
2. If missing, prompt you to install it
3. Auto-detect your package manager (npm, pnpm, yarn, bun)

---

## Customization

### Override Design Tokens

Add your overrides after importing the Unified UI CSS:

```css
@import "tailwindcss";
@import "./unified-ui.css";

:root {
	/* Override primary color to green */
	--ui-primary: 0.627 0.194 149.21;

	/* Increase border radius */
	--ui-radius-md: 0.5rem;
	--ui-radius-lg: 0.75rem;

	/* Faster animations */
	--ui-duration-normal: 150ms;
}
```

### Edit Copied Components

After running `php artisan ui:add button`, the source file is yours:

```
resources/views/components/ui/button.blade.php
```

Edit variants, add sizes, change animations — whatever you need. The CLI will warn you if the registry has updates via `php artisan ui:diff button`.

---

## Comparison

| Feature                     | Copy-paste only | Unified UI Laravel |
| --------------------------- | --------------- | ------------------ |
| Production-ready components | ✅              | ✅                 |
| Accessible (ARIA, keyboard) | ✅              | ✅                 |
| Single Composer install     | ❌              | ✅                 |
| Semantic versioning         | ❌              | ✅                 |
| Token-driven theming        | ❌              | ✅                 |
| Dark mode native            | ❌              | ✅                 |
| Full source ownership       | ✅              | ✅                 |
| Diff against registry       | ❌              | ✅                 |
| Dependency auto-resolution  | ❌              | ✅                 |
| Alpine.js detection         | ❌              | ✅                 |
| Tailwind v4 support         | ❌              | ✅                 |

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add amazing component'`)
4. Push to the branch (`git push origin feature/amazing-component`)
5. Open a Pull Request

### Adding a New Component

1. Create the Blade stub in `stubs/`
2. Add the component entry to `registry.json`
3. Test both distribution modes (Composer and CLI)
4. Update the README component list

---

## Changelog

Please see [CHANGELOG.md](CHANGELOG.md) for information on recent changes.

---

## Security

If you discover any security related issues, please email work.rjkashyap05@gmail.com instead of using the issue tracker.

---

## Credits

- [Rajeshwar Kashyap](https://github.com/work-rjkashyap)
- Inspired by [shadcn/ui](https://ui.shadcn.com) and the [Unified UI React design system](https://unified-ui.space)
- Built on [Laravel](https://laravel.com), [Tailwind CSS](https://tailwindcss.com), and [Alpine.js](https://alpinejs.dev)

---

## License

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.

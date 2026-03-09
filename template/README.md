# unified-ui Templates

This directory contains official starter templates for the [`@work-rjkashyap/unified-ui`](https://github.com/imrj05/unified-ui) design system.

Each template is automatically mirrored to its own readonly GitHub repository. **Do not commit directly to those repos** — all changes must go through this monorepo under `template/`.

---

## Available Templates

| Template | Directory | Readonly Repo | Stack |
|---|---|---|---|
| Next.js | `unified-ui-nextjs/` | [unified-ui-template-nextjs](https://github.com/imrj05/unified-ui-template-nextjs) | Next.js 16, App Router, Tailwind CSS v4 |
| React (Vite) | `unified-ui-vite/` | [unified-ui-template-react](https://github.com/imrj05/unified-ui-template-react) | React 19, Vite, Tailwind CSS v4 |
| TanStack Router | `unified-ui-tanstack-router/` | [unified-ui-template-tanstack-router](https://github.com/imrj05/unified-ui-template-tanstack-router) | React 19, Vite, TanStack Router, Tailwind CSS v4 |
| Laravel | `unified-ui-laravel/` | [unified-ui-template-laravel](https://github.com/imrj05/unified-ui-template-laravel) | Laravel 12, Blade, Vite, Tailwind CSS v4 |

---

## Using a Template

### Next.js

```bash
npx create-next-app --example https://github.com/imrj05/unified-ui-template-nextjs my-app
```

### React (Vite)

```bash
npx degit imrj05/unified-ui-template-react my-app
cd my-app && npm install
```

### TanStack Router

```bash
npx degit imrj05/unified-ui-template-tanstack-router my-app
cd my-app && npm install
```

### Laravel

```bash
npx degit imrj05/unified-ui-template-laravel my-app
cd my-app
composer install
npm install
cp .env.example .env
php artisan key:generate
```

---

## How Sync Works

Each template is kept in sync with its readonly GitHub repo via a GitHub Actions workflow (`.github/workflows/sync-templates.yml`) that runs on every push to `main` when files under `template/**` change.

The workflow uses `git subtree split` to extract the subtree history for each template and force-pushes it to the corresponding `main` branch of the readonly repo.

---

## Contributing

To modify a template:

1. Make your changes inside `template/unified-ui-<name>/` in this monorepo.
2. Commit and push to `main` on `imrj05/unified-ui`.
3. The CI workflow will automatically sync the changes to the corresponding readonly repo within minutes.

Never commit directly to a readonly template repo — those pushes will be overwritten on the next sync.

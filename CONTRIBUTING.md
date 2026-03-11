# Contributing to Unified UI

Thanks for contributing. This repository is an npm workspace monorepo with:

- Docs app at repository root (Next.js)
- Design system package at `packages/unified-ui`

## Prerequisites

- Node.js 20 or newer
- npm 9 or newer

## Local Setup

```bash
npm install
```

Run docs app:

```bash
npm run dev
```

Run design system in watch mode (separate terminal):

```bash
npm run dev:ds
```

## Development Guidelines

- Keep changes focused and small when possible.
- Add or update docs for behavior/API changes.
- For UI changes, include screenshots or a short screen recording in the PR.
- For package changes, call out user-facing effects clearly.

## Before Opening a Pull Request

Run these checks locally:

```bash
npm run lint
npm run types:check
npm run build
```

If your changes affect the design system package directly, also run:

```bash
npm run build:ds
```

## Commit Message Guidance

Use clear, conventional-style commit messages when possible:

```text
feat(scope): short summary
fix(scope): short summary
docs(scope): short summary
chore(scope): short summary
```

This is guidance, not a hard requirement.

## Pull Request Expectations

- Explain what changed and why.
- Link related issues (for example, `Closes #123`).
- Describe how you tested the change.
- Include visual evidence for UI changes.
- Mention if the change should be reflected in changelog/release notes.

## Reporting Issues

Use the repository issue forms:

- Bug report for defects/regressions
- Feature request for enhancements

Please include a minimal reproduction where possible.

## Monorepo Notes

- Root app and package builds are separate; run relevant checks for touched areas.
- This repo includes Laravel/template split and sync workflows. If your change affects those paths, note it clearly in the PR description.

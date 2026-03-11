# Governance

## Project Model

This project uses a maintainer-led governance model.

- Maintainers make final decisions on roadmap, releases, and policy.
- Contributors are encouraged to propose changes through issues and pull requests.
- Decisions aim for transparent reasoning and practical outcomes.

## Decision Making

- Minor changes (docs, fixes, refactors): accepted through normal PR review.
- Significant changes (API, architecture, release process): discussed in issues/PRs before merge.
- If consensus is unclear, maintainers decide and document rationale.

## Issue Triage

Issues are triaged by maintainers into one or more states:

- `bug` for confirmed defects
- `enhancement` for accepted feature work
- `needs-repro` when reproduction details are missing
- `needs-info` when required context is incomplete
- `duplicate` when already tracked elsewhere
- `wontfix` when intentionally not planned

Contributors should use issue forms and provide minimal reproductions when possible.

## Pull Request Policy

- At least one maintainer review is required before merge.
- PRs should pass repository quality checks (`lint`, `types:check`, `build`).
- UI changes should include visual evidence.
- User-facing package changes should include changelog context.

## Commit and Changelog Policy

- Conventional Commit style is strongly recommended.
- Changelog automation reads commit messages from `main`.
- The release workflow publishes on version tags (`v*.*.*`) and validates tag/package version alignment.

## Release Process

1. Prepare release changes and ensure package version is updated.
2. Merge to `main` with passing checks.
3. Create and push a version tag (example: `v0.3.4`).
4. GitHub Actions handles build, npm publish, and release/changelog promotion.

## Security and Conduct

- Security reports must go through private channels in `SECURITY.md`.
- Community behavior is governed by `CODE_OF_CONDUCT.md`.

# Open-Source Contribution Structure Design

Date: 2026-03-11
Status: Approved
Scope: Step 1 (minimal contributor pack)

## Objective

Prepare the repository for external contributions with a standard, low-friction baseline that improves issue and pull request quality without changing build or release behavior.

## Context

- Repository is a Node.js monorepo with a Next.js docs app and a publishable design system package.
- Existing automation includes changelog/release and Laravel split/sync workflows.
- Current gap: contributor-facing onboarding and contribution process files are missing.

## Options Considered

### Option 1: Stepwise Minimal (recommended)

- Add only core contributor entry points first.
- Files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue templates, PR template.
- Pros: fastest onboarding, smallest review surface, minimal risk.
- Cons: security/governance docs come in later steps.

### Option 2: Front-load Standards

- Add minimal + security/support docs in one pass.
- Pros: more complete baseline from day one.
- Cons: larger PR and policy surface.

### Option 3: Big-bang OSS Pack

- Add minimal + standards + governance + workflow changes at once.
- Pros: complete immediately.
- Cons: highest review complexity and change risk.

Decision: Option 1.

## Step 1 Design

### Files to Add

1. `CONTRIBUTING.md`
2. `CODE_OF_CONDUCT.md`
3. `.github/ISSUE_TEMPLATE/bug_report.yml`
4. `.github/ISSUE_TEMPLATE/feature_request.yml`
5. `.github/ISSUE_TEMPLATE/config.yml`
6. `.github/pull_request_template.md`

### Content Decisions

- `CONTRIBUTING.md`
  - Prerequisites and setup commands.
  - Local development paths for docs app and design system package.
  - Pre-PR validation commands.
  - Commit message guidance (advisory, not enforced).
  - PR expectations (context, linked issue, screenshots when UI changes, testing notes).
  - Monorepo notes, including Laravel/template workflow awareness.
- `CODE_OF_CONDUCT.md`
  - Contributor Covenant v2.1.
  - Enforcement contact placeholder using maintainer GitHub contact.
- Issue templates
  - Bug report form with reproduction and environment details.
  - Feature request form focused on problem/solution/alternatives.
  - Template config that disables blank issues and links users to documentation/help routes.
- PR template
  - Short, advisory checklist aligned to repository workflows.
  - Includes testing and changelog relevance prompts.

### Policy Defaults

- Tone: clear and welcoming.
- Strictness: documentation guidance only; no new CI gate changes in Step 1.
- Blank issues: disabled.
- Contact links: repository docs and maintainers/contact path.

## Architecture / Flow

- Contributor entry flow:
  1. Open repo and read `README.md`.
  2. Follow `CONTRIBUTING.md` for setup and local checks.
  3. Open structured issue forms for bugs/features.
  4. Submit PR using template checklist.
- Maintainer flow:
  1. Review structured reports/PR metadata.
  2. Validate with existing CI and release/changelog automation.

## Error Handling and Edge Cases

- Unknown issue type: route to docs/support via issue template config links.
- Incomplete reports: structured form fields collect minimum required context.
- UI changes without evidence: PR template prompts for screenshots or justification.

## Testing and Validation Plan

For Step 1 implementation:

1. Confirm all new files exist in expected locations.
2. Validate YAML template syntax and frontmatter keys.
3. Verify references/commands in `CONTRIBUTING.md` match repository scripts.
4. Confirm `git status` shows only intended additions.

## Out of Scope (Step 1)

- `SECURITY.md`, governance docs, maintainer guides.
- CI policy changes or required status checks.
- Label taxonomy or issue triage automation.

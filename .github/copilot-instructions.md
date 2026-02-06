# Copilot Instructions for unified-ui
This project is a high-performance documentation portal built with Next.js 16 (React 19) and Fumadocs.
## Architecture & Tech Stack
- **Framework**: Next.js App Router (16.1.1).
- **Documentation**: [Fumadocs](https://fumadocs.dev/) (headless core + UI components).
- **Styling**: Tailwind CSS with `tailwind-merge` (`cn` utility in `src/lib/cn.ts`).
- **Icons**: Lucide React.
- **Formating/Linting**: Biome. Avoid adding Prettier or ESLint.
## Core Conventions
- **Component Patterns**:
  - Shared layout logic resides in `src/components/layout/`.
  - UI primitives are in `src/components/ui/` (Radix UI based).
  - Custom MDX components are registered in `src/mdx-components.tsx`.
- **Data Fetching**: Use the `source` loader from `src/lib/source.ts` to access MDX content.
  - Example: `const page = source.getPage(params.slug);`
- **Tailwind Classes**: Always use the `cn()` utility for merging classes.
- **Type Safety**: Use the generated types for MDX content. If you modify MDX structure, run `npm run types:check`.
## Critical Workflows
- **MDX Management**:
  - Content is located in `content/docs/`.
  - Schema configuration is in `source.config.ts`.
  - Run `npm run types:check` to synchronize MDX collections and generate Next.js search manifests.
- **Code Quality**:
  - Run `npm run lint` (`biome check`) to verify code style.
  - Run `npm run format` (`biome format --write`) to fix formatting issues.
## Integration Points
- **Search**: Implemented in `src/app/api/search/route.ts` using Orama via Fumadocs.
- **Layouts**:
  - `src/app/docs/layout.tsx`: Uses `DocsLayout` from Fumadocs.
  - `src/components/layout/notebook/`: Contains a custom "notebook" style layout.
- **AI Context**: Special routes for LLM consumption:
  - `src/app/llms-full.txt/route.ts`: Aggregates all documentation into one text file.
  - `src/app/llms.mdx/docs/[[...slug]]/route.ts`: Provides a clean markdown version of a specific page for LLMs.
- **Open Graph**: Dynamic OG images are handled in `src/app/og/docs/[...slug]/route.tsx`.
## Design & Layout Principles
Optimize for visual density, clarity, and consistency. Avoid oversized marketing-style layouts.
### Layout & Spacing
- **Constraints**: Always use `max-w-7xl` (1280px) and `mx-auto` for content containers.
- **Padding**: Mobile `px-4`, Tablet `px-6`, Desktop `px-8`.
- **Vertical spacing**: Default `py-10`, Hero max `py-14`. Stack with `space-y-3/4/6`.
- **Grids**: Desktop max `grid-cols-3` (4 for small icons). Tablet `grid-cols-2`. Mobile `grid-cols-1`.
- **Ideal Card Width**: 280px - 360px. Avoid edge-to-edge cards.
### Typography & Visuals
- **Text**: Base `text-sm` or `text-base` only. Headings: H1 (`text-3xl`), H2 (`text-2xl`), H3 (`text-lg`).
- **Line Height**: `leading-5` or `leading-6`. Avoid loose line heights.
- **Style**: Prefer borders (`border-border`) over shadows. Use `rounded-md` (Dialogs/Sheets `rounded-lg`).
- **Utilities to Avoid**: `py-24+`, `space-y-10+`, `gap-12+`, `text-5xl+`, `leading-loose`.
### Component Defaults (Shadcn UI)
- **Controls**: Match height for Buttons, Inputs, and Selects (`h-9` or `h-10`).
- **Cards**: Default `p-4` or `p-6`. Avoid combining `p-6` with `space-y-6`.
- **Preference**: If a design choice is unclear, choose the more compact option.
## Key Files
- `src/lib/source.ts`: Main entry point for content loading.
- `source.config.ts`: Defines MDX collections and schemas.
- `src/mdx-components.tsx`: MDX component mappings.
- `src/app/docs/[[...slug]]/page.tsx`: Main page component for documentation.

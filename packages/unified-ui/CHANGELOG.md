# Changelog

All notable changes to the **Unified UI** design system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

### 🏗️ Miscellaneous

- **tsconfig:** Format and update paths in tsconfig.json ([b4cd53c](https://github.com/imrj05/unified-ui/commit/b4cd53c8963081fdd315a3b5955f9a14edbb1f3b))
- **changelog:** Auto-update unreleased entries [skip ci] ([da78e1a](https://github.com/imrj05/unified-ui/commit/da78e1a8c7102af9289518def430a70c6da16ffc))
## [0.3.1] — 2026-03-07

### 🏗️ Miscellaneous

- Update version to 0.3.1 in package.json ([5dc589d](https://github.com/imrj05/unified-ui/commit/5dc589dac389f1f9714513574d58d6b30c1948a0))
- **changelog:** Auto-update unreleased entries [skip ci] ([de99bae](https://github.com/imrj05/unified-ui/commit/de99baed40b7fdbe6e130b8436acd455b92ba3b3))
- Update version to 0.3.0 in package.json ([0da22c2](https://github.com/imrj05/unified-ui/commit/0da22c2c96ce3303fd619df4a2daed3b50eb5a76))
- **changelog:** Auto-update unreleased entries [skip ci] ([bc71407](https://github.com/imrj05/unified-ui/commit/bc71407c37fad8ceaba9552f588ed3a5d464c630))
## [0.3.0] — 2026-03-07

### 🚀 Features

- Add initial UI components for Laravel, Next.js, React, and Vue.js starters
- Implemented input and text components in Laravel Blade.
  - Created layout and welcome views for Laravel Blade starter.
  - Added Vite configuration for Laravel Blade.
  - Established global styles for Next.js and Vue.js starters.
  - Developed layout and page components for Next.js starter.
  - Introduced main application structure for Vite React starter.
  - Built UI components including buttons, badges, cards, alerts, and text in Vue.js.
  - Integrated theme toggle functionality across Vue.js components.
  - Added utility functions for class name merging. ([4e217c9](https://github.com/imrj05/unified-ui/commit/4e217c90730757929335804f5bab456e4e2a18ab))
- Add postpublish script for automatic tagging and changelog regeneration ([f07fbd7](https://github.com/imrj05/unified-ui/commit/f07fbd7e8ad0583d891a623c89db1ef952d90b8e))
- Add Separator component with customizable styles and accessibility features ([a8320ae](https://github.com/imrj05/unified-ui/commit/a8320aea8c105b954b28e5c7d0ab73f22dfea085))
- Add loading skeleton for themes page and enhance sidebar functionality
- Implemented a loading skeleton component for the themes page to improve user experience during data fetching.
  - Refactored sidebar components to enhance readability and maintainability, including updates to context management and hover behavior.
  - Updated toast preview component with new variant definitions and improved UI for toast actions.
  - Enhanced MDX components registration to include new previews and maintain consistency across the application. ([8365d81](https://github.com/imrj05/unified-ui/commit/8365d812ea7afcab2917043935669e7bc07f9e07))
- Add overlays preview component with dialogs, dropdowns, and popovers; implement table preview with sample data and actions ([ea1cd70](https://github.com/imrj05/unified-ui/commit/ea1cd70f5f0456760ba15aebde3702f18e580191))
- Update layouts and navigation components for improved UI and new themes
- Enhanced the Layout components across various sections (company, docs, legal, resources) to include a transparent navigation mode.
  - Introduced a new Themes page with a placeholder and updated layout.
  - Updated the layout configuration to include new links for Blocks, Colors, and Themes, along with a Discord icon.
  - Refactored the Logo component for better styling and consistency.
  - Improved the Nav component with new icons and a more dynamic navigation experience.
  - Updated the ThemeToggle component for better accessibility and visual feedback. ([d9fe590](https://github.com/imrj05/unified-ui/commit/d9fe590b84dbdfaac8473bef324fef756176ad4f))
- Add TestDropdownPage component with various dropdown menu tests
- Implemented a new TestDropdownPage component to showcase different dropdown menu functionalities including basic options, keyboard shortcuts, submenus, and standalone shortcut rendering.
  - Added a new AvatarCircle helper component for displaying user initials in a circular format.
  - Enhanced the virtual list demos by integrating AvatarCircle for user representation and improving layout consistency.
  - Introduced PreviewCard and PreviewCardShell components for rendering preview and code sections with copy functionality.
  - Updated MDX components to include the new PreviewCard for better documentation presentation. ([1fdf52e](https://github.com/imrj05/unified-ui/commit/1fdf52ea093572be29403e4ab13f6a0c72e1abf8))
- Update Open Graph metadata and enhance OG image content for better SEO ([6e5728d](https://github.com/imrj05/unified-ui/commit/6e5728d6226ea9b11eed5214df30970cc71eb138))
- Feat: add AppleIcon and Icon components with responsive design and SVG graphics
feat: implement OGImage component for enhanced Open Graph support
refactor: update layout component for improved readability and structure
fix: correct site name in route handler for Open Graph image generation ([f92e1fe](https://github.com/imrj05/unified-ui/commit/f92e1fee67ac7753dbbabc39b20ce06168183fae))

### 🐛 Bug Fixes

- Update exports in unified-ui dist file to include new components and variants ([44145eb](https://github.com/imrj05/unified-ui/commit/44145ebee0f7081beb1b9ada91e0205fced098e5))
- Enhance changelog script to scan all commits if no tags are found ([fdbb105](https://github.com/imrj05/unified-ui/commit/fdbb105c47e4afa1f999b0eddfe884a903b76466))
- Update component links from /docs/components to /components ([d511280](https://github.com/imrj05/unified-ui/commit/d511280063616413efb9235d81d21eabf467b2ca))

### 🔧 Refactors

- **changelog-renderer:** Enhance changelog parsing and rendering logic
- Improved parsing logic to handle multi-line items and indented sub-items.
  - Added support for section titles with emojis by stripping them before processing.
  - Enhanced section color mapping to include additional categories and keywords.
  - Refactored the rendering of changelog items and sections for better readability and maintainability.
  - Updated the stats calculation to normalize section titles for accurate feature and fix counts. ([f3b47fe](https://github.com/imrj05/unified-ui/commit/f3b47fe55a9c7637570e833b6256b2adb969dbcc))

### 🏗️ Miscellaneous

- **changelog:** Auto-update unreleased entries [skip ci] ([993c692](https://github.com/imrj05/unified-ui/commit/993c6923cc7df910cce064d95cbf399e880dbf0c))
- **changelog:** Auto-update unreleased entries [skip ci] ([4dc43b0](https://github.com/imrj05/unified-ui/commit/4dc43b053de38b769c2c407bb4de375e2d1bb110))
- **changelog:** Auto-update unreleased entries [skip ci] ([bf93189](https://github.com/imrj05/unified-ui/commit/bf931896586457223f5e2a60cbbae2955ecb202d))
- **changelog:** Auto-update unreleased entries [skip ci] ([2c133db](https://github.com/imrj05/unified-ui/commit/2c133dbc6225bde8a5e95320b6e3c857afa7038c))
- Update package version to 0.2.4 and correct homepage URL ([e055e60](https://github.com/imrj05/unified-ui/commit/e055e6044a0870dde83a4788158f0fe24ae15544))
- **changelog:** Auto-update unreleased entries [skip ci] ([29ba39b](https://github.com/imrj05/unified-ui/commit/29ba39bfb6657de25e35aec17a2318a8c309a029))
- **changelog:** Auto-update unreleased entries [skip ci] ([ea0ff88](https://github.com/imrj05/unified-ui/commit/ea0ff88e24c5bfa919db43f313b679b4c69dad1a))
- **changelog:** Auto-update unreleased entries [skip ci] ([e5002e4](https://github.com/imrj05/unified-ui/commit/e5002e412e06361d1f6e71ace066f354b38ee631))
- **changelog:** Auto-update unreleased entries [skip ci] ([6bcfc25](https://github.com/imrj05/unified-ui/commit/6bcfc259c33d596ac0324831df95cc29e60f303f))
- **changelog:** Auto-update unreleased entries [skip ci] ([1971cd8](https://github.com/imrj05/unified-ui/commit/1971cd81a04d7b6e92e0ed925a3f33783254bf2c))
- **changelog:** Auto-update unreleased entries [skip ci] ([c226782](https://github.com/imrj05/unified-ui/commit/c2267822c0705401a6de57a60dbe3227abb76533))
- **changelog:** Auto-update unreleased entries [skip ci] ([f216b6e](https://github.com/imrj05/unified-ui/commit/f216b6ebb6d436148256b784898833cea8613a14))
- **changelog:** Auto-update unreleased entries [skip ci] ([6658a0a](https://github.com/imrj05/unified-ui/commit/6658a0a50017a21e4fe868d86381ea0b9a76601e))
- **changelog:** Auto-update unreleased entries [skip ci] ([8dc0ab8](https://github.com/imrj05/unified-ui/commit/8dc0ab8f9ed198e4b0da315a91869ca374626fd5))
- Stop tracking CHANGELOG.md locally ([4973cf5](https://github.com/imrj05/unified-ui/commit/4973cf5a401970d23922e39e7590187a40497307))

### Other

- Merge branch 'main' of github.com:imrj05/unified-ui ([b302e8c](https://github.com/imrj05/unified-ui/commit/b302e8c88b687281ddb5e226d78787a98990b794))
- Merge pull request #1 from imrj05/vercel/vercel-web-analytics-to-nextjs-g6zfpb

Add Vercel Web Analytics to Next.js ([#1](https://github.com/imrj05/unified-ui/issues/1)) ([ce8670a](https://github.com/imrj05/unified-ui/commit/ce8670a5682780d1f6ef58eb880ef5a414edcb68))
- Add Vercel Web Analytics to Next.js

Implemented Vercel Web Analytics for Next.js

## Summary
Successfully installed and configured Vercel Web Analytics for this Next.js App Router project.

## Changes Made

### 1. Package Installation
- Installed `@vercel/analytics` package using npm
- Updated `package.json` to include the new dependency
- Updated `package-lock.json` with the new dependency tree

### 2. Analytics Integration
Modified: `src/app/layout.tsx`
- Imported `Analytics` component from '@vercel/analytics/next'
- Added `<Analytics />` component inside the `<body>` tag
- Placed after the `<RootProvider>` closing tag to ensure proper initialization
- Organized imports using the project's Biome linter configuration
- Applied consistent formatting with the project's code style

## Implementation Details
This is an App Router Next.js project, so the Analytics component was added to the root layout file (`src/app/layout.tsx`) as per Vercel's best practices. The component is placed at the end of the body tag to ensure it doesn't block the rendering of the main application content.

## Verification
- ✅ Build completed successfully with no errors
- ✅ Linter checks passed for the modified file
- ✅ Code formatting applied using Biome
- ✅ All existing functionality preserved
- ✅ Lock files properly updated

## Notes
The Analytics component will automatically track page views and web vitals when deployed to Vercel. No additional configuration is required for basic analytics tracking.

Co-authored-by: Vercel <vercel[bot]@users.noreply.github.com> ([4d967d5](https://github.com/imrj05/unified-ui/commit/4d967d5473f62f8a9fa6a4f3bf1f3cb54de0616e))
- Merge branch 'main' of github.com:imrj05/unified-ui ([1e620eb](https://github.com/imrj05/unified-ui/commit/1e620ebb87a8f04079f9f266e769e3ba9e327293))
- Merge branch 'main' of github.com:imrj05/unified-ui ([d85b413](https://github.com/imrj05/unified-ui/commit/d85b413531b6e38eabf397f6347b6cbb740dd961))
- Merge branch 'main' of github.com:imrj05/unified-ui ([055de42](https://github.com/imrj05/unified-ui/commit/055de4202aa7a813902e5beeeddfd0ae904c29f0))
- Add CHANGELOG for packages/unified-ui ([06dc82a](https://github.com/imrj05/unified-ui/commit/06dc82a36328e9a289adea9eaade36abd0f49bdf))
- Add changelog generator and update workflow

Add .github/scripts/generate-changelog.sh and call it from the
changelog workflow. Also add .zed/settings.json with editor/assistant
settings. ([bbd4f82](https://github.com/imrj05/unified-ui/commit/bbd4f827837dd91acbf5be5005ca3c4cc50c38aa))
- Ignore CI changelog and set workflow shell to bash ([ac4da0a](https://github.com/imrj05/unified-ui/commit/ac4da0a4851cfd75930bc8208df04fc395963bfc))
- Merge branch 'main' of github.com:imrj05/unified-ui ([1ae2200](https://github.com/imrj05/unified-ui/commit/1ae2200684ee757e24fa6ba7f7a342c76dc4d959))
- Automate changelog and release workflow

Add a custom changelog workflow that parses Conventional Commits and
prepends entries into packages/unified-ui/CHANGELOG.md without
overwriting
hand-written release notes. Overhaul the release pipeline to validate
tag
versions, build and publish the design system, promote [Unreleased] → a
versioned changelog entry, and create the GitHub Release with notes.
Update cliff.toml comments to reflect its role for GitHub release notes. ([a1167e7](https://github.com/imrj05/unified-ui/commit/a1167e7bef2fb78093408738c450a8d2da70f3af))
## [0.2.1] — 2026-03-06

### 🐛 Bug Fixes

- Update placeholder API key in ConfirmDialog documentation ([6ca53c5](https://github.com/imrj05/unified-ui/commit/6ca53c5d1cecaee31afb376b860908981d9bf04c))

### 🔧 Refactors

- Clean up formatting and remove unnecessary whitespace in ConfirmDialog documentation ([a8c382f](https://github.com/imrj05/unified-ui/commit/a8c382fbdcf0038b9e85160e472e45ac98da7579))

### Other

- Add automated changelog and release workflows

Include git-cliff config and CI workflows for changelog generation
and releases

- Add cliff.toml and .github/workflows/changelog.yml to auto-generate
  packages/unified-ui/CHANGELOG.md from Conventional Commits on pushes
  to main
- Add .github/workflows/release.yml to validate tag, build the design
  system, publish to npm, and create a GitHub Release with changelog
  notes
- Add server-side changelog page and renderer under src to surface the
  generated CHANGELOG.md in the docs site
- Commit generated CHANGELOG.md and bump @work-rjkashyap/unified-ui to
  0.2.1 ([8e036bd](https://github.com/imrj05/unified-ui/commit/8e036bdf7e9004f43a28f01a8a220a49f4afd8fd))
- Use unified-ui-rajeshwar registry

Add a build:registry step to the root build script; update CLI and
registry build scripts to use the new registry homepage and tweak
imports/formatting. Bump typography and spacing across home components
for improved readability. ([c55b091](https://github.com/imrj05/unified-ui/commit/c55b091dfb5843ad1a89230740cf5646f918f897))
- Format Confirm Dialog MDX and fix examples

Adjust whitespace and indentation in
content/components/confirm-dialog.mdx.
Separate the AlertDialog primitives example from the barrel import and
clean
up code fences for usage, variants, and preview snippets. ([50a0c83](https://github.com/imrj05/unified-ui/commit/50a0c830ac27441b9fdcd6bb415f2bf8d7f6e260))
## [0.2.0] — 2026-03-05

### 🚀 Features

- Enhance component previews and theme customizer
- Added VSCodeCodeBlock for improved code display in ComponentPage.
  - Introduced CustomizerPanel for theme customization options including color, radius, font, shadow, and surface styles.
  - Updated input-previews to streamline imports.
  - Renamed Tag components to Badge for consistency and clarity in tag previews.
  - Implemented ThemeToggle previews for various configurations and sizes.
  - Enhanced ThemeCustomizerTrigger with mode selection for light, dark, and system themes.
  - Updated MDX components to include new previews and components for better documentation. ([7148072](https://github.com/imrj05/unified-ui/commit/7148072478ceb2857e40c70251380c4be244ede1))
- Add Toggle component and related previews
- Implemented Toggle component using Radix UI's Toggle primitive with support for multiple visual variants, sizes, and icons.
  - Added Toggle to the unified-ui index for export.
  - Created navigation component previews for ContextMenu, Menubar, Steps, and Command, showcasing various states and interactions.
  - Updated MDX components to include new previews for documentation. ([63b0f57](https://github.com/imrj05/unified-ui/commit/63b0f57dcc8150f5648b7541b8d93d70f42ebd45))

### 🔧 Refactors

- Clean up component code formatting and structure in navigation menu, popover, and scroll area ([c0935d9](https://github.com/imrj05/unified-ui/commit/c0935d92ca5324338f590d25a2406ca85e0921f3))
## [0.1.2] — 2026-03-02

### 🚀 Features

- Integrate theme customizer and improve UI components
- Added ThemeCustomizerProvider and ThemeCustomizerTrigger to layout for theme customization.
  - Updated button styles to enhance focus visibility and hover effects.
  - Refactored collapsible component to improve readability and maintainability.
  - Updated navigation menu and popover components to use new radix-ui imports.
  - Enhanced data table demo with consistent text color updates.
  - Improved scroll area component for better overflow handling.
  - Updated TypeScript configuration to include new unified-ui paths for better module resolution. ([69bb594](https://github.com/imrj05/unified-ui/commit/69bb5940835fb0d45f29d21e4bf4bb44f67c66e1))

### 🏗️ Miscellaneous

- Bump version to 0.1.2 and update changelog ([b09bbbf](https://github.com/imrj05/unified-ui/commit/b09bbbf4de830fad0211f8491e622436dc0ce783))

### Other

- Regenerate package-lock

Bump @biomejs/biome to 2.4.4 and shikijs packages to 3.23.0.
Consolidate duplicated @radix-ui/react-slot entries into one resolved
entry. Lockfile churn from dependency updates only. ([2d0f0ed](https://github.com/imrj05/unified-ui/commit/2d0f0ed95660e49b64c5135e27e732747541b2b1))
- Revise README with expanded overview and docs ([f67f910](https://github.com/imrj05/unified-ui/commit/f67f910d6542877e57f6ad54b62d10538021b5f8))
## [0.1.1] — 2026-02-28

### Other

- Add DataTable, docs overhaul, and bump version

Implement a full DataTable component (TanStack Table) and export
hooks/types.
Bump UNIFIED_UI_VERSION to 0.1.1 and update package metadata (homepage,
bugs,
funding). Revamp many MDX component pages to use interactive
ComponentPage
previews and update icons/imports. Add ToastPreview demo component and
adjust
site links/README/CHANGELOG accordingly. ([8fb7338](https://github.com/imrj05/unified-ui/commit/8fb7338ca305daac24a6b595bf1ea30022d1e250))
- Add DataTable component and docs

Introduce DataTable powered by TanStack Table with sorting,
filtering, pagination, row selection, column visibility and a
useDataTable hook. Add a DataTableDemo component and a full MDX
documentation page. Also add a global hide-scrollbar CSS utility
and miscellaneous layout/formatting updates to notebook/sidebar
components. ([f10f8f0](https://github.com/imrj05/unified-ui/commit/f10f8f0fbc04321d545a0b1abe2e538a861b140b))
- Add @work-rjkashyap/unified-ui dependency

Move framer-motion to optionalDependencies and reorder devDependencies.
Format typesVersions arrays and update package-lock.json accordingly ([a3dec68](https://github.com/imrj05/unified-ui/commit/a3dec6872110b6db3de18ccb3152e8a3b4a3fd85))
## [0.1.0] — 2026-02-27

### 🚀 Features

- Publish @work-rjkashyap/unified-ui@0.1.0 to npm
Rename package scope from @unified-ui/react to
  @work-rjkashyap/unified-ui
  to match npm organization ownership.

  Updated references across 39 files:
  - packages/unified-ui/package.json (package name)
  - Root package.json (workspace scripts + dependency)
  - src/app/global.css (CSS import)
  - All 22 component MDX docs (imports + code examples)
  - 8 design system MDX docs (tokens, colors, motion, etc.)
  - README.md, TODO.md, copilot-instructions.md ([4872c9a](https://github.com/imrj05/unified-ui/commit/4872c9a6b68b99eee42c8f3e2795b3c46ad22ade))
- Enhance layout components and navigation
- Refactored HomeLayout to improve structure and readability.
  - Updated Nav component to include type safety for link items and improved rendering logic.
  - Enhanced DocsLayout and DocsSidebar for better sidebar management and navigation.
  - Added new legal, company, and resource sources in the source loader for better content organization.
  - Improved styling and responsiveness in various layout components. ([c6f5803](https://github.com/imrj05/unified-ui/commit/c6f58032da8c7e07b3b1d3877ccc93b076875ad6))
- Add new components including Collapsible, Popover, Scroll Area, and Navigation Menu; update existing components with icons ([8907f41](https://github.com/imrj05/unified-ui/commit/8907f410b1d4abd94ff3613e32bf082b0c24a2c3))
- Enhance HomePage layout and HeroSection design, improve sidebar component structure ([e894c85](https://github.com/imrj05/unified-ui/commit/e894c85dbb9b18bb41fe1020602df20912d983d6))
- Update layout components with new Logo and navigation structure, enhance HeroSection design ([6a5bb28](https://github.com/imrj05/unified-ui/commit/6a5bb28aaea526e8b643b3fc805e54180bc31d4f))
- Add showcase and testimonials sections, enhance layout components
- Introduced `ShowcaseSection` component showcasing key features with interactive elements.
  - Added `TestimonialsSection` component to display user feedback and experiences.
  - Created `ComponentPage` layout for displaying component details, including preview and code tabs.
  - Implemented `Logo` component for branding in the layout.
  - Developed `Nav` component for navigation with links to documentation and components.
  - Added `NavbarLinkItem` and `Navbar` components for structured navigation.
  - Created `DocsSidebar` for sidebar navigation with page tree and tabs.
  - Defined `SIDEBAR_TABS` for easy management of sidebar navigation items. ([88212b5](https://github.com/imrj05/unified-ui/commit/88212b5b150e0c41d5f87a87ffc4de1619fd7e84))
- Add sidebar link item and page tree components
- Implemented `createLinkItemRenderer` for rendering sidebar items based on the page tree structure.
  - Added `createPageTreeRenderer` to manage the rendering of page tree items, including folders and separators.
  - Introduced a dropdown component for sidebar tabs with enhanced accessibility and styling.
  - Created utility functions for managing sidebar tabs and their properties.
  - Added theme toggle functionality with improved user experience.
  - Developed a table of contents (TOC) component with dynamic resizing and rendering based on headings.
  - Enhanced UI components including buttons, collapsibles, navigation menus, and popovers for better usability and aesthetics.
  - Introduced utility functions for merging refs and normalizing URLs. ([1b5c1da](https://github.com/imrj05/unified-ui/commit/1b5c1dad14d4720dc37cf3f388ea30d7afc5efae))

### 🔧 Refactors

- Streamline HomeLayout component structure and improve readability ([4b3321d](https://github.com/imrj05/unified-ui/commit/4b3321de6a308a3a93938ed4af0e6d07f0bf17c9))
- Improve layout components and sidebar functionality
- Refactored LayoutContext and LayoutContextProvider for better readability and performance.
  - Updated LayoutHeader and LayoutBody components to enhance styling and structure.
  - Adjusted sidebar components to improve usability and visual consistency.
  - Enhanced ThemeToggle component to support button type and improved accessibility.
  - Added a new StatusPage component to display system status and incident history.
  - Updated Popover and ScrollArea components for better z-index management and scroll behavior. ([1ae241f](https://github.com/imrj05/unified-ui/commit/1ae241f315563fd789bc176bdb0c45226ee1160a))
- Improve code formatting and readability across layout components ([08653fd](https://github.com/imrj05/unified-ui/commit/08653fdb7bccc8201ea9c826c663d0b2298a85a4))
- Format code for improved readability in HomeLayout component ([830877e](https://github.com/imrj05/unified-ui/commit/830877e2120c14ae964ca79186e99992fd4b9a9b))

### Other

- Initial commit from Create Fumadocs App ([8fd3237](https://github.com/imrj05/unified-ui/commit/8fd3237b58fb87870e9db4b5aac9ec98060d2362))

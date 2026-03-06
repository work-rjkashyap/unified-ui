# Changelog
All notable changes to the **Unified UI** design system will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased]
## [0.2.2] — 2026-03-07
### 🚀 Features
- Update Open Graph metadata and enhance OG image content for better SEO ([6e5728d](https://github.com/imrj05/unified-ui/commit/6e5728d6226ea9b11eed5214df30970cc71eb138))
- Feat: add AppleIcon and Icon components with responsive design and SVG graphics
feat: implement OGImage component for enhanced Open Graph support
refactor: update layout component for improved readability and structure
fix: correct site name in route handler for Open Graph image generation ([f92e1fe](https://github.com/imrj05/unified-ui/commit/f92e1fee67ac7753dbbabc39b20ce06168183fae))
### 🐛 Bug Fixes
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
- **changelog:** Auto-update unreleased entries [skip ci] ([f216b6e](https://github.com/imrj05/unified-ui/commit/f216b6ebb6d436148256b784898833cea8613a14))
- **changelog:** Auto-update unreleased entries [skip ci] ([6658a0a](https://github.com/imrj05/unified-ui/commit/6658a0a50017a21e4fe868d86381ea0b9a76601e))
- **changelog:** Auto-update unreleased entries [skip ci] ([8dc0ab8](https://github.com/imrj05/unified-ui/commit/8dc0ab8f9ed198e4b0da315a91869ca374626fd5))
- Stop tracking CHANGELOG.md locally ([4973cf5](https://github.com/imrj05/unified-ui/commit/4973cf5a401970d23922e39e7590187a40497307))
### Other
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

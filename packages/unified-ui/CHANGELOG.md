# Changelog

All notable changes to the **Unified UI** design system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- Integrate theme customizer and improve UI components
- Added ThemeCustomizerProvider and ThemeCustomizerTrigger to layout for theme customization.
  - Updated button styles to enhance focus visibility and hover effects.
  - Refactored collapsible component to improve readability and maintainability.
  - Updated navigation menu and popover components to use new radix-ui imports.
  - Enhanced data table demo with consistent text color updates.
  - Improved scroll area component for better overflow handling.
  - Updated TypeScript configuration to include new unified-ui paths for better module resolution. ([69bb594](https://github.com/imrj05/unified-ui/commit/69bb5940835fb0d45f29d21e4bf4bb44f67c66e1))
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

### 🐛 Bug Fixes

- Update placeholder API key in ConfirmDialog documentation ([6ca53c5](https://github.com/imrj05/unified-ui/commit/6ca53c5d1cecaee31afb376b860908981d9bf04c))

### 🔧 Refactors

- Clean up formatting and remove unnecessary whitespace in ConfirmDialog documentation ([a8c382f](https://github.com/imrj05/unified-ui/commit/a8c382fbdcf0038b9e85160e472e45ac98da7579))
- Clean up component code formatting and structure in navigation menu, popover, and scroll area ([c0935d9](https://github.com/imrj05/unified-ui/commit/c0935d92ca5324338f590d25a2406ca85e0921f3))
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

### 🏗️ Miscellaneous

- Bump version to 0.1.2 and update changelog ([b09bbbf](https://github.com/imrj05/unified-ui/commit/b09bbbf4de830fad0211f8491e622436dc0ce783))


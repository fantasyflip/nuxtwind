# Copilot Instructions — NuxtWind

## Project overview

NuxtWind (`@nuxtwind/components`) is a Nuxt 4 module that provides 16 Vue/TailwindCSS v4 components with SSR support. The module auto-registers components, manages CSS generation, and supports deep configuration merging from a user-level `nuxtwind.config.ts`.

## Commands

| Task | Command |
|---|---|
| Dev (playground) | `pnpm dev:play` |
| Build module | `pnpm prepack` |
| Lint | `pnpm lint` / `pnpm lint:fix` |
| Test | `pnpm test` |
| Test (watch) | `pnpm test:watch` |
| Prepare | `pnpm dev:prepare` |
| Release | `pnpm release` |

Package manager: **pnpm** (monorepo with root, `docs/`, `playground/` workspaces).

## Architecture

```
src/
├── module.ts                    # Nuxt module entry — config loading, CSS setup, component registration
├── utils/
│   ├── config-loader.ts         # Discovers and imports nuxtwind.config.ts
│   ├── css-manager.ts           # Auto-creates/validates assets/css/main.css
│   └── nxwLog.ts                # Debug logger
└── runtime/
    ├── components/              # 16 Vue SFC components (NXW- prefix)
    ├── composables/
    │   └── useComponentConfig.ts # Three-layer merge: defaults → user config → props
    ├── defaults/                # Per-component default configs (one file each)
    ├── types/
    │   ├── props.ts             # Prop interfaces (all optional)
    │   ├── merged.ts            # Config interfaces (all required, fully resolved)
    │   └── config.ts            # NuxtWindConfig aggregate type
    ├── css-templates.ts         # CSS template strings + validation patterns
    └── global.css               # Tailwind @source directive for component scanning
```

### Module setup flow (`src/module.ts`)

1. Load user config via `ConfigLoader` from `nuxtwind.config.ts`
2. `CssManager` creates/validates `assets/css/main.css` (Tailwind imports, color scales, keyframes)
3. Register `@tailwindcss/vite` plugin
4. Install `@nuxtjs/color-mode` if absent
5. Auto-register all components with configurable prefix (default `NXW-`)

## Three-layer type system

Each component has three type layers:

| Layer | File | Purpose |
|---|---|---|
| **Props** (`ButtonProps`) | `types/props.ts` | All optional — user/component-level overrides |
| **Config** (`ButtonConfig`) | `types/merged.ts` | All required — fully resolved after merge |
| **NuxtWindConfig** | `types/config.ts` | Maps component name → Props type for `nuxtwind.config.ts` |

## Component conventions

- **Script setup** with `<script setup lang="ts">` and `withDefaults(defineProps<XProps>())`
- Props default to `undefined` so the composable merge logic kicks in
- Config accessed via computed: `const config = computed<ButtonConfig>(() => useComponentConfig('button', props))`
- `useComponentConfig` deep-merges: **defaults → runtime user config → component props**
- Boolean handling: `booleanOnlyProps` set per component controls whether `false` stays `false` or becomes `''`
- Single-word component names are allowed (eslint rule disabled)
- Components support dark mode via Tailwind dark classes

### Adding a new component

1. Create `src/runtime/components/MyComponent.vue`
2. Add prop interface `MyComponentProps` to `src/runtime/types/props.ts`
3. Add config interface `MyComponentConfig` to `src/runtime/types/merged.ts`
4. Add entry to `NuxtWindConfig` in `src/runtime/types/config.ts`
5. Create `src/runtime/defaults/mycomponent.ts` with defaults satisfying the Config type
6. Register in `useComponentConfig.ts`: add to `ComponentTypeMap`, `booleanOnlyProps`, and defaults import
7. Add playground page in `playground/app/pages/mycomponent.vue` to test

## Configuration merge (`useComponentConfig`)

Merge priority: **defaults < `nuxtwind.config.ts` < component props**

- `undefined` props are skipped (preserve lower layer)
- Boolean props checked against `booleanOnlyProps[componentName]`:
  - In set → keep boolean as-is
  - Not in set → `false` becomes `''`, `true` keeps default
- Nested objects are recursively merged

## CSS management

`CssManager` auto-generates `assets/css/main.css` containing:
- `@import "tailwindcss"`
- Primary/secondary color scales (`@theme static`)
- Indeterminate progress bar keyframes and utilities

`css-templates.ts` defines templates with regex validation patterns. Each section has a position hint (top/middle/bottom) for insertion order.

## Testing

Tests use **Vitest** + `@nuxt/test-utils/e2e`. Fixture app at `test/fixtures/basic/`. Tests do SSR rendering via `$fetch('/')` and assert on HTML output.

## Style guide

- ESLint: `@nuxt/eslint-config/flat` with `stylistic` and `tooling` features enabled
- Run `pnpm lint:fix` before committing
- TailwindCSS v4 (utility-first, `@theme` directives, no `tailwind.config.js`)

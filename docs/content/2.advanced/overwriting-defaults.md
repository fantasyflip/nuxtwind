---
title: Overwriting Defaults
description: Overwrite component default values on project level.
---

# Overwriting Defaults

NuxtWind provides a powerful configuration system that allows you to customize the default values of all components at the project level. This enables you to maintain consistent styling and behavior across your entire application without having to pass the same props to every component instance.

## Configuration File

Create a `nuxtwind.config.ts` file in your project root to define global component defaults:

```typescript
// nuxtwind.config.ts
import type { NuxtWindConfig } from '@nuxtwind/components'

export default {
  button: {
    color: {
      bg: 'bg-purple-600',
      text: 'text-white',
    },
  },
  badge: {
    color: {
      bg: 'bg-yellow-500',
    },
    bottom: true,
  },
  // ... other components
} satisfies NuxtWindConfig
```

## Supported File Extensions

The configuration file can use any of these extensions:
- `nuxtwind.config.ts` (recommended)
- `nuxtwind.config.js`
- `nuxtwind.config.mjs`

## Priority System

NuxtWind uses a three-tier priority system for configuration:

1. **Component Props** (highest priority)
2. **User Configuration** (medium priority)
3. **Built-in Defaults** (lowest priority)

This means:
- Built-in defaults provide the base configuration
- Your `nuxtwind.config.ts` overrides these defaults
- Individual component props override both defaults and user config

## Use Cases

### Design System Consistency

Establish consistent styling across your application:

```typescript
// nuxtwind.config.ts
export default {
  button: {
    color: {
      bg: 'bg-brand-primary',
      text: 'text-white',
      hover: 'hover:bg-brand-primary-dark',
    },
    rounded: 'rounded-lg',
    shadow: 'shadow-md',
  },
  textfield: {
    color: {
      border: 'border-brand-neutral',
      borderFocus: 'focus:border-brand-primary',
    },
  },
}
```

## Benefits

### Development Efficiency
- **Reduced Repetition**: Set common configurations once instead of on every component
- **Faster Prototyping**: Components work with your desired styling out of the box
- **Consistent Defaults**: Ensure all team members use the same base configurations

### Maintainability
- **Central Configuration**: Update styling across the entire app from one file
- **Version Control**: Track design system changes through configuration commits
- **Easy Refactoring**: Modify component behavior globally without touching individual components

### Flexibility
- **Granular Control**: Override any default property for any component
- **Per-Component Basis**: Each component can have different default configurations
- **Prop Override**: Individual components can still override global defaults when needed

## Working with TypeScript

For full TypeScript support, import the configuration type:

```typescript
// nuxtwind.config.ts
import type { NuxtWindConfig } from '@nuxtwind/components'

export default {
  // Your configuration with full type safety
} satisfies NuxtWindConfig
```

This provides:
- **Autocomplete**: IntelliSense for all available configuration options
- **Type Safety**: Catch configuration errors at build time
- **Documentation**: Hover hints for configuration properties

## Custom Configuration Path

You can specify a custom path for your configuration file in [`nuxt.config.ts`](nuxt.config.ts):

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtwind/components'],
  nuxtwind: {
    configPath: 'config/nuxtwind.config.ts', // Custom path
  },
})
```

The configuration system makes NuxtWind highly adaptable to your project's needs while maintaining the flexibility to override settings on a per-component basis when necessary.
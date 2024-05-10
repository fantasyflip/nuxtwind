# NuxtWind Component Library

NuxtWind is a component library for Nuxt.js 3, providing a collection of ready-to-use components built with Vue.js and TailwindCSS. These components are designed to be SSR-safe and are inspired by the sleek design principles of Vuetify.

## 📦 Installation

You can install NuxtWind via npm:

```bash
npm i @nuxtwind/components
```

Add the `@nuxtwind/components` module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
    modules: ['@nuxtwind/components']
})
```

## 📚 Documentation

For full documentation and usage instructions, please visit [NuxtWind Documentation](https://nuxtwind.com).

## ✨ Features

- **Ready-to-use Components**: A variety of components designed for rapid development.
- **SSR-Safe**: Ensures compatibility with server-side rendering in Nuxt.js applications.
- **Inspired by Vuetify**: Draws design inspiration from Vuetify's intuitive UI components.
- **Built with Vue.js and TailwindCSS**: Utilizes the power of Vue.js for interactivity and TailwindCSS for styling flexibility.

## 🚀 Getting Started

To start using NuxtWind components in your Nuxt.js project, simply install the package via your preferred package manager as shown above. Then you can start incorporating them into your templates.

```vue
// In your Nuxt.js component
<template>
  <div>
    <NXW-Button @click="handleClick">Click me!</NXW-Button>
  </div>
</template>

<script setup lang="ts">
function handleClick() {
  console.log('Button clicked!');
}
</script>
```

## 🤝 Contribution

Contributions to NuxtWind are welcome! If you'd like to contribute new features, bug fixes, or improvements, please fork the repository, make your changes, and submit a pull request. Be sure to follow the contribution guidelines outlined in the documentation.

## 📄 License

NuxtWind is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
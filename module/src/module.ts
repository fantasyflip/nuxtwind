import { defineNuxtModule, installModule, addComponentsDir, createResolver } from '@nuxt/kit'

//@ts-ignore
import { name, version } from "../package.json";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * @default 'NXW-'
   */
  prefix?: string

  /**
   * @default false
   */
  global?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "nuxtwind",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: 'NXW-',
    global: false
  },
  async setup(_options, _nuxt) {
    //@ts-ignore
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    _nuxt.options.build.transpile.push(runtimeDir);

    //components
    addComponentsDir({
      prefix: _options.prefix,
      path: resolver.resolve(runtimeDir, 'components'),
      global: _options.global
    })

    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      exposeConfig: true,
      config: {
        content: {
          files: [
            resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolver.resolve('./runtime/*.{mjs,js,ts}')
          ]
        }
      }
    })
  },
})

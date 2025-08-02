import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  createResolver,
  addVitePlugin,
  hasNuxtModule,
} from '@nuxt/kit'

import { nxwLog } from './utils/nxwLog'
import { name, version } from '../package.json'
import type { Nuxt } from 'nuxt/schema'
import { CssManager } from './utils/css-manager'
import { ConfigLoader } from './utils/config-loader'
import type { NuxtWindConfig } from './runtime/types/config'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Used to set the prefix for NuxtWind components
   * @default 'NXW-'
   */
  prefix?: string

  /**
   * Used to decide whether components should be registered globally or not
   * @default false
   */
  global?: boolean

  /**
   * Used display debug logs of the module in the console
   * @default false
   */
  debugLog?: boolean

  /**
   * Used to configure the color mode module
   */
  colorMode?: {
    /**
     * Class suffix for the color mode
     * @default ''
     */
    classSuffix?: string
  }

  /**
   * CSS configuration options
   */
  css?: {
    /**
     * Used to automatically create main.css file if it doesn't exist
     * @default true
     */
    autoCreate?: boolean

    /**
     * Validate existing CSS file and update if needed
     * @default true
     */
    autoUpdate?: boolean
  }

  /**
   * The path to the user configuration file
   * @default 'nuxtwind.config.ts'
   */
  configPath?: string
}

function manageCssFile(nuxt: Nuxt, options: ModuleOptions) {
  const cssManager = new CssManager(nuxt, {
    debugLog: options.debugLog,
  })

  // Validate existing file first if autoUpdate is enabled
  if (options.css?.autoUpdate !== false) {
    const success = cssManager.validateAndUpdateMainCssFile()
    if (!success) {
      nxwLog(options.debugLog, 'Failed to validate or update main.css file', 'error')
    }
  }

  // Create or update the CSS file
  if (options.css?.autoCreate !== false) {
    const success = cssManager.ensureMainCssFile()
    if (!success) {
      nxwLog(true, 'Failed to manage main.css file', 'error')
    }
  }
}

async function loadAndProvideUserConfig(nuxt: Nuxt, options: ModuleOptions): Promise<Partial<NuxtWindConfig> | null> {
  const configLoader = new ConfigLoader(nuxt, {
    debugLog: options.debugLog,
  })

  // Load user config from file
  return await configLoader.loadUserConfig(options.configPath)
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'nuxtwind',
    compatibility: {
      nuxt: '^4.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: 'NXW-',
    global: false,
    debugLog: false,
    css: {
      autoCreate: true,
      autoUpdate: true,
    },
    configPath: undefined,
  },
  async setup(_options, _nuxt) {
    nxwLog(_options.debugLog, 'Setting up NuxtWind Module')
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    _nuxt.options.build.transpile.push(runtimeDir)
    _nuxt.options.alias['#nuxtwind'] = runtimeDir

    // Load and provide user configuration
    const userConfig = await loadAndProvideUserConfig(_nuxt, _options)

    if (userConfig) {
      // log userConfig
      nxwLog(_options.debugLog, 'User configuration has been loaded:', 'info')
      nxwLog(_options.debugLog, JSON.stringify(userConfig, null, 2))
      _nuxt.options.runtimeConfig.public.nuxtwind = userConfig
    }
    else {
      nxwLog(_options.debugLog, 'No user configuration found, using default options', 'warn')
      _nuxt.options.runtimeConfig.public.nuxtwind = {}
    }

    // Manage CSS file
    manageCssFile(_nuxt, _options)

    // Installing Tailwind CSS v4 standalone
    nxwLog(_options.debugLog, 'Installing tailwindcss v4 standalone')
    const tailwindPlugin = await import('@tailwindcss/vite').then(
      r => r.default,
    )
    addVitePlugin(tailwindPlugin)

    // Adding Nuxt Color-Mode module
    nxwLog(
      _options.debugLog,
      'Checking for already installed @nuxtjs/color-mode module',
    )
    if (hasNuxtModule('@nuxtjs/color-mode')) {
      nxwLog(
        _options.debugLog,
        '@nuxtjs/color-mode module is already installed, skipping installation',
      )
    }
    else {
      nxwLog(
        _options.debugLog,
        '@nuxtjs/color-mode module not found, proceeding with installation',
        'warn',
      )
      if (!_options.colorMode) {
        _options.colorMode = { classSuffix: '' }
      }
      if (!_options.colorMode.classSuffix) {
        _options.colorMode.classSuffix = ''
      }
      nxwLog(
        _options.debugLog,
        `Using color mode class suffix: ${_options.colorMode.classSuffix}`,
      )
      await installModule('@nuxtjs/color-mode', _options.colorMode)
    }

    nxwLog(_options.debugLog, 'Adding components directory')
    // components
    addComponentsDir({
      prefix: _options.prefix,
      path: resolver.resolve(runtimeDir, 'components'),
      global: _options.global,
    })

    nxwLog(true, 'NuxtWind Module setup complete', 'success')
  },
})

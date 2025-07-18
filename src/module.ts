import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  createResolver,
  useLogger,
  addVitePlugin,
  hasNuxtModule,
} from '@nuxt/kit'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { name, version } from '../package.json'
import { primary, secondary } from './runtime/colors.json'

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
   * Used to set the default theme values for NuxtWind
   */
  theme: {
    primary: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
    secondary: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }

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
   * Used to automatically create main.css file if it doesn't exist
   * @default true
   */
  autoCreateCss?: boolean
}

function nxwLog(logActive: boolean | undefined, message: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') {
  if (logActive || type === 'error' || type === 'warn') {
    const logger = useLogger('nuxtwind')
    if (type === 'info') logger.info(message)
    if (type === 'success') logger.success(message)
    if (type === 'warn') logger.warn(message)
    if (type === 'error') logger.error(message)
  }
}

function ensureMainCssFile(nuxt: any, options: ModuleOptions) {
  const srcDir = nuxt.options.srcDir || nuxt.options.rootDir
  const assetsDir = join(srcDir, 'assets', 'css')
  const mainCssPath = join(assetsDir, 'main.css')

  nxwLog(options.debugLog, `Checking for main.css file at: ${mainCssPath}`)

  if (!existsSync(mainCssPath)) {
    nxwLog(options.debugLog, 'main.css file not found, creating...', 'warn')

    // Create assets/css directory if it doesn't exist
    if (!existsSync(assetsDir)) {
      nxwLog(options.debugLog, `Creating directory: ${assetsDir}`)
      mkdirSync(assetsDir, { recursive: true })
    }

    // Create main.css with Tailwind v4 import
    const cssContent = '@import "tailwindcss";'

    try {
      writeFileSync(mainCssPath, cssContent, 'utf8')
      nxwLog(options.debugLog, `Created main.css file at: ${mainCssPath}`, 'success')

      // Add the CSS file to Nuxt's CSS array if not already present
      const cssPath = '~/assets/css/main.css'
      if (!nuxt.options.css.includes(cssPath)) {
        nuxt.options.css.push(cssPath)
        nxwLog(options.debugLog, `Added ${cssPath} to Nuxt CSS configuration`, 'success')
      }
    }
    catch (error) {
      nxwLog(true, `Failed to create main.css file: ${error}`, 'error')
    }
  }
  else {
    nxwLog(options.debugLog, 'main.css file already exists')

    // Still ensure it's in the CSS array
    const cssPath = '~/assets/css/main.css'
    if (!nuxt.options.css.includes(cssPath)) {
      nuxt.options.css.push(cssPath)
      nxwLog(options.debugLog, `Added ${cssPath} to Nuxt CSS configuration`, 'success')
    }
  }
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
    autoCreateCss: true,
    theme: {
      primary,
      secondary,
    },
  },
  async setup(_options, _nuxt) {
    nxwLog(_options.debugLog, 'Setting up NuxtWind Module')
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    _nuxt.options.build.transpile.push(runtimeDir)

    _nuxt.options.alias['#nuxtwind'] = runtimeDir

    // Check and create main.css file if autoCreateCss is enabled
    if (_options.autoCreateCss) {
      ensureMainCssFile(_nuxt, _options)
    }

    // Installing Tailwind CSS v4 standalone
    nxwLog(_options.debugLog, 'Installing tailwindcss v4 standalone')
    const tailwindPlugin = await import('@tailwindcss/vite').then(r => r.default)
    addVitePlugin(tailwindPlugin)

    // Adding Nuxt Color-Mode module
    nxwLog(_options.debugLog, 'Checking for already installed @nuxtjs/color-mode module')
    if (hasNuxtModule('@nuxtjs/color-mode')) {
      nxwLog(_options.debugLog, '@nuxtjs/color-mode module is already installed, skipping installation')
    }
    else {
      nxwLog(_options.debugLog, '@nuxtjs/color-mode module not found, proceeding with installation', 'warn')
      if (!_options.colorMode) {
        _options.colorMode = { classSuffix: '' }
      }
      if (!_options.colorMode.classSuffix) {
        _options.colorMode.classSuffix = ''
      }
      nxwLog(_options.debugLog, `Using color mode class suffix: ${_options.colorMode.classSuffix}`)
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

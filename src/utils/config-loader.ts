import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Nuxt } from 'nuxt/schema'
import type { NuxtWindConfig } from '../runtime/types/config'
import { nxwLog } from './nxwLog'

export interface ConfigLoaderOptions {
  debugLog?: boolean
}

export class ConfigLoader {
  private nuxt: Nuxt
  private options: ConfigLoaderOptions

  constructor(nuxt: Nuxt, options: ConfigLoaderOptions = {}) {
    this.nuxt = nuxt
    this.options = options
  }

  async loadUserConfig(customConfigPath?: string): Promise<Partial<NuxtWindConfig> | null> {
    try {
      const rootDir = this.nuxt.options.rootDir
      let configPath: string | null = null

      if (customConfigPath) {
        // Handle custom config path
        nxwLog(this.options.debugLog, `Looking for custom config file at: ${customConfigPath}`)

        // Resolve relative paths from root directory
        const resolvedPath = resolve(rootDir, customConfigPath)

        if (existsSync(resolvedPath)) {
          configPath = resolvedPath
          nxwLog(this.options.debugLog, `Found custom config file: ${customConfigPath}`, 'success')
        }
        else {
          nxwLog(true, `Custom config file not found at: ${customConfigPath}`, 'error')
          return null
        }
      }
      else {
        // Auto-discover config file with different extensions
        nxwLog(this.options.debugLog, 'Looking for nuxtwind.config file...')

        const configExtensions = ['ts', 'js', 'mjs']

        for (const ext of configExtensions) {
          const path = resolve(rootDir, `nuxtwind.config.${ext}`)
          if (existsSync(path)) {
            configPath = path
            nxwLog(this.options.debugLog, `Found nuxtwind.config.${ext} file`, 'success')
            break
          }
        }

        if (!configPath) {
          nxwLog(this.options.debugLog, 'No nuxtwind.config file found, using default configurations')
          return null
        }
      }

      // Import the config file dynamically
      const configModule = await import(configPath)
      const config = configModule.default || configModule

      if (config && typeof config === 'object' && Object.keys(config).length > 0) {
        nxwLog(this.options.debugLog, `Successfully loaded config`)
        return config as Partial<NuxtWindConfig>
      }
      else {
        nxwLog(this.options.debugLog, 'Config file found but no valid configuration exported')
        return null
      }
    }
    catch (error) {
      nxwLog(true, `Failed to load config file: ${error}`, 'error')
      return null
    }
  }
}

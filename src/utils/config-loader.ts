import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { createJiti } from 'jiti'
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

  /**
   * Resolves the absolute path to the user's nuxtwind config file, if it exists.
   */
  resolveConfigPath(customConfigPath?: string): string | null {
    const rootDir = this.nuxt.options.rootDir

    if (customConfigPath) {
      const resolvedPath = resolve(rootDir, customConfigPath)
      return existsSync(resolvedPath) ? resolvedPath : null
    }

    const configExtensions = ['ts', 'js', 'mjs']
    for (const ext of configExtensions) {
      const path = resolve(rootDir, `nuxtwind.config.${ext}`)
      if (existsSync(path)) return path
    }

    return null
  }

  async loadUserConfig(customConfigPath?: string): Promise<Partial<NuxtWindConfig> | null> {
    try {
      const configPath = this.resolveConfigPath(customConfigPath)

      if (!configPath) {
        if (customConfigPath) {
          nxwLog(true, `Custom config file not found at: ${customConfigPath}`, 'error')
        }
        else {
          nxwLog(this.options.debugLog, 'No nuxtwind.config file found, using default configurations')
        }
        return null
      }

      nxwLog(this.options.debugLog, `Found config file: ${configPath}`, 'success')

      // Use jiti to import config files (supports .ts, .js, .mjs)
      const jiti = createJiti(configPath, { interopDefault: true })
      const configModule = await jiti.import(configPath) as Record<string, unknown>
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

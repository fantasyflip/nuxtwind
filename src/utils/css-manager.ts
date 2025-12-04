import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import type { Nuxt } from 'nuxt/schema'
import { CSS_TEMPLATES, CSS_VALIDATION } from '../runtime/css-templates'
import { nxwLog } from './nxwLog'

export interface CssManagerOptions {
  debugLog?: boolean
  /** Absolute directories that Tailwind should scan with @source */
  externalSources?: string[]
}

export class CssManager {
  private nuxt: Nuxt
  private options: CssManagerOptions
  private mainCssPath: string
  private assetsDir: string

  constructor(nuxt: Nuxt, options: CssManagerOptions = {}) {
    this.nuxt = nuxt
    this.options = options

    const srcDir = nuxt.options.srcDir || nuxt.options.rootDir
    this.assetsDir = join(srcDir, 'assets', 'css')
    this.mainCssPath = join(this.assetsDir, 'main.css')
  }

  /**
   * Ensures the main.css file exists and contains all required content
   */
  public ensureMainCssFile(): boolean {
    try {
      nxwLog(this.options.debugLog, `Checking for main.css file at: ${this.mainCssPath}`)

      if (!existsSync(this.mainCssPath)) {
        return this.createMainCssFile()
      }
      else {
        return this.validateAndUpdateMainCssFile()
      }
    }
    catch (error) {
      nxwLog(this.options.debugLog, `Error managing main.css file: ${error}`, 'error')
      return false
    }
  }

  /**
   * Creates a new main.css file with all required content
   */
  private createMainCssFile(): boolean {
    nxwLog(this.options.debugLog, 'main.css file not found, creating...', 'warn')

    // Create assets/css directory if it doesn't exist
    if (!existsSync(this.assetsDir)) {
      nxwLog(this.options.debugLog, `Creating directory: ${this.assetsDir}`)
      mkdirSync(this.assetsDir, { recursive: true })
    }

    try {
      let cssContent = CSS_TEMPLATES.complete()

      // Ensure external @source directives are present on first creation
      cssContent = this.injectSourceDirectives(cssContent)

      writeFileSync(this.mainCssPath, cssContent, 'utf8')
      nxwLog(this.options.debugLog, `Created main.css file at: ${this.mainCssPath}`, 'success')

      this.addToNuxtCssConfig()
      return true
    }
    catch (error) {
      nxwLog(this.options.debugLog, `Failed to create main.css file: ${error}`, 'error')
      return false
    }
  }

  /**
   * Validates existing main.css file and updates it if necessary
   */
  public validateAndUpdateMainCssFile(): boolean {
    nxwLog(this.options.debugLog, 'main.css file already exists, validating content...')

    try {
      let content = readFileSync(this.mainCssPath, 'utf8')
      let hasChanges = false

      // Check each required section
      for (const section of CSS_VALIDATION.requiredSections) {
        if (!section.pattern.test(content)) {
          nxwLog(this.options.debugLog, `main.css missing ${section.name}, adding...`, 'warn')
          content = this.addMissingSection(content, section)
          hasChanges = true
        }
        else {
          nxwLog(this.options.debugLog, `main.css already contains ${section.name}`)
        }
      }

      // Write back if there were changes
      // Ensure external @source directives
      const withSources = this.injectSourceDirectives(content)
      if (withSources !== content) {
        content = withSources
        hasChanges = true
      }

      if (hasChanges) {
        writeFileSync(this.mainCssPath, content, 'utf8')
        nxwLog(this.options.debugLog, `Updated main.css file at: ${this.mainCssPath}`, 'success')
      }

      this.addToNuxtCssConfig()
      return true
    }
    catch (error) {
      nxwLog(this.options.debugLog, `Failed to validate/update main.css file: ${error}`, 'error')
      return false
    }
  }

  /**
   * Adds missing section to CSS content in the appropriate position
   */
  private addMissingSection(content: string, section: (typeof CSS_VALIDATION.requiredSections)[number]): string {
    switch (section.position) {
      case 'top':
        return `${section.content}\n\n${content}`
      case 'bottom':
        return `${content}\n\n${section.content}`
      case 'middle':
      default:
      // Find a good position in the middle (after imports, before utilities)
      { const lines = content.split('\n')
        const lastImportIndex = this.findLastImportIndex(lines)
        const insertIndex = lastImportIndex + 1

        lines.splice(insertIndex, 0, '', section.content, '')
        return lines.join('\n') }
    }
  }

  /**
   * Finds the index of the last import statement
   */
  private findLastImportIndex(lines: string[]): number {
    let lastImportIndex = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]?.trim().startsWith('@import')) {
        lastImportIndex = i
      }
    }
    return lastImportIndex
  }

  /**
   * Adds the CSS file to Nuxt's CSS configuration if not already present
   */
  private addToNuxtCssConfig() {
    const cssPath = '~/assets/css/main.css'
    if (!this.nuxt.options.css.includes(cssPath)) {
      this.nuxt.options.css.push(cssPath)
      nxwLog(this.options.debugLog, `Added ${cssPath} to Nuxt CSS configuration`, 'success')
    }
  }

  /**
   * Injects @source directives for any configured external sources, if missing.
   * Places them right after the Tailwind import for clarity.
   */
  private injectSourceDirectives(content: string): string {
    const sources = this.options.externalSources || []
    if (!sources.length) return content

    const cssDir = dirname(this.mainCssPath)
    const existing = new Set(
      Array.from(content.matchAll(/@source\s+"([^"]+)"\s*;?/g)).map(m => m[1]),
    )

    const neededLines: string[] = []
    for (const absPath of sources) {
      try {
        const rel = relative(cssDir, absPath) || '.'
        // Use POSIX-style separators for CSS paths
        const relPosix = rel.split('\\').join('/')
        if (!existing.has(relPosix)) {
          neededLines.push(`@source "${relPosix}";`)
        }
      }
      catch (e) {
        // Non-fatal; skip this path
        nxwLog(this.options.debugLog, `Failed to compute @source path for ${absPath}: ${e}`, 'warn')
      }
    }

    if (!neededLines.length) return content

    // Insert after the last @import (ideally right after @import "tailwindcss";)
    const lines = content.split('\n')
    const lastImportIndex = this.findLastImportIndex(lines)
    const insertIndex = lastImportIndex >= 0 ? lastImportIndex + 1 : 0
    lines.splice(insertIndex, 0, '', ...neededLines, '')
    return lines.join('\n')
  }

  /**
   * Validates if the current CSS file has all required content
   */
  public validateCssFile(): { valid: boolean, missing: string[] } {
    if (!existsSync(this.mainCssPath)) {
      return { valid: false, missing: ['File does not exist'] }
    }

    try {
      const content = readFileSync(this.mainCssPath, 'utf8')
      const missing: string[] = []

      for (const section of CSS_VALIDATION.requiredSections) {
        if (!section.pattern.test(content)) {
          missing.push(section.name)
        }
      }

      return { valid: missing.length === 0, missing }
    }
    catch (error) {
      return { valid: false, missing: [`Error reading file: ${error}`] }
    }
  }
}

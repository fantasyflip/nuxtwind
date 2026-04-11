import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr with user config', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/with-config', import.meta.url)),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>with-config</div>')
  })

  it('generates @source directive for user config file', () => {
    const fixtureDir = fileURLToPath(new URL('./fixtures/with-config', import.meta.url))
    const mainCss = readFileSync(join(fixtureDir, 'assets/css/main.css'), 'utf8')
    const sourceDirectives = Array.from(mainCss.matchAll(/@source\s+"([^"]+)"\s*;?/g)).map(m => m[1])
    expect(sourceDirectives.some(s => s.includes('runtime/components'))).toBe(true)
    expect(sourceDirectives.some(s => s.includes('runtime/defaults'))).toBe(true)
    expect(sourceDirectives.some(s => s.includes('nuxtwind.config'))).toBe(true)
  })
})

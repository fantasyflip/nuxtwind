import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('generates @source directives for components and defaults', () => {
    const fixtureDir = fileURLToPath(new URL('./fixtures/basic', import.meta.url))
    const mainCss = readFileSync(join(fixtureDir, 'assets/css/main.css'), 'utf8')
    const sourceDirectives = Array.from(mainCss.matchAll(/@source\s+"([^"]+)"\s*;?/g)).map(m => m[1])
    expect(sourceDirectives.some(s => s.includes('runtime/components'))).toBe(true)
    expect(sourceDirectives.some(s => s.includes('runtime/defaults'))).toBe(true)
  })
})

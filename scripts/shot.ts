// https://playwright.dev/docs/library#first-script
import type { BrowserContext } from 'playwright'
import { chromium } from 'playwright'

import works from '@/works'

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 })
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4444',
    viewport: {
      width: 920,
      height: 500,
    },
  })

  await task(context, '', 0, 'index')
  for (const w of works) await task(context, w.no)

  await context.close()
  await browser.close()
}

async function task(ctx: BrowserContext, no: string, delay = 0, prefix = '', suffix = 'png') {
  const page = await ctx.newPage()
  await page.goto(`/${no}`)
  await page.waitForTimeout(delay)
  await page.screenshot({ path: `public/snapshots/${prefix}${no}.${suffix}` })
  await page.close()
}

run()

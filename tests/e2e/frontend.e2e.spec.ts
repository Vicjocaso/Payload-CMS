import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Atelier Wellness/)
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Luxury hospitality. Wellness that performs.')
  })
})

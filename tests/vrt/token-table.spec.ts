import { test, expect } from "@playwright/test"
test("token table pixel match", async ({ page }) => {
  await page.goto("http://localhost:3000/tokens")
  const table = page.locator("table")
  await expect(table).toHaveScreenshot("token-table.png", { maxDiffPixels: 2 })
})

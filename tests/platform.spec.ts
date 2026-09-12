import { expect, test } from "@playwright/test";

for (const [path, heading] of [["/blog", "Ideas under construction."], ["/privacy", "Privacy Policy"], ["/terms", "Terms and Conditions"], ["/sign-in", "Return to your workspace."]] as const) {
  test(`${path} renders without horizontal overflow`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    const sizes = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(sizes.document).toBeLessThanOrEqual(sizes.viewport);
  });
}

test("metadata endpoints expose only public routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Disallow: /admin/");
  const sitemap = await request.get("/sitemap.xml");
  const xml = await sitemap.text();
  expect(xml).toContain("https://juscad.com/privacy");
  expect(xml).not.toContain("/settings");
});

test("protected account routes redirect anonymous users", async ({ page }) => {
  await page.goto("/settings");
  await expect(page).toHaveURL(/\/sign-in/);
});

test("beta form exposes accessible validation", async ({ page }) => {
  await page.goto("/beta");
  await page.getByRole("button", { name: "Request access" }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
});

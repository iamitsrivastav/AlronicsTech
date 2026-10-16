const { test, expect } = require('@playwright/test');

test.describe('Prayagraj market-validation page', () => {
  test('loads the configured Google Form embed', async ({ page }) => {
    await page.goto('http://localhost:8000/prayagraj/');
    await expect(page.getByRole('heading', { name: 'Prayagraj, Let’s Build the Future!' })).toBeVisible();
    await expect(page.locator('#form-notice')).toBeHidden();
    await expect(page.locator('#interest-form-frame')).toBeVisible();
    const formUrl = new URL(await page.locator('#interest-form-frame').getAttribute('src'));
    expect(formUrl.origin).toBe('https://docs.google.com');
    expect(formUrl.pathname).toBe('/forms/d/e/1FAIpQLSeiq4zM5xIVYJG1pzklzw1g-zII56Bk7gKwJeDnE8O-TZ2Ziw/viewform');
    expect(formUrl.searchParams.get('embedded')).toBe('true');
    await expect(page.getByRole('link', { name: 'Explore Alronics Tech' })).toHaveAttribute('href', 'https://alronicstech.com/');
  });

  test('prefills configured campaign fields in the Google Form URL', async ({ page }) => {
    await page.route('**/prayagraj-config.js', (route) => route.fulfill({
      contentType: 'application/javascript',
      body: `window.PRAYAGRAJ_FORM_CONFIG = {
        embedUrl: "https://docs.google.com/forms/d/e/REALFORMID/viewform",
        utmEntryIds: { source: "101", medium: "102", campaign: "103", content: "104" }
      };`
    }));

    await page.goto('http://localhost:8000/prayagraj/?utm_source=qr-poster&utm_medium=offline&utm_campaign=validation&utm_content=poster-a');
    const formUrl = new URL(await page.locator('#interest-form-frame').getAttribute('src'));

    expect(formUrl.origin).toBe('https://docs.google.com');
    expect(formUrl.searchParams.get('embedded')).toBe('true');
    expect(formUrl.searchParams.get('entry.101')).toBe('qr-poster');
    expect(formUrl.searchParams.get('entry.102')).toBe('offline');
    expect(formUrl.searchParams.get('entry.103')).toBe('validation');
    expect(formUrl.searchParams.get('entry.104')).toBe('poster-a');
    await expect(page.locator('#form-notice')).toBeHidden();
    await expect(page.locator('#interest-form-frame')).toBeVisible();
    await expect(page.locator('#form-tracking-note')).toBeHidden();
  });

  test('warns when campaign values have no matching Google Form field', async ({ page }) => {
    await page.route('**/prayagraj-config.js', (route) => route.fulfill({
      contentType: 'application/javascript',
      body: `window.PRAYAGRAJ_FORM_CONFIG = {
        embedUrl: "https://docs.google.com/forms/d/e/REALFORMID/viewform",
        utmEntryIds: {}
      };`
    }));

    await page.goto('http://localhost:8000/prayagraj/?utm_source=flyer');
    await expect(page.locator('#form-tracking-note')).toContainText('will not be recorded');
  });

  test('rejects non-Google form URLs and keeps an email recovery path', async ({ page }) => {
    await page.route('**/prayagraj-config.js', (route) => route.fulfill({
      contentType: 'application/javascript',
      body: `window.PRAYAGRAJ_FORM_CONFIG = {
        embedUrl: "https://forms.example.test/collect",
        utmEntryIds: {}
      };`
    }));

    await page.goto('http://localhost:8000/prayagraj/');
    await expect(page.locator('#form-notice')).toContainText('not a valid Google Forms link');
    await expect(page.locator('#interest-form-frame')).toBeHidden();
    await expect(page.locator('#form-notice a')).toHaveAttribute('href', /mailto:alronicstech@gmail\.com/);
  });

  test('avoids horizontal overflow at narrow mobile widths', async ({ page }) => {
    for (const width of [320, 360, 375, 390, 414, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('http://localhost:8000/prayagraj/');
      const dimensions = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth
      }));
      expect(dimensions.document, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    }
  });
});

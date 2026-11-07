// Site-wide checks: home page and search, every tool page loads, pages use only local
// code, and the site keeps working offline once the service worker has cached it.
const { test, expect } = require('@playwright/test');
const { TOOLS, readyTools } = require('./tools');

test('home page lists every section and searches tools', async ({ page }) => {
  await page.goto('/');
  const sections = [...new Set(TOOLS.map(t => t.url.split('/')[0]))];
  await expect(page.locator('.card-large')).toHaveCount(sections.length);
  await expect(page.locator('#search-input')).toHaveAttribute('placeholder', `Search ${TOOLS.length} tools…`);

  await page.keyboard.press('/');
  await page.keyboard.type('timer');
  await expect(page.locator('.search-result.active strong')).toHaveText('Timer');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/utilities\/timer\/$/);

  await page.goto('/');
  await page.fill('#search-input', 'eip55');
  await expect(page.locator('.search-result.active strong')).toHaveText('Checksum Address');
  await page.fill('#search-input', 'zzzz-no-such-tool');
  await expect(page.locator('#search-results')).toContainText('No tools found');
});

test('every section and tool page exists', async ({ request }) => {
  const urls = [...new Set(TOOLS.flatMap(t => [t.url.split('/')[0] + '/', t.url]))];
  for (const url of urls) {
    const res = await request.get(url);
    expect(res.status(), url).toBe(200);
  }
});

test('ready tool pages load no third-party code', async ({ page }) => {
  test.setTimeout(600_000);
  const external = new Set();
  page.on('request', r => {
    const u = new URL(r.url());
    if (u.hostname !== 'localhost' && /^https?:$/.test(u.protocol)) external.add(`${u.hostname}${u.pathname} (on ${page.url()})`);
  });
  for (const tool of readyTools) {
    await page.goto(tool.url);
    await page.waitForLoadState('load');
  }
  // Heavy engines download on demand only when a conversion or OCR actually runs.
  const unexpected = [...external].filter(u => !/@ffmpeg\/core|tesseract|tessdata/.test(u));
  expect(unexpected).toEqual([]);
});

test('works offline after the first visit', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  // Wait until the service worker has precached the whole site.
  await page.waitForFunction(async () => {
    const keys = await caches.keys();
    const site = keys.find(k => k.startsWith('site-'));
    return site && (await (await caches.open(site)).keys()).length > 100;
  }, null, { timeout: 60_000, polling: 1000 });

  await context.setOffline(true);
  for (const url of ['/', '/utilities/timer/', '/crypto/hash/', '/evm/abi/', '/polkadot/scale-codec/']) {
    const res = await page.goto(url);
    expect(res && res.ok(), `offline ${url}`).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
  }
  // A tool that needs vendored libraries still computes offline.
  await page.goto('/crypto/hash/');
  await page.locator('textarea').first().fill('abc');
  await expect(page.locator('main')).toContainText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

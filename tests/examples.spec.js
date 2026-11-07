// Every crypto tool page has an Example button (on every tab), and every one of them
// fills the page with a working example: no error message, no console errors, no
// horizontal scroll on a phone-sized screen.
const { test, expect } = require('@playwright/test');
const { cryptoTools } = require('./tools');

// Values some examples must produce, to catch examples that "work" but compute the wrong thing.
const EXPECTED = {
  'bitcoin/block-header/': '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
  'bitcoin/address/': 'bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu',
  'crypto/hmac/': 'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7',
  'evm/address-from-key/': '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  'solana/anchor-discriminator/': 'afaf6d1f0d989bed',
  'polkadot/ss58-converter/': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  'cosmos/derived-addresses/': 'cosmos1jv65s3grqf6v6jl3dp4t6c9t9rk99cd88lyufl',
};

const TABS = '.mode-tabs [data-tab], [role="tab"]';

for (const tool of cryptoTools) {
  test(`${tool.url} examples`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/favicon/.test(m.text())) errors.push(m.text()); });

    await page.goto(tool.url);
    await page.waitForLoadState('domcontentloaded');

    const tabCount = await page.locator(TABS).filter({ visible: true }).count();
    const tabs = tabCount ? [...Array(tabCount).keys()] : [null];
    let seen = '';
    let buttons = 0;

    for (const tab of tabs) {
      if (tab !== null) await page.locator(TABS).filter({ visible: true }).nth(tab).click();
      // Read labels first: some pages re-render their buttons after a click.
      const labels = await page.locator('button').filter({ visible: true, hasText: /^\s*Example/ }).allTextContents();
      if (tab !== null) expect(labels.length, `tab ${tab + 1} has an Example button`).toBeGreaterThan(0);
      buttons += labels.length;

      for (const label of labels.map(l => l.trim())) {
        await test.step(label, async () => {
          // An example may switch tabs (e.g. a shared example that opens Encode); come back first.
          if (tab !== null) await page.locator(TABS).nth(tab).click();
          await page.locator('button').filter({ visible: true, hasText: label }).first().click({ timeout: 10_000 });
          // Generators (vanity search, password hashing) can take a few seconds.
          await page.waitForTimeout(800);
          await expect(page.locator('[aria-busy="true"]')).toHaveCount(0, { timeout: 30_000 });

          const visibleErrors = await page.evaluate(() =>
            [...document.querySelectorAll('.error, [id$="err"], [id^="err"]')]
              .filter(e => e.offsetParent && e.textContent.trim())
              .map(e => e.textContent.trim()));
          expect(visibleErrors, 'no error message after the example').toEqual([]);
          expect(await page.evaluate(() => document.documentElement.scrollWidth), 'no horizontal scroll').toBeLessThanOrEqual(390);
          // Results may be shown as text or written into input fields.
          seen += await page.evaluate(() => document.querySelector('main').innerText + '\n' +
            [...document.querySelectorAll('main input, main textarea')].map(e => e.value).join('\n'));
        });
      }
    }

    expect(buttons, 'page has an Example button').toBeGreaterThan(0);
    if (EXPECTED[tool.url]) expect(seen).toContain(EXPECTED[tool.url]);
    expect(errors, 'no console or page errors').toEqual([]);
  });
}

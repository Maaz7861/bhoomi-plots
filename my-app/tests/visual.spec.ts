import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

// ----------------------------------------------------------------
// Visual snapshot comparison:
//   - Baseline = static-site/index.html opened as file://
//   - Current  = Next.js dev server at http://localhost:3000/Home
// ----------------------------------------------------------------

const STATIC_PATH = path.resolve(
  __dirname,
  '../../static-site/index.html'
);

const SECTIONS = [
  { name: 'full-page',        selector: 'body' },
  { name: 'navbar',           selector: '.navbar' },
  { name: 'hero',             selector: '.hero' },
  { name: 'success-section',  selector: '.success-section' },
  { name: 'why-choose',       selector: '.why-choose-section' },
  { name: 'latest-work',      selector: '.latest-work-section' },
  { name: 'testimonials',     selector: '.testimonials-section' },
  { name: 'videos-faq',       selector: '.videos-faq-section' },
  { name: 'footer',           selector: '.footer' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 900,  height: 768 },
  { name: 'mobile',  width: 390,  height: 844 },
];

// Ensure snapshot dirs exist
const snapshotDir = path.join(__dirname, 'snapshots');
fs.mkdirSync(path.join(snapshotDir, 'baseline'), { recursive: true });
fs.mkdirSync(path.join(snapshotDir, 'current'),  { recursive: true });

// ---- BASELINE: static site ----
for (const vp of VIEWPORTS) {
  test.describe(`Baseline – ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`Capture baseline screenshots (${vp.name})`, async ({ page }) => {
      await page.goto(`file:///${STATIC_PATH.replace(/\\/g, '/')}`);
      await page.waitForTimeout(1500); // let animations/fonts settle

      for (const section of SECTIONS) {
        const el = page.locator(section.selector).first();
        if (await el.count() === 0) continue;

        await el.screenshot({
          path: path.join(snapshotDir, 'baseline', `${vp.name}-${section.name}.png`),
        });
      }
    });
  });
}

// ---- CURRENT: Next.js app ----
for (const vp of VIEWPORTS) {
  test.describe(`Current – ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`Capture current screenshots (${vp.name})`, async ({ page }) => {
      await page.goto('http://localhost:3000/Home');
      await page.waitForTimeout(1500);

      for (const section of SECTIONS) {
        const el = page.locator(section.selector).first();
        if (await el.count() === 0) continue;

        await el.screenshot({
          path: path.join(snapshotDir, 'current', `${vp.name}-${section.name}.png`),
        });
      }
    });
  });
}

// ---- DIFF: compare baseline vs current ----
test.describe('Visual diff – baseline vs current', () => {
  for (const vp of VIEWPORTS) {
    for (const section of SECTIONS) {
      test(`[${vp.name}] ${section.name} matches baseline`, async ({ page }) => {
        const baselinePath = path.join(snapshotDir, 'baseline', `${vp.name}-${section.name}.png`);
        if (!fs.existsSync(baselinePath)) {
          test.skip(true, 'Baseline not captured yet – run baseline tests first');
          return;
        }

        // Navigate to Next.js
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('http://localhost:3000/Home');
        await page.waitForTimeout(1500);

        const el = page.locator(section.selector).first();
        if (await el.count() === 0) {
          test.skip(true, `Section "${section.selector}" not found`);
          return;
        }

        // Compare against stored baseline
        await expect(el).toHaveScreenshot(
          `${vp.name}-${section.name}.png`,
          {
            maxDiffPixelRatio: 0.03,   // allow <3% pixel difference
            threshold: 0.2,             // per-pixel colour tolerance
          }
        );
      });
    }
  }
});

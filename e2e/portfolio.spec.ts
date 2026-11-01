import AxeBuilder from '@axe-core/playwright';
import { Page, expect, test } from '@playwright/test';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'architecture', 'achievements', 'education', 'contact'];

/** Deferred sections load on idle; wait until the last one has rendered. */
async function loaded(page: Page) {
  await page.goto('/');
  await expect(page.locator('app-contact form')).toBeAttached({ timeout: 20_000 });
  // Layout is only stable once every deferred section has replaced its skeleton.
  await expect(page.locator('app-section-skeleton')).toHaveCount(0, { timeout: 20_000 });
}

test.beforeEach(async ({ page }) => {
  page.on('pageerror', (e) => {
    throw e;
  });
});

test('hero shows identity, designations and actions', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Francis Ciril Arulsamy');
  await expect(page.locator('app-typing-text')).toHaveAttribute('aria-label', /Front-End Architect, Angular Architect, UI Architect, Front-End Manager/);
  await expect(page.getByRole('link', { name: 'Contact Me' })).toBeVisible();
  await expect(page.locator('app-hero').getByRole('button', { name: 'Download Resume' })).toBeVisible();
  await expect(page.locator('app-hero').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', /linkedin\.com/);
  await expect(page.locator('app-hero').getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', /github\.com/);
});

test('every section renders', async ({ page }) => {
  await loaded(page);
  for (const id of SECTIONS) await expect(page.locator(`section#${id}`)).toBeAttached();
  await expect(page.locator('app-section-skeleton')).toHaveCount(0);
});

test('navigation scrolls to sections and highlights the active one', async ({ page }) => {
  const isMobile = (page.viewportSize()?.width ?? 0) <= 960; // below this width the hamburger menu replaces the bar
  await loaded(page);
  for (const id of ['experience', 'projects', 'contact']) {
    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.locator('#mobile-menu').getByRole('link', { name: new RegExp(id, 'i') }).click();
      await expect(page.locator('#mobile-menu')).toHaveCount(0);
    } else {
      await page.locator('app-header nav').getByRole('link', { name: new RegExp(`^${id}$`, 'i') }).click();
    }
    await expect.poll(async () => page.locator(`section#${id}`).evaluate((el) => Math.abs(el.getBoundingClientRect().top)), { timeout: 15_000 }).toBeLessThan(140);
    if (!isMobile) {
      await expect(page.locator('app-header nav a.active')).toHaveText(new RegExp(id, 'i'));
    }
  }
});

test('header turns solid on scroll and theme can be switched', async ({ page }) => {
  await loaded(page);
  await expect(page.locator('app-header')).not.toHaveClass(/scrolled/);
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(page.locator('app-header')).toHaveClass(/scrolled/);

  const before = await page.evaluate(() => document.documentElement.classList.contains('app-dark'));
  await page.getByRole('button', { name: /Switch to (light|dark) theme/ }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('app-dark'))).toBe(!before);
  const after = !before;
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.classList.contains('app-dark'))).toBe(after);
});

test('competency tabs and skills filter work', async ({ page }) => {
  await loaded(page);
  await page.getByRole('tab', { name: 'Engineering Quality' }).click();
  await expect(page.getByRole('tabpanel').first()).toContainText('Cross-Browser Compatibility');
  await page.getByRole('tab', { name: 'Delivery Leadership' }).click();
  await expect(page.getByRole('tabpanel').first()).toContainText('CI/CD');

  await page.locator('#skills').getByRole('button', { name: 'Databases' }).click();
  await expect(page.locator('#skills .group')).toHaveCount(1);
  await expect(page.locator('#skills .group')).toContainText('MongoDB');
  await page.locator('#skills').getByRole('button', { name: 'Primary expertise' }).click();
  await expect(page.locator('#skills .skill.primary')).toHaveCount(3);
});

test('experience cards expand and collapse', async ({ page }) => {
  await loaded(page);
  const wipro = page.locator('#experience').getByRole('button', { name: /Wipro/ });
  await expect(wipro).toHaveAttribute('aria-expanded', 'false');
  await wipro.click();
  await expect(wipro).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#exp-wipro')).toContainText('Cisco');
  await page.locator('#experience').getByRole('button', { name: 'Expand all' }).click();
  await expect(page.locator('#experience [aria-expanded="true"]')).toHaveCount(6);
});

test('projects filter and detail dialog', async ({ page }) => {
  await loaded(page);
  await expect(page.locator('#projects article.card')).toHaveCount(6);
  await page.locator('#projects').getByRole('button', { name: 'React', exact: true }).click();
  await expect(page.locator('#projects article.card')).toHaveCount(1);
  await page.locator('#projects').getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.locator('#projects article.card')).toHaveCount(6);

  await page.getByRole('button', { name: /View details: Assurance IQ/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Angular 18');
  await expect(dialog).toContainText('Architecture highlights');
  await dialog.getByRole('button', { name: 'Next' }).click();
  await expect(dialog).toContainText('Packaged Contact Center');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('architecture diagram is interactive', async ({ page }) => {
  await loaded(page);
  const arch = page.locator('#architecture');
  await arch.getByRole('button', { name: 'Auth (JWT / OAuth)' }).click();
  await expect(arch.locator('aside.detail')).toContainText('Architectural interest');
  await arch.getByRole('button', { name: 'Caching' }).click();
  await expect(arch.locator('aside.detail')).toContainText('Backed by résumé experience');
  await arch.getByRole('tab', { name: 'Component ecosystem' }).click();
  await arch.getByRole('button', { name: 'Tokens & Styles' }).click();
  await expect(arch.locator('.detail--flow')).toContainText('SCSS/Sass');
  await arch.getByRole('button', { name: 'Interests' }).click();
  await expect(arch.locator('.topic')).toHaveCount(5);
});

test('achievement charts render', async ({ page }) => {
  await loaded(page);
  await page.locator('#achievements app-chart').first().scrollIntoViewIfNeeded();
  await expect(page.locator('#achievements app-chart canvas').first()).toBeAttached({ timeout: 15_000 });
});

test('contact form validates and shows the configured contact details', async ({ page }) => {
  await loaded(page);
  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: /@/ })).toHaveAttribute('href', /^mailto:/);
  const form = contact.locator('form');
  await expect(form.getByRole('button', { name: /Send message/ })).toBeEnabled();
  await form.getByRole('button', { name: /Send message/ }).click();
  await expect(form).toContainText('Please enter your name.');
  await form.getByLabel('Email').fill('nope');
  await form.getByLabel('Name').click();
  await expect(form).toContainText('valid email');
});

test('resume download opens a printable resume when no PDF is bundled', async ({ page }) => {
  await loaded(page);
  const popup = page.waitForEvent('popup');
  await page.locator('#contact').getByRole('button', { name: 'Download Resume' }).click();
  const resume = await popup;
  await expect(resume.locator('h1')).toHaveText('Francis Ciril Arulsamy');
  await expect(resume.locator('body')).toContainText('Eurofins IT Solutions India Pvt. Ltd.');
});

test('has no horizontal overflow', async ({ page }) => {
  await loaded(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

for (const scheme of ['dark', 'light'] as const) {
  test(`no serious accessibility violations (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await loaded(page);
    await page.addStyleTag({ content: '.reveal{opacity:1!important;translate:none!important}' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}

test('reduced motion disables decorative animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('app-typing-text')).toContainText('Front-End Architect | Angular Architect');
});

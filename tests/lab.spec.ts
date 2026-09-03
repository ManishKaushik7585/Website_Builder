import { test, expect } from '@playwright/test';

test.describe('Component Lab Verification (Phase 3A + 3B)', () => {

  test('Phase 5B Visual Intelligence Lab renders modes and densities', async ({ page }) => {
    await page.goto('/lab');
    
    // Check for the section title
    await expect(page.getByText('Visual Intelligence Lab (Phase 5B)')).toBeVisible();
    
    // Check for specific modes and densities
    await expect(page.getByText('Mode: Technical | Density: Balanced')).toBeVisible();
    await expect(page.getByText('Structured Data Emphasis')).toBeVisible();
    
    await expect(page.getByText('Mode: Editorial | Density: Sparse')).toBeVisible();
    await expect(page.getByText('The Art of Spacing')).toBeVisible();
    
    await expect(page.getByText('Mode: Expressive | Surface: Flat')).toBeVisible();
    await expect(page.getByText('Mode: Restrained | Surface: Elevated')).toBeVisible();
  });

  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
  });

  test('Lab loads successfully with no console errors', async ({ page }) => {
    const response = await page.goto('/lab');
    expect(response?.status()).toBe(200);
    // Ignore 404s for favicon or other minor assets, strictly looking at code errors
    expect(consoleErrors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('Major composite component sections exist', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByRole('heading', { name: 'Composites: Content', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Composites: Commerce', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Composites: Interaction', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Composites: Navigation', exact: true })).toBeVisible();
  });

  test('Accordion interaction and accessibility', async ({ page }) => {
    await page.goto('/lab');
    const accordionTrigger = page.getByRole('button', { name: 'What is the refund policy?' });
    
    // Initial state: collapsed
    await expect(accordionTrigger).toHaveAttribute('aria-expanded', 'false');
    const content = page.getByText('You can request a full refund within 30 days');
    // It exists but is hidden via CSS
    await expect(content).toBeAttached();
    
    // Click to expand
    await accordionTrigger.click();
    await expect(accordionTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('Tabs interaction and accessibility', async ({ page, isMobile }) => {
    await page.goto('/lab');
    const tabAccount = page.getByRole('tab', { name: 'Account' });
    const tabPassword = page.getByRole('tab', { name: 'Password' });
    
    // Initial state
    await expect(tabAccount).toHaveAttribute('aria-selected', 'true');
    await expect(tabPassword).toHaveAttribute('aria-selected', 'false');
    await expect(page.getByText('Make changes to your account here.')).toBeVisible();
    await expect(page.getByText('Change your password here.')).not.toBeVisible();
    
    if (!isMobile) {
      // Keyboard navigation (Desktop only)
      await tabAccount.click();
      await expect(tabAccount).toBeFocused();
      await page.keyboard.press('ArrowRight');
      
      // After arrow right, focus and selection should move to Password
      await expect(tabPassword).toBeFocused();
      await expect(tabAccount).toHaveAttribute('aria-selected', 'false');
      await expect(tabPassword).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByText('Change your password here.')).toBeVisible();
      
      // Reset state for click test
      await page.keyboard.press('ArrowLeft');
      await expect(tabAccount).toBeFocused();
    }
    
    // Click navigation (Universal)
    await tabPassword.click();
    await expect(tabAccount).toHaveAttribute('aria-selected', 'false');
    await expect(tabPassword).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Change your password here.')).toBeVisible();
  });

  test('Toggle state changes correctly', async ({ page }) => {
    await page.goto('/lab');
    const toggle = page.getByRole('switch', { name: 'Receive marketing emails' });
    
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  test('Breadcrumb links are discoverable', async ({ page }) => {
    await page.goto('/lab');
    const nav = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Products' })).toBeVisible();
  });

  test('No horizontal overflow on desktop or mobile', async ({ page }) => {
    await page.goto('/lab');
    
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('Motion Lab renders reveals and respects reduced motion', async ({ page }) => {
    // Navigate with prefers-reduced-motion forced to 'reduce'
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/lab');
    
    // Find a reveal element
    const revealText = page.getByText('Revealed from bottom (up)');
    await expect(revealText).toBeVisible();
    
    // Evaluate if the translation is suppressed in reduced-motion
    const transform = await revealText.evaluate((el) => {
      // Find the closest ancestor which is the <Reveal> div
      const revealDiv = el.closest('div[style*="opacity"]');
      return window.getComputedStyle(revealDiv!).transform;
    });
    
    // Reduced motion overrides translate to 0 (which computes to 'matrix(1, 0, 0, 1, 0, 0)' or 'none')
    expect(transform === 'matrix(1, 0, 0, 1, 0, 0)' || transform === 'none').toBeTruthy();
  });

  test('Phase 4A Pattern and Section Lab renders structurally', async ({ page }) => {
    await page.goto('/lab');
    
    // Verify Split renders correctly
    await expect(page.getByText('Arbitrary Media Slot (e.g. Canvas)')).toBeVisible();
    
    // Verify HeroSection rendering
    await expect(page.getByText('Premium Sections')).toBeVisible();
    await expect(page.getByText('New Architecture')).toBeVisible();
    
    // Verify FeaturesSection
    await expect(page.getByText('Built for scale')).toBeVisible();
  });

  test('Phase 4B Site Shell, Header, and SkipLink structure', async ({ page }) => {
    await page.goto('/lab');
    
    // Test SkipLink visibility and target
    const skipLink = page.getByText('Skip to main content');
    await expect(skipLink).toHaveClass(/sr-only/);
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
    
    // Semantic boundaries
    const header = page.locator('header');
    const main = page.locator('main#main-content');
    const footer = page.locator('footer');
    await expect(header.first()).toBeVisible();
    await expect(main.first()).toBeVisible();
    await expect(footer.first()).toBeVisible();
  });

  test('Phase 4B Header mobile menu interaction', async ({ page }) => {
    // Mobile dimensions
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/lab');
    
    const menuButton = page.getByRole('button', { name: 'Open main menu' }).first();
    const mobileMenu = page.locator('#mobile-menu').first();
    
    // Should be closed initially
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).toHaveClass(/hidden/);
    
    // Click to open
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu).toHaveClass(/block/);
    
    // Menu items visible
    await expect(mobileMenu.getByText('Home')).toBeVisible();
    
    // Click to close
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).toHaveClass(/hidden/);
  });

  test('Phase 4B PageRenderer dynamically outputs registry components', async ({ page }) => {
    await page.goto('/lab');
    
    // The mocked PageConfig inside the lab renders these specific strings
    await expect(page.getByText('Dynamic Hero')).toBeVisible();
    await expect(page.getByText('Registry Rendered')).toBeVisible();
    await expect(page.getByText('Dynamic Features')).toBeVisible();
    
    // Unknown section should fail silently without crashing the page
    // The rest of the page remains intact
    const siteShellContainer = page.locator('main#main-content');
    await expect(siteShellContainer.first()).toBeVisible();
  });
});

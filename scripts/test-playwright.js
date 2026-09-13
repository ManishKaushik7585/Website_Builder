const { chromium } = require('@playwright/test');

(async () => {
  try {
    const browser = await chromium.launch();
    console.log('Chromium launched successfully');
    await browser.close();
  } catch (err) {
    console.error('Failed to launch:', err.message);
    process.exit(1);
  }
})();

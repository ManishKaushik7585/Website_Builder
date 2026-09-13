import { chromium, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export interface ViewportObservation {
  scrollPosition: number;
  viewportWidth: number;
  viewportHeight: number;
  pageHeight: number;
  timestamp: string;
  screenshotPath: string;
  typography: any[];
  media: any[];
  layout: any[];
}

export interface WebsiteResearchReport {
  url: string;
  userAgent: string;
  totalScrolls: number;
  finalPageHeight: number;
  observations: ViewportObservation[];
}

async function extractViewportSignals(page: Page): Promise<{ typography: any[], media: any[], layout: any[] }> {
  return await page.evaluate(() => {
    const getVisibleElements = (selector: string) => {
      const elements = Array.from(document.querySelectorAll(selector));
      return elements.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0 && rect.height > 0;
      });
    };

    // Extract Typography
    const headings = getVisibleElements('h1, h2, h3, h4, p.large, .display, .title').map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.textContent?.substring(0, 50).trim() + '...',
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        textAlign: style.textAlign,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      };
    });

    // Extract Media
    const media = getVisibleElements('img, video, svg, [style*="background-image"]').map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        src: (el as HTMLImageElement).src || 'css-bg',
        objectFit: style.objectFit,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      };
    });

    // Extract Layout / Sections
    const layout = getVisibleElements('section, main, article, header, footer').map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        display: style.display,
        position: style.position,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      };
    });

    return { typography: headings, media, layout };
  });
}

async function runExplorer() {
  const targetUrl = process.argv[2];
  if (!targetUrl) {
    console.error('Usage: node explore-website.js <URL>');
    process.exit(1);
  }

  const hostname = new URL(targetUrl).hostname;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.join(process.cwd(), 'research', `${hostname}-${timestamp}`);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`[Explorer] Launching browser to explore: ${targetUrl}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const report: WebsiteResearchReport = {
    url: targetUrl,
    userAgent: await browser.version(),
    totalScrolls: 0,
    finalPageHeight: 0,
    observations: []
  };

  try {
    console.log(`[Explorer] Navigating...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Wait for fonts & initial animations to settle
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(3000);

    let scrollY = 0;
    const viewportHeight = 900;
    let pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    
    let step = 0;

    while (scrollY < pageHeight) {
      console.log(`[Explorer] Analyzing viewport at scroll Y: ${scrollY}`);
      
      const screenshotPath = path.join(outDir, `viewport-${step}.jpg`);
      await page.screenshot({ path: screenshotPath, type: 'jpeg', quality: 70 });
      
      const signals = await extractViewportSignals(page);
      
      report.observations.push({
        scrollPosition: scrollY,
        viewportWidth: 1440,
        viewportHeight: 900,
        pageHeight,
        timestamp: new Date().toISOString(),
        screenshotPath,
        ...signals
      });

      // Scroll down by 75% of viewport to overlap slightly and catch scroll triggers
      const scrollStep = Math.floor(viewportHeight * 0.75);
      scrollY += scrollStep;
      
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      
      // Allow lazy loads and animations to trigger and settle
      await page.waitForTimeout(2000);
      
      // Update page height in case infinite scroll or lazy load expanded it
      const newPageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      if (newPageHeight > pageHeight) {
        console.log(`[Explorer] Page height expanded dynamically: ${pageHeight} -> ${newPageHeight}`);
        pageHeight = newPageHeight;
      }
      
      step++;
      
      // Failsafe for infinite scrolling
      if (step > 30) {
        console.log('[Explorer] Reached 30 scroll steps. Stopping to avoid infinite loop.');
        break;
      }
    }
    
    report.finalPageHeight = pageHeight;
    report.totalScrolls = step;

    const reportPath = path.join(outDir, 'report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`[Explorer] Success! Report and screenshots saved to: ${outDir}`);

  } catch (error: any) {
    console.error(`[Explorer] Error during exploration:`, error.message);
  } finally {
    await browser.close();
  }
}

runExplorer();

import { test, expect } from '@playwright/test';
import { ReportQualityEvaluator } from '../scripts/validate-report';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Report Quality Validation', () => {
  test('ReportQualityEvaluator detects excessive filler language', () => {
    const badReport = `
# Bad Report
The system was implemented cleanly and elegantly. Everything works smoothly securely natively intelligently and flawlessly.
It seamlessly connects gracefully and optimally.
    `;
    const result = ReportQualityEvaluator.validate(badReport);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('Filler language exceeds threshold'))).toBe(true);
    expect(result.errors.some(e => e.includes('Detected repetitive adverb chains'))).toBe(true);
  });

  test('ReportQualityEvaluator accepts factual engineering reports', () => {
    const goodReport = `
# Phase Fix Report
## Exact Files Modified
\`config/page-role.ts\`
Added semantic page role models to govern section densities.

## Testing
Playwright: PASS — 104/104 tests
TypeScript compilation completed with 0 errors.

## Formal Completion Status
Lint: PASS
TypeScript: PASS
Build: PASS
    `;
    const result = ReportQualityEvaluator.validate(goodReport);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  // Example test that would validate a generated report file if provided
  // In a real pipeline, the filepath would be passed as an environment variable
  test('Generated report meets quality standards', () => {
    const reportPath = process.env.TEST_REPORT_PATH;
    if (!reportPath) {
      test.skip();
      return;
    }

    const fullPath = path.resolve(process.cwd(), reportPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Report file not found at ${fullPath}`);
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    const result = ReportQualityEvaluator.validate(content);
    
    if (!result.valid) {
      console.error('Report Quality Errors:', result.errors);
    }
    
    expect(result.valid).toBe(true);
  });
});

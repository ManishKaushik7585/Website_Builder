import * as fs from 'fs';
import * as path from 'path';

export interface ReportQuality {
  factuality: number;
  evidenceCoverage: number;
  fillerRatio: number;
  repetitionScore: number;
  completeness: number;
}

const BANNED_ADVERBS = [
  'cleanly', 'safely', 'smoothly', 'intelligently', 'elegantly', 'seamlessly', 'reliably', 
  'efficiently', 'optimally', 'gracefully', 'confidently', 'correctly', 'successfully', 
  'natively', 'dynamically', 'securely', 'flawlessly', 'smartly', 'sensibly', 'rationally', 
  'wisely', 'properly', 'effectively', 'beautifully', 'perfectly', 'effortlessly', 
  'comfortably', 'intuitively', 'explicitly', 'robustly', 'comprehensively', 'accurately'
];

export class ReportQualityEvaluator {
  private static MAX_GENERIC_ADVERB_RATIO = 0.02;

  static evaluate(markdownContent: string): ReportQuality {
    const tokens = markdownContent.toLowerCase().split(/\s+/);
    const totalWords = tokens.length;
    if (totalWords === 0) return { factuality: 0, evidenceCoverage: 0, fillerRatio: 0, repetitionScore: 0, completeness: 0 };

    let fillerCount = 0;
    let evidenceCount = 0;

    // Detect file paths and test numbers as evidence
    const codeBlocksAndPaths = markdownContent.match(/`[^`]+`/g) || [];
    const testResults = markdownContent.match(/\d+\/\d+ tests|PASS|FAIL/g) || [];
    evidenceCount = codeBlocksAndPaths.length + testResults.length;

    // Repetition check for sequences of adverbs
    let repetitionScore = 0;
    const adverbSequenceMatches = markdownContent.match(/(?:[a-z]+ly[\s,]+){2,}[a-z]+ly/gi) || [];
    repetitionScore = adverbSequenceMatches.length;

    for (const token of tokens) {
      // Strip punctuation
      const cleanToken = token.replace(/[.,:;!?()"`']/g, '');
      if (BANNED_ADVERBS.includes(cleanToken)) {
        fillerCount++;
      }
    }

    const fillerRatio = totalWords > 0 ? fillerCount / totalWords : 0;
    
    // Factuality is a generic heuristic: lower filler and higher evidence = higher factuality
    const factuality = Math.max(0, 100 - (fillerRatio * 1000) + (evidenceCount > 5 ? 10 : 0));
    
    const evidenceCoverage = evidenceCount > 10 ? 100 : evidenceCount * 10;
    
    const completeness = markdownContent.includes('Formal Completion Status') ? 100 : 50;

    return {
      factuality,
      evidenceCoverage,
      fillerRatio,
      repetitionScore,
      completeness
    };
  }

  static validate(markdownContent: string): { valid: boolean; errors: string[] } {
    const quality = this.evaluate(markdownContent);
    const errors: string[] = [];

    if (quality.fillerRatio > this.MAX_GENERIC_ADVERB_RATIO) {
      errors.push(`Filler language exceeds threshold. Ratio: ${quality.fillerRatio.toFixed(3)} (Max: ${this.MAX_GENERIC_ADVERB_RATIO})`);
    }

    if (quality.repetitionScore > 0) {
      errors.push(`Detected repetitive adverb chains (e.g. cleanly, smoothly, successfully). Count: ${quality.repetitionScore}`);
    }

    if (quality.evidenceCoverage < 20) {
      errors.push(`Insufficient evidence. Use concrete file paths, metrics, or test counts.`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// CLI execution
const isMain = typeof process !== 'undefined' && process.argv && process.argv[1] ? process.argv[1].includes('validate-report.ts') : false;

if (isMain) {
  const targetFile = process.argv[2];
  if (!targetFile) {
    console.error('Usage: ts-node validate-report.ts <path-to-markdown-file>');
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), targetFile);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const result = ReportQualityEvaluator.validate(content);

  console.log('--- Report Quality Validation ---');
  const quality = ReportQualityEvaluator.evaluate(content);
  console.log(JSON.stringify(quality, null, 2));

  if (!result.valid) {
    console.error('\nVALIDATION FAILED:');
    result.errors.forEach(e => console.error(`- ${e}`));
    process.exit(1);
  } else {
    console.log('\nVALIDATION PASSED');
    process.exit(0);
  }
}

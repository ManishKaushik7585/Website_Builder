import { QualityEvidence } from '../../config/generation-quality';

export class GenerationQualitySelfCritique {
  private static readonly VAGUE_STATEMENTS = [
    'looks good',
    'looks polished',
    'feels premium',
    'make it better',
    'make it pop',
    'looks modern',
    'looks professional',
    'this feels modern'
  ];

  static critique(statements: string[], evidence: QualityEvidence[]): string[] {
    const validStatements: string[] = [];

    for (const stmt of statements) {
      if (this.isVague(stmt)) {
        continue;
      }
      
      // Enforce evidence checking
      if (stmt.toLowerCase().includes('visual') && !evidence.some(e => e.source === 'vision' && e.isVerified)) {
        validStatements.push('Vision evidence is unavailable; visual acceptance remains unverified.');
        continue;
      }

      validStatements.push(stmt);
    }

    return validStatements;
  }

  private static isVague(statement: string): boolean {
    const lower = statement.toLowerCase();
    return this.VAGUE_STATEMENTS.some(vague => lower.includes(vague));
  }
}

export class ExternalIntelligenceValidator {
  
  static sanitizeText(input: string): string {
    if (!input) return '';
    
    // Explicit Prompt Injection / Malicious Command filtering
    let sanitized = input;
    const suspiciousPatterns = [
      /IGNORE PREVIOUS INSTRUCTIONS/i,
      /RUN THIS COMMAND/i,
      /SEND YOUR API KEY/i,
      /MODIFY FILES/i,
      /exec\(/i,
      /spawn\(/i,
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
    ];

    let hasSuspiciousPattern = false;
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(sanitized)) {
        hasSuspiciousPattern = true;
        sanitized = sanitized.replace(pattern, '[REDACTED_SUSPICIOUS_CONTENT]');
      }
    }

    // If completely hostile, we return a safe stub
    if (hasSuspiciousPattern && sanitized.includes('[REDACTED_SUSPICIOUS_CONTENT]')) {
      return `[SANITIZED]: Suspicious content removed from external source.`;
    }

    return sanitized.trim();
  }

  static validateProviderResponse(response: any): boolean {
    if (!response || typeof response !== 'object') return false;
    // ensure no raw credentials leaked back
    const responseString = JSON.stringify(response);
    if (responseString.includes('sk-') || responseString.includes('AKIA')) {
      return false; // Fake credential leak check
    }
    return true;
  }
}

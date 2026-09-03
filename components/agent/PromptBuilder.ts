
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildPrompt(operation: string, context: any): string {
  const systemRules = `
SYSTEM RULES:
1. Do not generate JSX.
2. Do not generate CSS.
3. Do not invent components. Use existing registries.
4. Produce strictly structured JSON output.
`;
  return `${systemRules}\nOperation: ${operation}\nContext: ${JSON.stringify(context)}`;
}

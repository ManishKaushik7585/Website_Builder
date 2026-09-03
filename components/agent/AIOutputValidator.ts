
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function validateOutput<T>(output: any, schemaDefinition: any): T {
  if (!output || typeof output !== 'object') {
    throw new Error('AI_INVALID_OUTPUT: Invalid output format');
  }
  
  const outputStr = JSON.stringify(output);
  if (outputStr.includes('<div') || outputStr.includes('className=')) {
    throw new Error('AI_SECURITY_REJECTION: JSX output detected');
  }
  if (outputStr.includes('margin:') || outputStr.includes('padding:')) {
    throw new Error('AI_SECURITY_REJECTION: CSS block detected');
  }
  if (outputStr.includes('npm install') || outputStr.includes('rm -rf')) {
    throw new Error('AI_SECURITY_REJECTION: Shell command detected');
  }

  return output as T;
}

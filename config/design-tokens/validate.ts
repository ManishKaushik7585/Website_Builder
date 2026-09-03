import { tokens } from './index';

let hasError = false;

function validateTokens() {
  console.log('Validating Design Tokens...');
  
  const allPrimitives = new Set<string>();
  const allSemantics = new Map<string, string>();
  const seenKeys = new Set<string>();
  
  for (const [key, category] of Object.entries(tokens)) {
    const isPrimitive = key.startsWith('primitive');
    const isSemantic = key.startsWith('semantic');
    const isComponent = key.startsWith('component');
    
    if (!isPrimitive && !isSemantic && !isComponent) {
      console.error(`Unknown token category: ${key}. Must start with primitive, semantic, or component.`);
      hasError = true;
      continue;
    }

    for (const [tokenName, tokenValue] of Object.entries(category as Record<string, string>)) {
      // Duplicate Key check across all tokens (e.g. avoiding naming collisions if merged)
      const globalKey = `${key}.${tokenName}`;
      if (seenKeys.has(globalKey)) {
        console.error(`Duplicate key detected: ${globalKey}`);
        hasError = true;
      }
      seenKeys.add(globalKey);

      // Invalid value check
      if (typeof tokenValue !== 'string' || tokenValue.trim() === '') {
        console.error(`Invalid value for token ${globalKey}: must be a non-empty string.`);
        hasError = true;
      }

      if (isPrimitive) {
        allPrimitives.add(tokenValue);
      }
      
      if (isSemantic) {
        allSemantics.set(globalKey, tokenValue);
        // Naming check: must be camelCase
        if (!/^[a-z]+([A-Z][a-z0-9]+)*$/.test(tokenName)) {
          console.error(`Invalid semantic name: ${tokenName} in ${key}. Must be camelCase.`);
          hasError = true;
        }
      }
    }
  }

  // Hierarchy & Orphan Check
  // Ensure every semantic token value strictly comes from a primitive token value.
  for (const [name, value] of allSemantics.entries()) {
    if (!allPrimitives.has(value)) {
      console.error(`Hierarchy Violation / Orphan Reference: Semantic token '${name}' has value '${value}' which is not defined in the Primitive layer. (Semantic tokens must reference primitives directly).`);
      hasError = true;
    }
  }

  if (hasError) {
    console.error('Validation FAILED.');
    process.exit(1);
  } else {
    console.log('Validation PASSED. All tokens conform to strict hierarchy and naming rules.');
  }
}

validateTokens();


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safelyRecoverState(currentState: any, lastValidState: any): any {
  return lastValidState || { error: 'Complete failure' };
}

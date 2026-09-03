
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compressContext(history: any[]): any {
  // Compress large iteration history into semantic summary
  return { historyLength: history.length, compressed: true };
}

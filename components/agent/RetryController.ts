
export async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await operation();
    } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      attempt++;
      if (attempt >= maxRetries) throw e;
    }
  }
  throw new Error('Max retries exceeded');
}

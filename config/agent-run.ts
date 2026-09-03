
export interface AgentRunLog {
  runId: string;
  provider: string;
  operation: string;
  timestamp: string;
  tokenUsage: number;
  status: 'success' | 'failure';
}


export interface AgentTool {
  id: string;
  description: string;
  inputSchema: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  outputSchema: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  permissionBoundary: 'safe' | 'human_approval' | 'forbidden';
}

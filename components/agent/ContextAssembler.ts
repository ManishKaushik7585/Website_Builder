
import { AgentContext } from '@/config/agent-context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assembleContext(rawState: any, operationType: string): AgentContext {
  // Compress and select based on operation
  return {
    brief: rawState.brief,
    currentPlan: operationType === 'refinement' ? rawState.currentPlan : undefined
  };
}

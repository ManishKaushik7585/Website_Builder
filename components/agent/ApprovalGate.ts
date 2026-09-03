
import { ApprovalRequest } from '@/config/agent-approval';

export function checkApproval(request: ApprovalRequest): boolean {
  if (request.action === 'deploy') return false; // Default safe
  return true;
}

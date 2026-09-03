
export interface ApprovalRequest {
  action: string;
  reason: string;
  metadata?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  status: 'pending' | 'approved' | 'rejected';
}

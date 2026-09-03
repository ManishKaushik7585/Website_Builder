
export interface AutonomousOverride {
  action: 'approve' | 'reject' | 'force_stop' | 'force_retry' | 'lock_config' | 'ignore_observation';
  targetId?: string;
  reason: string;
}

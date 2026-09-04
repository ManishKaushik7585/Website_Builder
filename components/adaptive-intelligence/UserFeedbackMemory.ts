/* eslint-disable @typescript-eslint/no-explicit-any */
import { KnowledgeCandidate, KnowledgeStatus } from '../../config/adaptive-intelligence';
import { LearningConfidenceEngine } from './LearningConfidence';

export type UserFeedbackType = 'approved' | 'rejected' | 'preferred' | 'disliked' | 'requested';

export interface StructuredUserFeedback {
  projectId: string;
  feedbackType: UserFeedbackType;
  subject: string;
  context?: any;
}

export class UserFeedbackMemory {
  static createFeedbackCandidate(feedback: StructuredUserFeedback): KnowledgeCandidate {
    
    const statement = this.generateStatement(feedback);

    const evidence = [{
      source: 'user_feedback' as const,
      sourceId: `uf-${Date.now()}`,
      timestamp: new Date().toISOString(),
      outcome: (feedback.feedbackType === 'approved' || feedback.feedbackType === 'preferred') ? 'success' as const : 'failure' as const,
      confidence: 'very_high' as const,
      supportingObservations: [`User explicitly marked ${feedback.subject} as ${feedback.feedbackType}`],
      projectContext: { projectId: feedback.projectId, ...feedback.context },
      provenance: { userFeedback: true },
      evidenceType: 'CONFIRMED' as const
    }];

    // User feedback is immediately high confidence
    const confidence = LearningConfidenceEngine.calculateConfidence(1, 0, 1, 'high');

    return {
      id: `ufm-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type: 'user_preference',
      scope: 'project',
      statement,
      evidence,
      confidence: 'very_high', // Direct override for explicit user input
      status: 'candidate' as KnowledgeStatus,
      provenance: { generator: 'UserFeedbackMemory' },
      createdAt: new Date().toISOString(),
      lastValidatedAt: new Date().toISOString()
    };
  }

  private static generateStatement(feedback: StructuredUserFeedback): string {
    switch (feedback.feedbackType) {
      case 'approved':
        return `User approved of ${feedback.subject}.`;
      case 'rejected':
        return `User rejected ${feedback.subject}.`;
      case 'preferred':
        return `User expressed a preference for ${feedback.subject}.`;
      case 'disliked':
        return `User explicitly disliked ${feedback.subject}.`;
      case 'requested':
        return `User explicitly requested ${feedback.subject}.`;
      default:
        return `User provided feedback regarding ${feedback.subject}.`;
    }
  }
}

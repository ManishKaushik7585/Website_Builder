
import { BrowserObservation } from '@/config/browser-intelligence';
import { QAObservation } from '@/config/qa';

export function mapBrowserToQA(browserObs: BrowserObservation[]): QAObservation[] {
  return browserObs.map((obs, index) => ({
    id: `browser-obs-${index}`,
    category: obs.category === 'overflow' ? 'responsive' : obs.category === 'typography' ? 'typography' : 'layout',
    severity: obs.severity,
    target: obs.elementId || 'document',
    description: obs.description,
    confidence: 0.95
  }));
}

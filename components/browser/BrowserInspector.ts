
import { BrowserSnapshot, BrowserObservation } from '@/config/browser-intelligence';

export function inspectDocument(snapshot: BrowserSnapshot): BrowserObservation[] {
  const observations: BrowserObservation[] = [];
  
  // 1. Global Overflow Detection
  const hasGlobalOverflow = snapshot.elements.some(e => e.isOverflowingHorizontal);
  if (hasGlobalOverflow) {
    observations.push({
      category: 'overflow',
      severity: 'critical',
      description: 'Horizontal overflow detected in document.'
    });
  }

  // 2. Element Overflow Detection
  snapshot.elements.forEach(el => {
    if (el.scrollWidth > el.clientWidth) {
      observations.push({
        elementId: el.id || el.testId,
        category: 'overflow',
        severity: 'critical',
        description: `Horizontal overflow detected in element ${el.id || el.testId}`
      });
    }
  });

  // 3. Section Height Analysis
  snapshot.elements.filter(e => e.sectionRole).forEach(section => {
    if (section.bounds.height > snapshot.viewport.height * 2) {
      observations.push({
        elementId: section.id || section.testId,
        category: 'layout',
        severity: 'moderate',
        description: `Section ${section.id} is excessively tall (${section.bounds.height}px)`
      });
    }
  });

  return [...snapshot.observations, ...observations];
}


import { BrowserInspection, BrowserObservation } from '@/config/browser-intelligence';

export function compareViewports(inspection: BrowserInspection): BrowserObservation[] {
  const observations: BrowserObservation[] = [];
  
  if (inspection.snapshots['1440'] && inspection.snapshots['375']) {
    const desktop = inspection.snapshots['1440'];
    const mobile = inspection.snapshots['375'];
    
    // Example comparison logic
    if (mobile.elements.some(e => e.isOverflowingHorizontal) && !desktop.elements.some(e => e.isOverflowingHorizontal)) {
      observations.push({
        category: 'responsive',
        severity: 'critical',
        description: 'Mobile breakpoint introduces horizontal overflow not present on desktop.'
      });
    }
  }

  return observations;
}

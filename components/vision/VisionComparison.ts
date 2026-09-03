
import { VisionObservation } from '@/config/vision';

export function compareViewportObservations(desktop: VisionObservation[], mobile: VisionObservation[]) {
  const mobileOnly = mobile.filter(m => !desktop.some(d => d.id === m.id));
  const desktopOnly = desktop.filter(d => !mobile.some(m => m.id === d.id));
  const crossViewport = desktop.filter(d => mobile.some(m => m.id === d.id));
  
  return { desktopOnly, mobileOnly, crossViewport };
}

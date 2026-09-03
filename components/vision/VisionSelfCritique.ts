
import { VisionObservation } from '@/config/vision';

export function critiqueVisionObservations(obs: VisionObservation[]): VisionObservation[] {
  // Filter out slop like "make it pop"
  return obs.filter(o => !o.description.toLowerCase().includes('make it pop') && !o.description.toLowerCase().includes('add a gradient'));
}

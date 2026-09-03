
export interface BrowserViewport {
  width: number;
  height: number;
}

export interface BrowserBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface BrowserComputedStyle {
  fontSize: string;
  lineHeight: string;
  margin: string;
  padding: string;
  gap: string;
  display: string;
  visibility: string;
  color: string;
  backgroundColor: string;
  opacity: string;
  borderRadius: string;
  zIndex: string;
}

export interface BrowserElement {
  id?: string;
  testId?: string;
  sectionRole?: string;
  patternRole?: string;
  bounds: BrowserBounds;
  style: BrowserComputedStyle;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
  isOverflowingHorizontal: boolean;
  isOverflowingVertical: boolean;
}

export interface BrowserMetric {
  name: string;
  value: number;
}

export interface BrowserObservation {
  elementId?: string;
  category: 'layout' | 'typography' | 'spacing' | 'responsive' | 'overflow' | 'alignment';
  severity: 'info' | 'minor' | 'moderate' | 'major' | 'critical';
  description: string;
}

export interface BrowserSnapshot {
  viewport: BrowserViewport;
  url: string;
  timestamp?: string;
  elements: BrowserElement[];
  metrics: BrowserMetric[];
  observations: BrowserObservation[];
}

export interface BrowserInspection {
  snapshots: Record<string, BrowserSnapshot>; // keyed by viewport width e.g., '1440', '375'
}

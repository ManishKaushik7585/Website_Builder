
export interface GenerationOutput {
  planId: string;
  sections: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface VisionOutput {
  issues: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface QAOutput {
  observations: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface RefinementOutput {
  refinements: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

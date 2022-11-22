
export interface PipelineStepBase {
  displayName?: string;
}

export interface PipelineScriptStep extends PipelineStepBase {
  script: string;
  env?: Record<string, string>;
  displayName?: string;
}

export function isScriptStep(step : PipelineStepBase) : step is PipelineScriptStep {
  return (step as any).script !== undefined;
}

export interface PipelinePublishArtifactStep extends PipelineStepBase {
  publishPath: string;
  artifactName: string;
}

export function isPublishArtifactStep(step : PipelineStepBase) : step is PipelinePublishArtifactStep {
  return (step as any).publishPath !== undefined;
}

export interface PipelineDownloadArtifactStep extends PipelineStepBase {
  downloadPath: string;
  artifactName: string;
}

export function isDownloadArtifactStep(step : PipelineStepBase) : step is PipelineDownloadArtifactStep {
  return (step as any).downloadPath !== undefined;
}

export type PipelineStep = PipelineScriptStep | PipelinePublishArtifactStep | PipelineDownloadArtifactStep;

export interface PipelineStepList {
  addStep(step: PipelineStep) : void;
}

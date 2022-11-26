import { isDownloadArtifactStep, isPublishArtifactStep, isScriptStep, PipelineGenericStep, PipelineStepList } from "../pipeline";
import { AzureDevops } from "./azure-devops-schema";

export class AzureDevopsPipelineStepList implements PipelineStepList {
  steps : AzureDevops.Step[] = [];

  addGenericStep(step: PipelineGenericStep): void {
    if (isScriptStep(step)) {
      this.steps.push({
        script: step.script,
        env: step.env,
        displayName: step.displayName,
      } as AzureDevops.StepScript)
    } else if (isPublishArtifactStep(step)) {
      this.steps.push({
        publish: step.publishPath,
        artifact: step.artifactName,
        displayName: step.displayName,
      } as AzureDevops.StepPublish)
    } else if (isDownloadArtifactStep(step)) {
      this.steps.push({
        download: step.downloadPath,
        artifact: step.artifactName,
        displayName: step.displayName,
      } as AzureDevops.StepDownload)
    } else {
      console.log('Unknown step type', step);
    }
  }
}

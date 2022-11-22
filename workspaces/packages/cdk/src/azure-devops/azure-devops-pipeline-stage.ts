import { AzureDevops } from "./azure-devops-schema";
import { isDownloadArtifactStep, isPublishArtifactStep, isScriptStep, StageOptions } from "../pipeline";
import { PipelineStage, PipelineStep, PipelineStepList } from "../pipeline";
import { BaseComponent, Component } from "@project-gen/core";

class AzureDevopsPipelineStepList implements PipelineStepList {
  steps : AzureDevops.Step[] = [];

  addStep(step: PipelineStep): void {
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

export abstract class AzureDevopsPipelineStage extends Component implements PipelineStage {

  rawStage: AzureDevops.StageType;
  abstract rawJob: AzureDevops.Job;
  abstract stepsEntry: AzureDevops.Step[];

  setup = new AzureDevopsPipelineStepList();
  preExecute = new AzureDevopsPipelineStepList();
  execute = new AzureDevopsPipelineStepList();
  postExecute = new AzureDevopsPipelineStepList();
  tearDown = new AzureDevopsPipelineStepList();

  allSteps() {
    return [
      ...this.setup.steps,
      ...this.preExecute.steps,
      ...this.execute.steps,
      ...this.postExecute.steps,
      ...this.tearDown.steps
    ];
  }

  constructor(parent: BaseComponent, public name: string, public stageOptions: StageOptions) {
    super(parent, name);
    this.rawStage = {
      stage: this.name,
      dependsOn: this.stageOptions?.depends,
      jobs: []
    }
  }

  async synthesize(): Promise<void> {
    this.rawStage.jobs = [this.rawJob];
    this.stepsEntry.push(...this.allSteps());
  }
}

export class AzureDevopsPipelineBuildStage extends AzureDevopsPipelineStage {
  rawJob: AzureDevops.JobBuild;
  stepsEntry: AzureDevops.Step[];

  constructor(parent: BaseComponent, public name: string, public stageOptions: StageOptions) {
    super(parent, name, stageOptions);

    this.rawJob = {
      job: name,
      steps: [],
    }

    this.stepsEntry = this.rawJob.steps;
  }

}

export class AzureDevopsPipelineDeploymentStage extends AzureDevopsPipelineStage {
  rawJob: AzureDevops.JobDeployment;
  stepsEntry: AzureDevops.Step[];

  constructor(parent: BaseComponent, public name: string, public stageOptions: StageOptions) {
    super(parent, name, stageOptions);

    this.rawJob = {
      deployment: this.name,
      environment: this.stageOptions?.stageEnvironment,
      strategy: {
        runOnce: {
          deploy: {
            steps: []
          }
        }
      }
    }
    this.stepsEntry = (this.rawJob as any).strategy.runOnce.deploy.steps;
  }
}
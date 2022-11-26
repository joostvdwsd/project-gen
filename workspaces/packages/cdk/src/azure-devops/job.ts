import { BaseComponent, Component } from "@project-gen/core";
import { PipelineStage } from "../pipeline";
import { AzureDevopsVariableHolder } from "./azure-devops-pipeline-variable";
import { AzureDevops } from "./azure-devops-schema";
import { azureDevopsSafeName } from "./azure-devops-utils";
import { AzureDevopsPipelineStepList } from "./steplist";

export type InitBuildJobProps = Partial<Omit<AzureDevops.JobBuild, 'job' | 'strategy' | 'variables'>>;
export type InitDeploymentJobProps = Partial<Omit<AzureDevops.JobDeployment, 'deployment' | 'strategy'>>;

export interface BaseJob extends PipelineStage {
  raw: AzureDevops.Job;

  setup : AzureDevopsPipelineStepList;
  preExecute : AzureDevopsPipelineStepList;
  execute : AzureDevopsPipelineStepList;
  postExecute : AzureDevopsPipelineStepList;
  tearDown : AzureDevopsPipelineStepList;

  variables: AzureDevops.VariableItem[];
}

export class AzureDevopsBuildJob extends Component implements BaseJob, PipelineStage, AzureDevopsVariableHolder {
  raw: AzureDevops.JobBuild;

  setup = new AzureDevopsPipelineStepList();
  preExecute = new AzureDevopsPipelineStepList();
  execute = new AzureDevopsPipelineStepList();
  postExecute = new AzureDevopsPipelineStepList();
  tearDown = new AzureDevopsPipelineStepList();

  variables: AzureDevops.VariableItem[] = [];

  private steps: AzureDevops.Step[];

  private allSteps() {
    return [
      ...this.setup.steps,
      ...this.preExecute.steps,
      ...this.execute.steps,
      ...this.postExecute.steps,
      ...this.tearDown.steps
    ];
  }

  constructor(parent: BaseComponent, public readonly name: string, props?: InitBuildJobProps) {
    super(parent);

    this.steps = [];

    this.raw = {
      job: azureDevopsSafeName(name),
      variables: this.variables,
      ...props,
      steps: this.steps,
    }
  }

  async preSynthesize(): Promise<void> {
    this.steps.push(...this.allSteps());
    await super.preSynthesize();
  }
}


export class AzureDevopsDeploymentJob extends Component implements BaseJob, PipelineStage, AzureDevopsVariableHolder {
  raw: AzureDevops.JobDeployment<AzureDevops.JobDeploymentStrategyRunOnce>;

  setup = new AzureDevopsPipelineStepList();
  preExecute = new AzureDevopsPipelineStepList();
  execute = new AzureDevopsPipelineStepList();
  postExecute = new AzureDevopsPipelineStepList();
  tearDown = new AzureDevopsPipelineStepList();

  variables: AzureDevops.VariableItem[] = [];
  private steps: AzureDevops.Step[];

  environment?: string;

  private allSteps() {
    return [
      ...this.setup.steps,
      ...this.preExecute.steps,
      ...this.execute.steps,
      ...this.postExecute.steps,
      ...this.tearDown.steps
    ];
  }

  constructor(parent: BaseComponent, public readonly name: string, props?: InitDeploymentJobProps) {
    super(parent);

    this.steps = [];

    this.raw = {
      deployment: azureDevopsSafeName(name),
      variables: this.variables,
      ...props,
      strategy: {
        runOnce: {
          deploy: {
            steps: this.steps
          }
        }
      }
    }
  }

  async preSynthesize(): Promise<void> {
    this.steps.push(...this.allSteps());
    await super.preSynthesize();
  }
}
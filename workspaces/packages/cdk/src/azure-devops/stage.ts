import { AzureDevops } from "./azure-devops-schema";
import { StageOptions } from "../pipeline";
import { BaseComponent, Component } from "@project-gen/core";
import { azureDevopsSafeName, azureSafeDependsOn } from "./azure-devops-utils";
import { BaseJob } from "./job";

export type InitStageProps = Partial<Omit<AzureDevops.Stage, 'stage' | 'jobs'>>;

export class AzureDevopsPipelineStage extends Component {

  raw: AzureDevops.StageType;
  rawJobs: AzureDevops.Job[];
  jobs: BaseJob[] = [];

  constructor(parent: BaseComponent, public name: string, public stageOptions?: StageOptions, initStageProps?: InitStageProps) {
    super(parent);
    this.rawJobs = [];
    this.raw = {
      stage: azureDevopsSafeName(this.name),
      ...initStageProps,
      dependsOn: azureSafeDependsOn(this.stageOptions?.depends),
      jobs: this.rawJobs
    }
  }

  addJob(job: BaseJob) {
    this.jobs.push(job);
    this.rawJobs.push(job.raw);
  }
}

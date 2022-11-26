import { YamlFile } from "@project-gen/core/src/files/yaml";
import { AzureDevopsPipelineStage, InitStageProps } from "./stage";
import { AzureDevops } from "./azure-devops-schema";
import { PipelineBuilder, PipelineStage, StageOptions } from "../pipeline";
import { BaseComponent } from "@project-gen/core";
import { AzureDevopsVariableHolder } from "./azure-devops-pipeline-variable";
import { AzureDevopsBuildJob, AzureDevopsDeploymentJob, BaseJob, InitBuildJobProps, InitDeploymentJobProps } from "./job";

export interface AzureDevopsPipelineProps {
  /**
   * Filename of the pipeline.
   * @default azure-pipeline.yaml
   */
  fileName?: string;

  pipelineProps?: Partial<Omit<AzureDevops.PipelineStages, 'variables' | 'stages'>>;
  stageProps?: InitStageProps;
  buildJobProps?: InitBuildJobProps;
  deploymentJobProps?: InitDeploymentJobProps;
}

export class AzureDevopsPipeline extends PipelineBuilder implements AzureDevopsVariableHolder {
  raw: AzureDevops.PipelineStages;

  yamlFile : YamlFile;

  stages: Record<string, AzureDevopsPipelineStage> = {};
  variables: AzureDevops.VariableItem[] = [];

  private initStageProps?: InitStageProps;
  private initBuildJobProps?: InitBuildJobProps;
  private initDeploymentJobProps?: InitDeploymentJobProps;

  constructor(parent: BaseComponent, props?: AzureDevopsPipelineProps) {
    super(parent);

    this.yamlFile = new YamlFile(this, {
      path: [ props?.fileName ?? 'azure-pipeline.yaml'],
      object: () => {
        return this.raw
      }
    });

    this.initStageProps = props?.stageProps;
    this.initBuildJobProps = props?.buildJobProps;
    this.initDeploymentJobProps = props?.deploymentJobProps;

    this.raw = {
      ...props?.pipelineProps,
      variables: this.variables,
      stages: [],
    }
  }

  // addStage(_name: string, _stageOptions?: StageOptions) : PipelineStage<AzureDevopsPipelineStepList> {
  // }

  addStage(name: string, stageOptions?: StageOptions): PipelineStage {
    const stage = new AzureDevopsPipelineStage(this, name, stageOptions, this.initStageProps);

    this.stages[name] = stage;

    let job : BaseJob;

    if (stageOptions?.environment) {
      job = new AzureDevopsDeploymentJob(this, name, this.initDeploymentJobProps);
      (job as AzureDevopsDeploymentJob).environment = stageOptions?.environment;
    } else {
      job = new AzureDevopsBuildJob(this, name, this.initBuildJobProps);
    }

    stage.addJob(job);

    this.raw.stages.push(stage.raw);

    return job;
  }
}
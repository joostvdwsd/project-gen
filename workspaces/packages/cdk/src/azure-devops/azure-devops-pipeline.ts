import { YamlFile } from "@project-gen/core/src/files/yaml";
import { AzureDevopsPipelineBuildStage, AzureDevopsPipelineDeploymentStage, AzureDevopsPipelineStage } from "./azure-devops-pipeline-stage";
import { AzureDevops } from "./azure-devops-schema";
import { Pipeline, PipelineStage, StageOptions } from "../pipeline";
import { RootComponent } from "@project-gen/core";
import { AzureDevopsVariableHolder } from "./azure-devops-pipeline-variable";

export interface AzureDevopsPipelineProps {
  /**
   * Filename of the pipeline.
   * @default azure-pipeline.yaml
   */
  fileName?: string;
}

export class AzureDevopsPipeline extends Pipeline implements AzureDevopsVariableHolder {
  raw: AzureDevops.PipelineStages;

  yamlFile : YamlFile;

  stages: Record<string, AzureDevopsPipelineStage> = {};
  variables: AzureDevops.VariableItem[] = [];

  constructor(parent: RootComponent, props?: AzureDevopsPipelineProps) {
    super(parent);

    this.yamlFile = new YamlFile(this, 'azure-pipeline.yaml', {
      path: [ props?.fileName ?? 'azure-pipeline.yaml'],
      object: () => {
        return this.raw
      }
    });

    this.raw = {
      variables: this.variables,
      stages: [],
    }
  }

  addStage(name: string, stageOptions?: StageOptions): PipelineStage {
    if (stageOptions?.stageEnvironment) {
      this.stages[name] = new AzureDevopsPipelineDeploymentStage(this, name, stageOptions);
    } else {
      this.stages[name] = new AzureDevopsPipelineBuildStage(this, name, stageOptions ?? {});
    }

    this.raw.stages.push(this.stages[name].rawStage);

    return this.stages[name];
  }
}
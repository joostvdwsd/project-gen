import { Component } from "@project-gen/core";
import { PipelineBuilder } from "./pipeline";
import { PipelineVariable } from "./pipeline/pipeline-variable";
import { Environments } from "./environments";

export class CdkPipeline extends Component {

  public readonly parameters: Record<string, Record<string, PipelineVariable>> = {};

  constructor(pipeline: PipelineBuilder) {
    super(pipeline);
  }

  addParameter(stage: string, name: string, variable: PipelineVariable) {
    if (!this.parameters[stage]) {
      this.parameters[stage] = {};
    }

    this.parameters[stage][name] = variable;
  }

  addDefaultParameter(name: string, variable: PipelineVariable) {
    this.addParameter('default', name, variable);
  }

  generate() {
    const pipeline = this.resolve(PipelineBuilder);
    const stages = this.find(Environments);

    const buildStage = pipeline.addStage('build');
    buildStage.execute.addGenericStep({
      script: 'cdk synth',
    });

    buildStage.postExecute.addGenericStep({
      publishPath: './cdk.out',
      artifactName: 'cdk.out'
    });

    if (stages) {
      stages.keys.forEach((stage) => {
        const diffStage = pipeline.addStage(`diff:${stage}`, {
          environment: stage,
        });

        diffStage.preExecute.addGenericStep({
          downloadPath: './cdk.out',
          artifactName: 'cdk.out'
        });

        diffStage.execute.addGenericStep({
          script: `cdk diff --app './cdk.out/assembly-${stage}'${this.renderParameters(stage)}`
        });

        const deployStage = pipeline.addStage(`deploy:${stage}`, {
          environment: stage
        });
        
        deployStage.preExecute.addGenericStep({
          downloadPath: './cdk.out',
          artifactName: 'cdk.out'
        });
        
        deployStage.execute.addGenericStep({
          script: `cdk deploy --app './cdk.out/assembly-${stage}' --require-approval never${this.renderParameters(stage)}`
        })
      })  
    } else {
      const diffStage = pipeline.addStage(`diff`, {
        environment: 'prod'
      });
      diffStage.execute.addGenericStep({
        script: `cdk diff --app './cdk.out/'${this.renderParameters('default')}`
      });

      const deployStage = pipeline.addStage(`deploy`, {
        environment: 'prod'
      });
      deployStage.execute.addGenericStep({
        script: `cdk deploy --app './cdk.out/' --require-approval never${this.renderParameters('default')}`
      })
    }
  } 

  private renderParameters(stage: string) {
    const parameters = this.parameters[stage];

    if (parameters) {
      return ' ' + Object.entries(parameters).map(([key, value]) => {
        if (typeof value === 'string') {
          return `--parameter ${key}=${value}`
        } else {
          return `--parameter ${key}=${value.renderEnvironmentVariable()}`
        }
      }).join(' ');
    }
    return '';
  }

  async preSynthesize() {
    await super.preSynthesize();
  }
}
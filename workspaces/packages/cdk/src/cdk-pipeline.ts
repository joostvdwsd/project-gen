import { SingletonComponent } from "@project-gen/core";
import { Pipeline } from "./pipeline";
import { PipelineVariable } from "./pipeline/pipeline-variable";
import { Stages } from "./stages";

export class CdkPipeline extends SingletonComponent {

  public readonly parameters: Record<string, Record<string, PipelineVariable>> = {};

  addParameter(stage: string, name: string, variable: PipelineVariable) {
    if (!this.parameters[stage]) {
      this.parameters[stage] = {};
    }

    this.parameters[stage][name] = variable;
  }

  addDefaultParameter(name: string, variable: PipelineVariable) {
    this.addParameter('default', name, variable);
  }

  async preSynthesize() {
    super.preSynthesize();
    const pipeline = this.resolve(Pipeline);
    const stages = this.find(Stages);

    const buildStage = pipeline.addStage('build');
    buildStage.execute.addStep({
      script: 'cdk synth',
    });

    buildStage.postExecute.addStep({
      publishPath: './cdk.out',
      artifactName: 'cdk.out'
    });

    if (stages) {
      stages.keys.forEach((stage) => {
        const diffStage = pipeline.addStage(`diff:${stage}`, {
          stageEnvironment: stage,
        });

        diffStage.preExecute.addStep({
          downloadPath: './cdk.out',
          artifactName: 'cdk.out'
        });

        diffStage.execute.addStep({
          script: `cdk diff --app './cdk.out/assembly-${stage}'${this.renderParameters(stage)}`
        });

        const deployStage = pipeline.addStage(`deploy:${stage}`, {
          stageEnvironment: stage
        });
        
        deployStage.preExecute.addStep({
          downloadPath: './cdk.out',
          artifactName: 'cdk.out'
        });
        
        deployStage.execute.addStep({
          script: `cdk deploy --app './cdk.out/assembly-${stage}' --require-approval never${this.renderParameters(stage)}`
        })
      })  
    } else {
      const diffStage = pipeline.addStage(`diff`, {
        stageEnvironment: 'diff'
      });
      diffStage.execute.addStep({
        script: `cdk diff --app './cdk.out/'${this.renderParameters('default')}`
      });

      const deployStage = pipeline.addStage(`deploy`, {
        stageEnvironment: 'prod'
      });
      deployStage.execute.addStep({
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
}
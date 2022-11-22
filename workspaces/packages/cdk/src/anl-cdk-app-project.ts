import { GitIgnore } from "@project-gen/core";
// import { SourceFile } from "@project-gen/core/src/files/sourcefile";
import { TypeScript } from "@project-gen/core/src/languages/typescript";
import { PackageJson } from "@project-gen/core/src/packageManagers/package-json";
// import { PackageJson } from "@project-gen/core/src/packageManagers/package-json";
import { Yarn } from "@project-gen/core/src/packageManagers/yarn";
import { Project, ProjectOptions } from "@project-gen/core/src/utils/project";
import { AzureDevopsPipeline } from "./azure-pipeline";
import { JobBuild, JobDeployment, StepCheckOut, StepDownload, StepPublish, StepScript } from "./azure-pipeline-schema";
import { Environment } from "./environment";

export class AnlCdkAppProject extends Project {
  constructor(options?: ProjectOptions) {
    super(options);

    this.addChild(new GitIgnore({
      patterns: [
        'lib'
      ]
    }));

    this.addChild(new Yarn());
    this.addChild(new TypeScript());

  //   this.addChild(new SourceFile(this, {
  //     path: ['src', 'index.ts'],
  //     source: `export {} 
  // console.log('%%name%%')`,
  //     templateVars: {
  //       name: `${this.resolve(PackageJson).raw.name}`
  //     }
  //   }))
  }

  async preSynthesize() {
    super.preSynthesize();
    const packageJson = this.resolve(PackageJson);
    const environment = this.find(Environment);
    const pipeline = this.find(AzureDevopsPipeline);

    if (pipeline) {
      pipeline.raw.stages.push({
        stage: 'build',
        displayName: 'Build cdk artifact',
        jobs: [this.buildJob()],
      })        
    }

    packageJson.addScript(`synth`, `cdk synth`);

    if (environment) {
      ['diff', 'deploy', 'destroy'].forEach((command) => {
        environment.keys.forEach((env) => {
          const scriptPostfix = env === environment.defaultEnvironment ? '' : `:${env}`;
          packageJson.addScript(`${command}${scriptPostfix}`, `cdk ${command} --app './cdk.out/assembly-${env}'`);
        })  
      });

      if (pipeline) {
        environment.keys.forEach((env) => {
          pipeline.raw.stages.push({
            stage: `deploy_${env}`,
            jobs: [this.deployJob(env)],
          })
        })
      }
    } else {
      ['diff', 'deploy', 'destroy'].forEach((command) => {
        packageJson.addScript(`${command}`, `cdk ${command} --app './cdk.out/'`);
      });
      if (pipeline) {
        pipeline.raw.stages.push({
          stage: `deploy`,
          jobs: [this.deployJob()],
        })
      }
    }
  }

  buildJob() : JobBuild {
    return {
      job: 'build',
      steps: [{
        checkout: 'self',
        lfs: true,
      } as StepCheckOut, {
        script: 'yarn synth',
        displayName: 'Synthesize CDK app'
      } as StepScript, {
        publish: 'cdk.out/',
        artifact: 'cdk.out'
      } as StepPublish]
    }
  }

  deployJob(environment?: string) : JobDeployment {
    const app = environment ? `cdk.out/assembly-${environment}` : 'cdk.out';

    return {
      deployment: `deploy_${environment}`,
      strategy: {
        runOnce: {
          deploy: {
            steps: [{
              download: 'cdk.out',
              artifact: 'cdk.out'
            } as StepDownload, {
              script: `npx aws-cdk deploy --app ${app}`
            } as StepScript],

          }
        }
      }
    }
  }

}
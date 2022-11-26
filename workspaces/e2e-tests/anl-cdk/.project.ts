import { AzureDevops, AzureDevopsPipeline, CdkPipeline, CdkRunScripts, Environments } from '@project-gen/cdk';
import { AzureDevopsGroupVariable } from '@project-gen/cdk/src/azure-devops/azure-devops-pipeline-variable';
import { AzureDevopsDeploymentJob } from '@project-gen/cdk/src/azure-devops/job';
import { Project } from '@project-gen/core';

class MyProject extends Project {
  constructor() {
    super();

    new Environments(this, [
      'dev',
      'test',
      'prod',
    ], 'dev');
    
    new CdkRunScripts(this);
    
    const pipeline = new AzureDevopsPipeline(this, {
      pipelineProps: {
        resources: {
          containers: [{
            container: 'node',
            image: 'nodejscontainer'
          }],
        }
      },
      buildJobProps: {
        container: 'node'
      },
      deploymentJobProps: {
        container: 'node'
      }
    });
    
    const cdkPipeline = new CdkPipeline(pipeline);
    
    cdkPipeline.addParameter('dev', 'test', new AzureDevopsGroupVariable(pipeline, 'aws-dev', 'SECRET_VALUE'));
    cdkPipeline.addParameter('prod', 'test', new AzureDevopsGroupVariable(pipeline, 'aws-prod', 'SECRET_VALUE'));
    cdkPipeline.generate();

    Object.values(pipeline.stages).forEach((stage) => {
      if (stage.jobs.length > 0) {
        const job = stage.jobs[0];
        console.log(job.name);
        if (job instanceof AzureDevopsDeploymentJob && job.environment) {
          if (['dev', 'test'].includes(job.environment)) {
            job.setup.steps.push({
              task: 'AssumeRoleTask',
              inputs: {
                ROLE_ARN: new AzureDevopsGroupVariable(job, 'aws-dev', 'AWS_ROLE_ARN').renderEnvironmentVariable(),
                EXTERNAL_ID: new AzureDevopsGroupVariable(job, 'aws-dev', 'AWS_EXTERNAL_ID').renderEnvironmentVariable(),
              }
            } as AzureDevops.StepTask)
          } else  {
            job.setup.steps.push({
              task: 'AssumeRoleTask',
              inputs: {
                ROLE_ARN: new AzureDevopsGroupVariable(job, 'aws-ops', 'AWS_ROLE_ARN').renderEnvironmentVariable(),
                EXTERNAL_ID: new AzureDevopsGroupVariable(job, 'aws-ops', 'AWS_EXTERNAL_ID').renderEnvironmentVariable(),
              }
            } as AzureDevops.StepTask)
          }
        }
      }
    });    
  }
}

new MyProject().runExit();

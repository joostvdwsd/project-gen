import { AzureDevopsPipeline, CdkPipeline, CdkRunScripts, Stages } from '@project-gen/cdk';
import { AzureDevopsGroupVariable } from '@project-gen/cdk/src/azure-devops/azure-devops-pipeline-variable';
import { Project } from '@project-gen/core';

const project = new Project();
new Stages(project, [
  'dev',
  'test',
  'prod',
], 'dev');

new CdkRunScripts(project);

const pipeline = new AzureDevopsPipeline(project);
const cdkPipeline = new CdkPipeline(project);

cdkPipeline.addParameter('dev', 'test', new AzureDevopsGroupVariable(pipeline, 'aws-dev', 'SECRET_VALUE'));
cdkPipeline.addParameter('prod', 'test', new AzureDevopsGroupVariable(pipeline, 'aws-prod', 'SECRET_VALUE'));

project.runExit();

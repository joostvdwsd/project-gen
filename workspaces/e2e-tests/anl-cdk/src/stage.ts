import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class EnvironmentStage extends Stage {  
  constructor(scope: Construct, environmentName: string, stageProps?: StageProps) {
    super(scope, environmentName, stageProps); 
  }
}
  
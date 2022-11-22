#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { EnvironmentStage } from './stage';
import { TestStack } from './stack';

const app = new App();

const devStage = new EnvironmentStage(app, 'dev', {
  env: {
    account: '665006764030',
    region: 'eu-west-1'
  }
});
const prodStage = new EnvironmentStage(app, 'prod', {
  env: {
    account: '665006764030',
    region: 'eu-west-1'
  }
});

new TestStack(devStage, 'stack');
new TestStack(prodStage, 'stack');

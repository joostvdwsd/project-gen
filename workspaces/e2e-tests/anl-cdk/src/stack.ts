import { Stack } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class TestStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Function(this, 'test-function', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromInline(`exports.handler = async () => {}`),
      handler: 'index.handler'
    })
  }
}
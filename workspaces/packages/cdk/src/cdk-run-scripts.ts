import { RootComponent, SingletonComponent } from "@project-gen/core";
import { PackageJson } from "@project-gen/core/src/packageManagers/package-json";
import { Environments } from "./environments";

/**
 * Generates conveniance scripts in package json for cdk development
 */
export class CdkRunScripts extends SingletonComponent {
  constructor(parent: RootComponent) {
    super(parent);
  }
  
  async preSynthesize() {
    super.preSynthesize();
    const packageJson = this.resolve(PackageJson);
    const stages = this.find(Environments);

    packageJson.addScript(`synth`, `cdk synth`);

    if (stages) {
      ['diff', 'deploy', 'destroy'].forEach((command) => {
        stages.keys.forEach((stage) => {
          const scriptPostfix = stage === stages.defaultStage ? '' : `:${stage}`;
          packageJson.addScript(`${command}${scriptPostfix}`, `cdk ${command} --app './cdk.out/assembly-${stage}'`);
        })  
      });
    } else {
      ['diff', 'deploy', 'destroy'].forEach((command) => {
        packageJson.addScript(`${command}`, `cdk ${command} --app './cdk.out/'`);
      });
    }
  }
}
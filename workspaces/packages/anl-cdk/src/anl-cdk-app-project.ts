import { GitIgnore } from "@project-gen/core";
// import { SourceFile } from "@project-gen/core/src/files/sourcefile";
import { TypeScript } from "@project-gen/core/src/languages/typescript";
import { PackageJson } from "@project-gen/core/src/packageManagers/package-json";
// import { PackageJson } from "@project-gen/core/src/packageManagers/package-json";
import { Yarn } from "@project-gen/core/src/packageManagers/yarn";
import { Project, ProjectOptions } from "@project-gen/core/src/utils/project";
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
    const environment = this.resolve(Environment);

    ['synth', 'diff', 'deploy', 'destroy'].forEach((command) => {
      environment.keys.forEach((env) => {
        const scriptPostfix = env === environment.defaultEnvironment ? '' : `:${env}`;
        packageJson.addScript(`${command}${scriptPostfix}`, `cdk ${command} -c environment=${env} -c @anl-cdk/core:deploy-environment=${env}`);
      })  
    })
  }

}
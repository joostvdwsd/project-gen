import { Dependencies, DependencyType } from "../packageManagers/dependencies";
import { PackageJson } from "../packageManagers/package-json";
import { Component } from "./component";
import { Executor } from "./executor";
import { LocalFileSystem } from "./filesystem";
import { Logger } from "./logger";

export interface ProjectOptions {
  readonly rootFolder?: string;
}

export class Project extends Component{
  readonly rootFolder: string;
  
  public readonly configFolder = '.project-gen';
  public readonly options: ProjectOptions;
  
  constructor(options?: ProjectOptions) {
    super();
    this.options = options ?? {}
    this.rootFolder = options?.rootFolder ?? process.cwd();

    this.addChild(new Executor());
    this.addChild(new Logger());
    this.addChild(new LocalFileSystem());

    const packageJson = new PackageJson(this);
    packageJson.addScript('project', 'ts-node .project.ts');

    const deps = new Dependencies(this);
    deps.add({
      name: 'typescript',
      source: 'Root project',
      type: DependencyType.DEV
    })
    deps.add({
      name: 'ts-node',
      source: 'Root project',
      type: DependencyType.DEV
    })
    deps.add({
      name: '@types/node',
      source: 'Root project',
      type: DependencyType.DEV
    })
  }

  async runExit(): Promise<void> {
    try {
      await this.preSynthesize();
      await this.synthesize();
      await this.postSynthesize();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
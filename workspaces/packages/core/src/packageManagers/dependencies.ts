import { BaseComponent, FileSystem, Project, SingletonComponent } from "../utils";
import { PackageJson } from "./package-json";

export enum DependencyType {
  PROD = 'dependencies',
  DEV = 'devDependencies',
  PEER = 'peerDependencies'
}

export interface Dependency {
  name: string;
  type: DependencyType;
  version?: string;
}

export interface SourceDependency extends Dependency {
  source: string;
}

export class Dependencies extends SingletonComponent {

  private previousDependencies : SourceDependency[] = [];
  private dependencies : SourceDependency[] = [];

  private get fileSystem() { return this.resolve(FileSystem) };
  private get project() { return this.resolve(Project) };
  private get packageJson() { return this.resolve(PackageJson) };

  get removals() : Dependency[] {
    return this.previousDependencies.filter((prevDep) => {
      return this.dependencies.find((dep) => {
        return (prevDep.name === dep.name) && (prevDep.type === dep.type) && (prevDep.version === dep.version);
      })
    })
  }

  constructor(parent: BaseComponent) {
    super(parent);

    const configFile = [this.project.configFolder, 'dependencies.json'];

    if (this.fileSystem.existsSync(configFile)) {

      const content = this.fileSystem.readFileSync(configFile).toString('utf-8');
      this.previousDependencies = JSON.parse(content);
    }
  }

  add(dependency: SourceDependency) {
    this.dependencies.push(dependency);
  }

  additions() {
    const packageJsonContent = this.packageJson.raw;

    return this.dependencies.filter((dep) => {
      if (packageJsonContent[dep.type] && packageJsonContent[dep.type][dep.name]) {
        if (dep.version) {
          return packageJsonContent[dep.type][dep.name] === dep.version;
        } else {
          return false;
        }
      }

      return true;
    })
  }

  async synthesize(): Promise<void> {
    super.synthesize();

    console.log('ADD DEPS: ', JSON.stringify(this.additions))
    console.log('REMOVE DEPS: ', JSON.stringify(this.additions))

    const configFile = [this.project.configFolder, 'dependencies.json'];
    const configContent = JSON.stringify(this.dependencies, null, 2);
    await this.fileSystem.createFile(configFile, Buffer.from(configContent, 'utf-8'));
  }
}

export class DependencyAdder {
  constructor(public readonly source: string) {}

  
}
import { Executor, Logger } from "../utils";
import { Component } from "../utils/component";
import { Dependencies, Dependency, DependencyType } from "./dependencies";

export class Yarn extends Component {
  private get executor() { return this.resolve(Executor) };
  private get dependencies() { return this.resolve(Dependencies) };
  
  async postSynthesize(): Promise<void> {
    await super.postSynthesize();

    const additions = this.dependencies.additions();

    const devDeps = additions.filter((dep) => dep.type === DependencyType.DEV).map(this.flattenDep);

    if (devDeps.length > 0) {
      this.executor.exec(`yarn add --no-interactive -D ${devDeps.join(' ')}`)
    } else {
      this.resolve(Logger).verbose('No yarn updates');
    }
  }

  flattenDep(dep : Dependency) {
    if (dep.version) {
      return `${dep.name}@${dep.version}`
    }
    else return dep.name;
  }
}
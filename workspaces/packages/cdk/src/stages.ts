import { RootComponent, SingletonComponent } from "@project-gen/core";

/**
 * Common structure to define multiple stages within your project
 */
export class Stages<T extends String[] | Record<string, string> > extends SingletonComponent {

  readonly keys: Set<string>;

  constructor(parent: RootComponent, public readonly stageType: T, public readonly defaultStage?: string) {
    super(parent);

    if (Array.isArray(stageType)) {
      this.keys = new Set(stageType);
    } else {
      this.keys = new Set(Object.values(stageType));
    }
  }
}
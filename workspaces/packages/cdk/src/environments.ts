import { RootComponent, SingletonComponent } from "@project-gen/core";

/**
 * Common structure to define multiple stages within your project
 */
 export class Environments<T extends String[] | Record<string, string> > extends SingletonComponent {
  // export class Environments<T extends String[] | Record<string, string> > extends SingletonComponent {

  readonly keys: Set<string>;

  constructor(parent: RootComponent, public readonly environmentType: T, public readonly defaultStage?: string) {
    super(parent);

    if (Array.isArray(environmentType)) {
      this.keys = new Set(environmentType);
    } else {
      this.keys = new Set(Object.values(environmentType));
    }
  }
}
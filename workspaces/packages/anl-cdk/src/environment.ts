import { Component } from "@project-gen/core";

export class Environment<T extends String[] | Record<string, string> > extends Component {

  readonly keys: Set<string>;

  constructor(public readonly environmentType: T, public readonly defaultEnvironment?: string) {
    super();

    if (Array.isArray(environmentType)) {
      this.keys = new Set(environmentType);
    } else {
      this.keys = new Set(Object.values(environmentType));
    }
    console.log(this);
  }
}
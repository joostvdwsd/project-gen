import { FileSystem } from "../utils";
import { Component } from "../utils/component";

export interface FileOptions {
  readonly path: string[];
}

export class File extends Component {

  get fileSystem() { return this.resolve(FileSystem) }

  public readonly path: string[];

  constructor(parent: Component, properties: FileOptions) {
    super(parent);
    this.path = properties.path;
  }
}
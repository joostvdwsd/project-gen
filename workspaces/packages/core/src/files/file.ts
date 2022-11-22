import { FileSystem } from "../utils";
import { BaseComponent, Component } from "../utils/component";

export interface FileOptions {
  readonly path: string[];
}

export class File extends Component {

  get fileSystem() { return this.resolve(FileSystem) }

  public readonly path: string[];

  constructor(parent: BaseComponent, id: string, properties: FileOptions) {
    super(parent, id);
    this.path = properties.path;
  }
}
import { BaseComponent } from '../utils';
import { File, FileOptions } from './file';

export type ObjectFileContent = any | (() => any);

export interface ObjectFileOptions extends FileOptions {
  readonly object: ObjectFileContent;
}

export abstract class ObjectFile extends File {

  protected object: ObjectFileContent;

  constructor(parent: BaseComponent, id: string, props: ObjectFileOptions) {
    super(parent, id, props);
    this.object = props.object;
  }

  async synthesize(): Promise<void> {
    await super.synthesize();
    const object = typeof this.object === 'object' ? this.object : this.object();

    const buffer = this.generateContent(object);
    return this.fileSystem.createFile(this.path, buffer);
  }

  abstract generateContent(object: any) : Buffer;
}
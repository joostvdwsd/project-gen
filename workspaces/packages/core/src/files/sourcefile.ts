import { Component } from "../utils";
import { File, FileOptions } from "./file";

export interface SourceFileOptions extends FileOptions{
  source: string;
  templateVars?: Record<string, string>;
}


export class SourceFile extends File {

  protected options: SourceFileOptions;

  constructor(parent: Component, options: SourceFileOptions) {
    super(parent, options);
    this.options = options;
  }
  async synthesize(): Promise<void> {
    await super.synthesize();

    let content = this.options.source;

    if (this.options.templateVars) {
      Object.entries(this.options.templateVars).forEach(([key, value]) => {
        content = content.replace(new RegExp(`%%${key}%%`, 'g') , value);
      })
    }

    const buffer = Buffer.from(content, 'utf-8');
    return this.fileSystem.createFile(this.path, buffer);
  }

}
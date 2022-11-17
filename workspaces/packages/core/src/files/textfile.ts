import { File } from './file';

export class TextFile extends File {
  public lines: string[] = [];

  async synthesize(): Promise<void> {
    await super.synthesize();
    const content = this.lines.join('\n');
    const buffer = Buffer.from(content, 'utf-8');
    return this.fileSystem.createFile(this.path, buffer);
  }
}
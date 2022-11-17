
import { existsSync, promises as fs, readFileSync } from 'fs';
import { join } from 'path';
import { Component } from './component';
import { Project } from './project';

class NotImplemented extends Error {
  constructor() {
    super('Not implemented');
  }
}

export class FileSystem extends Component {

  get project() { return this.resolve(Project) }

  createFile(_path: string[], _buffer: Buffer): Promise<void> { throw new NotImplemented(); }
  readFile(_path: string[]): Promise<Buffer> { throw new NotImplemented(); }
  readFileSync(_path: string[]): Buffer { throw new NotImplemented(); }
  updateFile(_path: string[], _buffer: Buffer): Promise<void> { throw new NotImplemented(); }
  deleteFile(_path: string[]): Promise<void> { throw new NotImplemented(); }

  existsSync(_path: string[]): boolean { throw new NotImplemented(); }

  protected getPath(path: string[]) {
    return join(this.project.rootFolder, ...path);
  }
}

export class MockFileSystem extends FileSystem {
  private files : Record<string, Buffer> = {};

  async createFile(path: string[], buffer: Buffer): Promise<void> {
    this.files[this.getPath(path)] = buffer;
  }

  async readFile(path: string[]): Promise<Buffer> {
    const result = this.files[this.getPath(path)];
    if (result) {
      return result;
    }
    throw new Error(`File doesn't exists : ${this.getPath(path)}`);
  }

  readFileSync(path: string[]): Buffer {
    const result = this.files[this.getPath(path)];
    if (result) {
      return result;
    }
    throw new Error(`File doesn't exists : ${this.getPath(path)}`);
  }

  existsSync(path: string[]): boolean { 
    return this.files[this.getPath(path)] !== undefined;
  }

  async updateFile(path: string[], buffer: Buffer): Promise<void> {
    this.files[this.getPath(path)] = buffer;
  }

  async deleteFile(path: string[]): Promise<void> {
    delete this.files[this.getPath(path)];
  }
}

export class LocalFileSystem extends FileSystem {

  async createFile(path: string[], buffer: Buffer): Promise<void> {
    await fs.mkdir(this.getPath(path.slice(0, -1)), { recursive: true });
    return fs.writeFile(this.getPath(path), buffer);
  }

  async readFile(path: string[]): Promise<Buffer> {
    return fs.readFile(this.getPath(path));
  }

  readFileSync(path: string[]): Buffer {
    return readFileSync(this.getPath(path));
  }

  existsSync(path: string[]): boolean { 
    return existsSync(this.getPath(path));
  }

  async updateFile(path: string[], buffer: Buffer): Promise<void> {
    return fs.writeFile(this.getPath(path), buffer);
  }

  async deleteFile(path: string[]): Promise<void> {
    return fs.unlink(this.getPath(path));
  }

}
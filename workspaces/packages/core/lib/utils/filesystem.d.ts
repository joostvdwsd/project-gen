/// <reference types="node" />
import { Component } from './component';
import { Project } from './project';
export declare class FileSystem extends Component {
    get project(): Project;
    createFile(_path: string[], _buffer: Buffer): Promise<void>;
    readFile(_path: string[]): Promise<Buffer>;
    readFileSync(_path: string[]): Buffer;
    updateFile(_path: string[], _buffer: Buffer): Promise<void>;
    deleteFile(_path: string[]): Promise<void>;
    existsSync(_path: string[]): boolean;
    protected getPath(path: string[]): string;
}
export declare class MockFileSystem extends FileSystem {
    private files;
    createFile(path: string[], buffer: Buffer): Promise<void>;
    readFile(path: string[]): Promise<Buffer>;
    readFileSync(path: string[]): Buffer;
    existsSync(path: string[]): boolean;
    updateFile(path: string[], buffer: Buffer): Promise<void>;
    deleteFile(path: string[]): Promise<void>;
}
export declare class LocalFileSystem extends FileSystem {
    createFile(path: string[], buffer: Buffer): Promise<void>;
    readFile(path: string[]): Promise<Buffer>;
    readFileSync(path: string[]): Buffer;
    existsSync(path: string[]): boolean;
    updateFile(path: string[], buffer: Buffer): Promise<void>;
    deleteFile(path: string[]): Promise<void>;
}

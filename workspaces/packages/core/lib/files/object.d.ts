/// <reference types="node" />
import { Component } from '../utils';
import { File, FileOptions } from './file';
export declare type ObjectFileContent = any | (() => any);
export interface ObjectFileOptions extends FileOptions {
    readonly object: ObjectFileContent;
}
export declare abstract class ObjectFile extends File {
    protected object: ObjectFileContent;
    constructor(parent: Component, props: ObjectFileOptions);
    synthesize(): Promise<void>;
    abstract generateContent(object: any): Buffer;
}

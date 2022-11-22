import { FileSystem } from "../utils";
import { Component } from "../utils/component";
export interface FileOptions {
    readonly path: string[];
}
export declare class File extends Component {
    get fileSystem(): FileSystem;
    readonly path: string[];
    constructor(parent: Component, properties: FileOptions);
}

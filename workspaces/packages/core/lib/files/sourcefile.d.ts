import { Component } from "../utils";
import { File, FileOptions } from "./file";
export interface SourceFileOptions extends FileOptions {
    source: string;
    templateVars?: Record<string, string>;
}
export declare class SourceFile extends File {
    protected options: SourceFileOptions;
    constructor(parent: Component, options: SourceFileOptions);
    synthesize(): Promise<void>;
}

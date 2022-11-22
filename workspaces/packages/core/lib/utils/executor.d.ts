/// <reference types="node" />
import { Component } from './component';
import { Logger } from './logger';
import { Project } from './project';
export declare class Executor extends Component {
    get project(): Project;
    get logger(): Logger;
    /**
     * Executes a command with STDOUT > STDERR.
     */
    exec(command: string): void;
    /**
     * Executes command and returns STDOUT. If the command fails (non-zero), throws an error.
     */
    execCapture(command: string): Buffer;
    /**
     * Executes `command` and returns its value or undefined if the command failed.
     */
    execOrUndefined(command: string): string | undefined;
}

import { Component } from "../utils/component";
export interface GitIgnoreProps {
    readonly patterns: string[];
}
export declare class GitIgnore extends Component {
    private file;
    constructor(props?: GitIgnoreProps);
    addPattern(...patterns: string[]): void;
}

import { Component } from "../utils/component";
export interface GitAttributesProps {
    readonly patterns: string[];
}
export declare class GitAttributes extends Component {
    private file;
    constructor(props?: GitAttributesProps);
    addPattern(...patterns: string[]): void;
}

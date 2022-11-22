import { Component } from "../utils";
export declare class PackageJson extends Component {
    raw: any;
    constructor(parent: Component);
    addScript(name: string, content: string): void;
}

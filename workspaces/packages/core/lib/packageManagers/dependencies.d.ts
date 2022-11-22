import { Component } from "../utils";
export declare enum DependencyType {
    PROD = "dependencies",
    DEV = "devDependencies",
    PEER = "peerDependencies"
}
export interface Dependency {
    name: string;
    type: DependencyType;
    version?: string;
}
export interface SourceDependency extends Dependency {
    source: string;
}
export declare class Dependencies extends Component {
    private previousDependencies;
    private dependencies;
    private get fileSystem();
    private get project();
    private get packageJson();
    get removals(): Dependency[];
    constructor(parent: Component);
    add(dependency: SourceDependency): void;
    additions(): SourceDependency[];
    synthesize(): Promise<void>;
}
export declare class DependencyAdder {
    readonly source: string;
    constructor(source: string);
}

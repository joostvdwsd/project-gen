import { Component } from "./component";
export interface ProjectOptions {
    readonly rootFolder?: string;
}
export declare class Project extends Component {
    readonly rootFolder: string;
    readonly configFolder = ".project-gen";
    readonly options: ProjectOptions;
    constructor(options?: ProjectOptions);
    runExit(): Promise<void>;
}

import { Component } from "../utils/component";
import { Dependency } from "./dependencies";
export declare class Yarn extends Component {
    private get executor();
    private get dependencies();
    postSynthesize(): Promise<void>;
    flattenDep(dep: Dependency): string;
}

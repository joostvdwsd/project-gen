export declare type ClassType<T> = new (...args: [...any]) => T;
export declare class Component {
    private parent;
    protected allComponents: Component[];
    protected children: Component[];
    setParent(parent: Component | null): void;
    getParent(): Component | null;
    getRoot(): Component;
    find<T extends Component>(componentType: ClassType<T>): T | undefined;
    resolve<T extends Component>(componentType: ClassType<T>): T;
    /**
     * A composite object can add or remove other components (both simple or
     * complex) to or from its child list.
     */
    addChild(component: Component): void;
    removeChild(component: Component): void;
    constructor(parent?: Component);
    preSynthesize(): Promise<void>;
    synthesize(): Promise<void>;
    postSynthesize(): Promise<void>;
}

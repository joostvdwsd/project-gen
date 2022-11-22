import { Component } from "../utils";
export declare class TypeScript extends Component {
    tsConfig: {
        compilerOptions: {
            composite: boolean;
            noEmit: boolean;
            isolatedModules: boolean;
            skipDefaultLibCheck: boolean;
            skipLibCheck: boolean;
            declaration: boolean;
            incremental: boolean;
            alwaysStrict: boolean;
            esModuleInterop: boolean;
            experimentalDecorators: boolean;
            inlineSourceMap: boolean;
            inlineSources: boolean;
            lib: string[];
            module: string;
            moduleResolution: string;
            noEmitOnError: boolean;
            noFallthroughCasesInSwitch: boolean;
            noImplicitAny: boolean;
            noImplicitReturns: boolean;
            noImplicitThis: boolean;
            resolveJsonModule: boolean;
            strict: boolean;
            strictNullChecks: boolean;
            strictPropertyInitialization: boolean;
            stripInternal: boolean;
            target: string;
            rootDir: string;
            outDir: string;
        };
    };
    constructor();
    preSynthesize(): Promise<void>;
}

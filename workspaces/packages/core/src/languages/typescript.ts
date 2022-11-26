import { JsonFile } from "../files";
import { Dependencies, DependencyType } from "../packageManagers/dependencies";
import { PackageJson } from "../packageManagers/package-json";
import { RootComponent, SingletonComponent } from "../utils";

const DEFAULT_TS_CONFIG = {
  "compilerOptions": {
     "composite": true,
     "noEmit": false,
     "isolatedModules": true,
     "skipDefaultLibCheck": true,
     "skipLibCheck": true,
     "declaration": true,
     "incremental": true,
     "alwaysStrict": true,
     "esModuleInterop": true,
     "experimentalDecorators": true,
     "inlineSourceMap": true,
     "inlineSources": true,
     "lib": [
        "es2018"
     ],
     "module": "CommonJS",
     "moduleResolution": "node",
     "noEmitOnError": false,
     "noFallthroughCasesInSwitch": true,
     "noImplicitAny": true,
     "noImplicitReturns": true,
     "noImplicitThis": true,
    //  "noUnusedLocals": true,
    //  "noUnusedParameters": true,
     "resolveJsonModule": true,
     "strict": true,
     "strictNullChecks": true,
     "strictPropertyInitialization": true,
     "stripInternal": true,
     "target": "ES2018",
     "rootDir": "./src",
     "outDir": "./lib",
  }
};


export class TypeScript extends SingletonComponent {

  public tsConfig = DEFAULT_TS_CONFIG;

  constructor(parent: RootComponent) {
    super(parent);

    new JsonFile(this, {
      path: ['tsconfig.json'],
      object: () => this.tsConfig
    })
  }

  async preSynthesize(): Promise<void> {

    const packageJson = this.resolve(PackageJson)
    packageJson.raw.types = 'src/index.ts';

    packageJson.addScript('compile', 'tsc')

    const deps = this.resolve(Dependencies);

    deps.add({
      name: 'typescript',
      source: 'Typescript',
      type: DependencyType.DEV
    })
    deps.add({
      name: 'ts-node',
      source: 'Typescript',
      type: DependencyType.DEV
    })
    deps.add({
      name: '@types/node',
      source: 'Typescript',
      type: DependencyType.DEV
    })

  }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScript = void 0;
const files_1 = require("../files");
const dependencies_1 = require("../packageManagers/dependencies");
const package_json_1 = require("../packageManagers/package-json");
const utils_1 = require("../utils");
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
class TypeScript extends utils_1.Component {
    constructor() {
        super();
        this.tsConfig = DEFAULT_TS_CONFIG;
        new files_1.JsonFile(this, {
            path: ['tsconfig.json'],
            object: () => this.tsConfig
        });
    }
    async preSynthesize() {
        const packageJson = this.resolve(package_json_1.PackageJson);
        packageJson.raw.types = 'src/index.ts';
        packageJson.addScript('compile', 'tsc');
        const deps = this.resolve(dependencies_1.Dependencies);
        deps.add({
            name: 'typescript',
            source: 'Typescript',
            type: dependencies_1.DependencyType.DEV
        });
        deps.add({
            name: 'ts-node',
            source: 'Typescript',
            type: dependencies_1.DependencyType.DEV
        });
        deps.add({
            name: '@types/node',
            source: 'Typescript',
            type: dependencies_1.DependencyType.DEV
        });
    }
}
exports.TypeScript = TypeScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYW5ndWFnZXMvdHlwZXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBb0M7QUFDcEMsa0VBQStFO0FBQy9FLGtFQUE4RDtBQUM5RCxvQ0FBcUM7QUFFckMsTUFBTSxpQkFBaUIsR0FBRztJQUN4QixpQkFBaUIsRUFBRTtRQUNoQixXQUFXLEVBQUUsSUFBSTtRQUNqQixRQUFRLEVBQUUsS0FBSztRQUNmLGlCQUFpQixFQUFFLElBQUk7UUFDdkIscUJBQXFCLEVBQUUsSUFBSTtRQUMzQixjQUFjLEVBQUUsSUFBSTtRQUNwQixhQUFhLEVBQUUsSUFBSTtRQUNuQixhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsSUFBSTtRQUNwQixpQkFBaUIsRUFBRSxJQUFJO1FBQ3ZCLHdCQUF3QixFQUFFLElBQUk7UUFDOUIsaUJBQWlCLEVBQUUsSUFBSTtRQUN2QixlQUFlLEVBQUUsSUFBSTtRQUNyQixLQUFLLEVBQUU7WUFDSixRQUFRO1NBQ1Y7UUFDRCxRQUFRLEVBQUUsVUFBVTtRQUNwQixrQkFBa0IsRUFBRSxNQUFNO1FBQzFCLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLDRCQUE0QixFQUFFLElBQUk7UUFDbEMsZUFBZSxFQUFFLElBQUk7UUFDckIsbUJBQW1CLEVBQUUsSUFBSTtRQUN6QixnQkFBZ0IsRUFBRSxJQUFJO1FBQ3ZCLDJCQUEyQjtRQUMzQiwrQkFBK0I7UUFDOUIsbUJBQW1CLEVBQUUsSUFBSTtRQUN6QixRQUFRLEVBQUUsSUFBSTtRQUNkLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsOEJBQThCLEVBQUUsSUFBSTtRQUNwQyxlQUFlLEVBQUUsSUFBSTtRQUNyQixRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsT0FBTztRQUNsQixRQUFRLEVBQUUsT0FBTztLQUNuQjtDQUNGLENBQUM7QUFHRixNQUFhLFVBQVcsU0FBUSxpQkFBUztJQUl2QztRQUNFLEtBQUssRUFBRSxDQUFDO1FBSEgsYUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBS2xDLElBQUksZ0JBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUTtTQUM1QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWE7UUFFakIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBVyxDQUFDLENBQUE7UUFDN0MsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBRXZDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQVksQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxJQUFJLEVBQUUsWUFBWTtZQUNsQixNQUFNLEVBQUUsWUFBWTtZQUNwQixJQUFJLEVBQUUsNkJBQWMsQ0FBQyxHQUFHO1NBQ3pCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLElBQUksRUFBRSw2QkFBYyxDQUFDLEdBQUc7U0FDekIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNQLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLElBQUksRUFBRSw2QkFBYyxDQUFDLEdBQUc7U0FDekIsQ0FBQyxDQUFBO0lBRUosQ0FBQztDQUNGO0FBdkNELGdDQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25GaWxlIH0gZnJvbSBcIi4uL2ZpbGVzXCI7XG5pbXBvcnQgeyBEZXBlbmRlbmNpZXMsIERlcGVuZGVuY3lUeXBlIH0gZnJvbSBcIi4uL3BhY2thZ2VNYW5hZ2Vycy9kZXBlbmRlbmNpZXNcIjtcbmltcG9ydCB7IFBhY2thZ2VKc29uIH0gZnJvbSBcIi4uL3BhY2thZ2VNYW5hZ2Vycy9wYWNrYWdlLWpzb25cIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBERUZBVUxUX1RTX0NPTkZJRyA9IHtcbiAgXCJjb21waWxlck9wdGlvbnNcIjoge1xuICAgICBcImNvbXBvc2l0ZVwiOiB0cnVlLFxuICAgICBcIm5vRW1pdFwiOiBmYWxzZSxcbiAgICAgXCJpc29sYXRlZE1vZHVsZXNcIjogdHJ1ZSxcbiAgICAgXCJza2lwRGVmYXVsdExpYkNoZWNrXCI6IHRydWUsXG4gICAgIFwic2tpcExpYkNoZWNrXCI6IHRydWUsXG4gICAgIFwiZGVjbGFyYXRpb25cIjogdHJ1ZSxcbiAgICAgXCJpbmNyZW1lbnRhbFwiOiB0cnVlLFxuICAgICBcImFsd2F5c1N0cmljdFwiOiB0cnVlLFxuICAgICBcImVzTW9kdWxlSW50ZXJvcFwiOiB0cnVlLFxuICAgICBcImV4cGVyaW1lbnRhbERlY29yYXRvcnNcIjogdHJ1ZSxcbiAgICAgXCJpbmxpbmVTb3VyY2VNYXBcIjogdHJ1ZSxcbiAgICAgXCJpbmxpbmVTb3VyY2VzXCI6IHRydWUsXG4gICAgIFwibGliXCI6IFtcbiAgICAgICAgXCJlczIwMThcIlxuICAgICBdLFxuICAgICBcIm1vZHVsZVwiOiBcIkNvbW1vbkpTXCIsXG4gICAgIFwibW9kdWxlUmVzb2x1dGlvblwiOiBcIm5vZGVcIixcbiAgICAgXCJub0VtaXRPbkVycm9yXCI6IGZhbHNlLFxuICAgICBcIm5vRmFsbHRocm91Z2hDYXNlc0luU3dpdGNoXCI6IHRydWUsXG4gICAgIFwibm9JbXBsaWNpdEFueVwiOiB0cnVlLFxuICAgICBcIm5vSW1wbGljaXRSZXR1cm5zXCI6IHRydWUsXG4gICAgIFwibm9JbXBsaWNpdFRoaXNcIjogdHJ1ZSxcbiAgICAvLyAgXCJub1VudXNlZExvY2Fsc1wiOiB0cnVlLFxuICAgIC8vICBcIm5vVW51c2VkUGFyYW1ldGVyc1wiOiB0cnVlLFxuICAgICBcInJlc29sdmVKc29uTW9kdWxlXCI6IHRydWUsXG4gICAgIFwic3RyaWN0XCI6IHRydWUsXG4gICAgIFwic3RyaWN0TnVsbENoZWNrc1wiOiB0cnVlLFxuICAgICBcInN0cmljdFByb3BlcnR5SW5pdGlhbGl6YXRpb25cIjogdHJ1ZSxcbiAgICAgXCJzdHJpcEludGVybmFsXCI6IHRydWUsXG4gICAgIFwidGFyZ2V0XCI6IFwiRVMyMDE4XCIsXG4gICAgIFwicm9vdERpclwiOiBcIi4vc3JjXCIsXG4gICAgIFwib3V0RGlyXCI6IFwiLi9saWJcIixcbiAgfVxufTtcblxuXG5leHBvcnQgY2xhc3MgVHlwZVNjcmlwdCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHRzQ29uZmlnID0gREVGQVVMVF9UU19DT05GSUc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIG5ldyBKc29uRmlsZSh0aGlzLCB7XG4gICAgICBwYXRoOiBbJ3RzY29uZmlnLmpzb24nXSxcbiAgICAgIG9iamVjdDogKCkgPT4gdGhpcy50c0NvbmZpZ1xuICAgIH0pXG4gIH1cblxuICBhc3luYyBwcmVTeW50aGVzaXplKCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgY29uc3QgcGFja2FnZUpzb24gPSB0aGlzLnJlc29sdmUoUGFja2FnZUpzb24pXG4gICAgcGFja2FnZUpzb24ucmF3LnR5cGVzID0gJ3NyYy9pbmRleC50cyc7XG5cbiAgICBwYWNrYWdlSnNvbi5hZGRTY3JpcHQoJ2NvbXBpbGUnLCAndHNjJylcblxuICAgIGNvbnN0IGRlcHMgPSB0aGlzLnJlc29sdmUoRGVwZW5kZW5jaWVzKTtcblxuICAgIGRlcHMuYWRkKHtcbiAgICAgIG5hbWU6ICd0eXBlc2NyaXB0JyxcbiAgICAgIHNvdXJjZTogJ1R5cGVzY3JpcHQnLFxuICAgICAgdHlwZTogRGVwZW5kZW5jeVR5cGUuREVWXG4gICAgfSlcbiAgICBkZXBzLmFkZCh7XG4gICAgICBuYW1lOiAndHMtbm9kZScsXG4gICAgICBzb3VyY2U6ICdUeXBlc2NyaXB0JyxcbiAgICAgIHR5cGU6IERlcGVuZGVuY3lUeXBlLkRFVlxuICAgIH0pXG4gICAgZGVwcy5hZGQoe1xuICAgICAgbmFtZTogJ0B0eXBlcy9ub2RlJyxcbiAgICAgIHNvdXJjZTogJ1R5cGVzY3JpcHQnLFxuICAgICAgdHlwZTogRGVwZW5kZW5jeVR5cGUuREVWXG4gICAgfSlcblxuICB9XG59Il19
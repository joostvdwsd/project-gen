"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const dependencies_1 = require("../packageManagers/dependencies");
const package_json_1 = require("../packageManagers/package-json");
const component_1 = require("./component");
const executor_1 = require("./executor");
const filesystem_1 = require("./filesystem");
const logger_1 = require("./logger");
class Project extends component_1.Component {
    constructor(options) {
        var _a;
        super();
        this.configFolder = '.project-gen';
        this.options = options !== null && options !== void 0 ? options : {};
        this.rootFolder = (_a = options === null || options === void 0 ? void 0 : options.rootFolder) !== null && _a !== void 0 ? _a : process.cwd();
        this.addChild(new executor_1.Executor());
        this.addChild(new logger_1.Logger());
        this.addChild(new filesystem_1.LocalFileSystem());
        const packageJson = new package_json_1.PackageJson(this);
        packageJson.addScript('project', 'ts-node .project.ts');
        const deps = new dependencies_1.Dependencies(this);
        deps.add({
            name: 'typescript',
            source: 'Root project',
            type: dependencies_1.DependencyType.DEV
        });
        deps.add({
            name: 'ts-node',
            source: 'Root project',
            type: dependencies_1.DependencyType.DEV
        });
        deps.add({
            name: '@types/node',
            source: 'Root project',
            type: dependencies_1.DependencyType.DEV
        });
    }
    async runExit() {
        try {
            await this.preSynthesize();
            await this.synthesize();
            await this.postSynthesize();
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}
exports.Project = Project;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9wcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQUErRTtBQUMvRSxrRUFBOEQ7QUFDOUQsMkNBQXdDO0FBQ3hDLHlDQUFzQztBQUN0Qyw2Q0FBK0M7QUFDL0MscUNBQWtDO0FBTWxDLE1BQWEsT0FBUSxTQUFRLHFCQUFTO0lBTXBDLFlBQVksT0FBd0I7O1FBQ2xDLEtBQUssRUFBRSxDQUFDO1FBSk0saUJBQVksR0FBRyxjQUFjLENBQUM7UUFLNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxVQUFVLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV2RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGVBQU0sRUFBRSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLDRCQUFlLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRXhELE1BQU0sSUFBSSxHQUFHLElBQUksMkJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ1AsSUFBSSxFQUFFLFlBQVk7WUFDbEIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsSUFBSSxFQUFFLDZCQUFjLENBQUMsR0FBRztTQUN6QixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ1AsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsY0FBYztZQUN0QixJQUFJLEVBQUUsNkJBQWMsQ0FBQyxHQUFHO1NBQ3pCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNLEVBQUUsY0FBYztZQUN0QixJQUFJLEVBQUUsNkJBQWMsQ0FBQyxHQUFHO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLElBQUk7WUFDRixNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN4QixNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUM3QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztDQUNGO0FBOUNELDBCQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlcGVuZGVuY2llcywgRGVwZW5kZW5jeVR5cGUgfSBmcm9tIFwiLi4vcGFja2FnZU1hbmFnZXJzL2RlcGVuZGVuY2llc1wiO1xuaW1wb3J0IHsgUGFja2FnZUpzb24gfSBmcm9tIFwiLi4vcGFja2FnZU1hbmFnZXJzL3BhY2thZ2UtanNvblwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50XCI7XG5pbXBvcnQgeyBFeGVjdXRvciB9IGZyb20gXCIuL2V4ZWN1dG9yXCI7XG5pbXBvcnQgeyBMb2NhbEZpbGVTeXN0ZW0gfSBmcm9tIFwiLi9maWxlc3lzdGVtXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0T3B0aW9ucyB7XG4gIHJlYWRvbmx5IHJvb3RGb2xkZXI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IGV4dGVuZHMgQ29tcG9uZW50e1xuICByZWFkb25seSByb290Rm9sZGVyOiBzdHJpbmc7XG4gIFxuICBwdWJsaWMgcmVhZG9ubHkgY29uZmlnRm9sZGVyID0gJy5wcm9qZWN0LWdlbic7XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBQcm9qZWN0T3B0aW9ucztcbiAgXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBQcm9qZWN0T3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyA/PyB7fVxuICAgIHRoaXMucm9vdEZvbGRlciA9IG9wdGlvbnM/LnJvb3RGb2xkZXIgPz8gcHJvY2Vzcy5jd2QoKTtcblxuICAgIHRoaXMuYWRkQ2hpbGQobmV3IEV4ZWN1dG9yKCkpO1xuICAgIHRoaXMuYWRkQ2hpbGQobmV3IExvZ2dlcigpKTtcbiAgICB0aGlzLmFkZENoaWxkKG5ldyBMb2NhbEZpbGVTeXN0ZW0oKSk7XG5cbiAgICBjb25zdCBwYWNrYWdlSnNvbiA9IG5ldyBQYWNrYWdlSnNvbih0aGlzKTtcbiAgICBwYWNrYWdlSnNvbi5hZGRTY3JpcHQoJ3Byb2plY3QnLCAndHMtbm9kZSAucHJvamVjdC50cycpO1xuXG4gICAgY29uc3QgZGVwcyA9IG5ldyBEZXBlbmRlbmNpZXModGhpcyk7XG4gICAgZGVwcy5hZGQoe1xuICAgICAgbmFtZTogJ3R5cGVzY3JpcHQnLFxuICAgICAgc291cmNlOiAnUm9vdCBwcm9qZWN0JyxcbiAgICAgIHR5cGU6IERlcGVuZGVuY3lUeXBlLkRFVlxuICAgIH0pXG4gICAgZGVwcy5hZGQoe1xuICAgICAgbmFtZTogJ3RzLW5vZGUnLFxuICAgICAgc291cmNlOiAnUm9vdCBwcm9qZWN0JyxcbiAgICAgIHR5cGU6IERlcGVuZGVuY3lUeXBlLkRFVlxuICAgIH0pXG4gICAgZGVwcy5hZGQoe1xuICAgICAgbmFtZTogJ0B0eXBlcy9ub2RlJyxcbiAgICAgIHNvdXJjZTogJ1Jvb3QgcHJvamVjdCcsXG4gICAgICB0eXBlOiBEZXBlbmRlbmN5VHlwZS5ERVZcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgcnVuRXhpdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5wcmVTeW50aGVzaXplKCk7XG4gICAgICBhd2FpdCB0aGlzLnN5bnRoZXNpemUoKTtcbiAgICAgIGF3YWl0IHRoaXMucG9zdFN5bnRoZXNpemUoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbiAgfVxufSJdfQ==
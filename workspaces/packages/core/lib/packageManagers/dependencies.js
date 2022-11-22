"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyAdder = exports.Dependencies = exports.DependencyType = void 0;
const utils_1 = require("../utils");
const package_json_1 = require("./package-json");
var DependencyType;
(function (DependencyType) {
    DependencyType["PROD"] = "dependencies";
    DependencyType["DEV"] = "devDependencies";
    DependencyType["PEER"] = "peerDependencies";
})(DependencyType = exports.DependencyType || (exports.DependencyType = {}));
class Dependencies extends utils_1.Component {
    constructor(parent) {
        super(parent);
        this.previousDependencies = [];
        this.dependencies = [];
        const configFile = [this.project.configFolder, 'dependencies.json'];
        if (this.fileSystem.existsSync(configFile)) {
            const content = this.fileSystem.readFileSync(configFile).toString('utf-8');
            this.previousDependencies = JSON.parse(content);
        }
    }
    get fileSystem() { return this.resolve(utils_1.FileSystem); }
    ;
    get project() { return this.resolve(utils_1.Project); }
    ;
    get packageJson() { return this.resolve(package_json_1.PackageJson); }
    ;
    get removals() {
        return this.previousDependencies.filter((prevDep) => {
            return this.dependencies.find((dep) => {
                return (prevDep.name === dep.name) && (prevDep.type === dep.type) && (prevDep.version === dep.version);
            });
        });
    }
    add(dependency) {
        this.dependencies.push(dependency);
    }
    additions() {
        const packageJsonContent = this.packageJson.raw;
        return this.dependencies.filter((dep) => {
            if (packageJsonContent[dep.type] && packageJsonContent[dep.type][dep.name]) {
                if (dep.version) {
                    return packageJsonContent[dep.type][dep.name] === dep.version;
                }
                else {
                    return false;
                }
            }
            return true;
        });
    }
    async synthesize() {
        super.synthesize();
        console.log('ADD DEPS: ', JSON.stringify(this.additions));
        console.log('REMOVE DEPS: ', JSON.stringify(this.additions));
        const configFile = [this.project.configFolder, 'dependencies.json'];
        const configContent = JSON.stringify(this.dependencies, null, 2);
        await this.fileSystem.createFile(configFile, Buffer.from(configContent, 'utf-8'));
    }
}
exports.Dependencies = Dependencies;
class DependencyAdder {
    constructor(source) {
        this.source = source;
    }
}
exports.DependencyAdder = DependencyAdder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhY2thZ2VNYW5hZ2Vycy9kZXBlbmRlbmNpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQTBEO0FBQzFELGlEQUE2QztBQUU3QyxJQUFZLGNBSVg7QUFKRCxXQUFZLGNBQWM7SUFDeEIsdUNBQXFCLENBQUE7SUFDckIseUNBQXVCLENBQUE7SUFDdkIsMkNBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQUpXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBSXpCO0FBWUQsTUFBYSxZQUFhLFNBQVEsaUJBQVM7SUFpQnpDLFlBQVksTUFBaUI7UUFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBaEJSLHlCQUFvQixHQUF3QixFQUFFLENBQUM7UUFDL0MsaUJBQVksR0FBd0IsRUFBRSxDQUFDO1FBaUI3QyxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFcEUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUUxQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBdEJELElBQVksVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBVSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUM3RCxJQUFZLE9BQU8sS0FBSyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUN2RCxJQUFZLFdBQVcsS0FBSyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQVcsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUFBLENBQUM7SUFFL0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pHLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBY0QsR0FBRyxDQUFDLFVBQTRCO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTO1FBQ1AsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUVoRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDMUUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO29CQUNmLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDO2lCQUMvRDtxQkFBTTtvQkFDTCxPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVTtRQUNkLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVuQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFNUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakUsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0NBQ0Y7QUEzREQsb0NBMkRDO0FBRUQsTUFBYSxlQUFlO0lBQzFCLFlBQTRCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztDQUcvQztBQUpELDBDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBGaWxlU3lzdGVtLCBQcm9qZWN0IH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBQYWNrYWdlSnNvbiB9IGZyb20gXCIuL3BhY2thZ2UtanNvblwiO1xuXG5leHBvcnQgZW51bSBEZXBlbmRlbmN5VHlwZSB7XG4gIFBST0QgPSAnZGVwZW5kZW5jaWVzJyxcbiAgREVWID0gJ2RldkRlcGVuZGVuY2llcycsXG4gIFBFRVIgPSAncGVlckRlcGVuZGVuY2llcydcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbmN5IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBEZXBlbmRlbmN5VHlwZTtcbiAgdmVyc2lvbj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VEZXBlbmRlbmN5IGV4dGVuZHMgRGVwZW5kZW5jeSB7XG4gIHNvdXJjZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jaWVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwcml2YXRlIHByZXZpb3VzRGVwZW5kZW5jaWVzIDogU291cmNlRGVwZW5kZW5jeVtdID0gW107XG4gIHByaXZhdGUgZGVwZW5kZW5jaWVzIDogU291cmNlRGVwZW5kZW5jeVtdID0gW107XG5cbiAgcHJpdmF0ZSBnZXQgZmlsZVN5c3RlbSgpIHsgcmV0dXJuIHRoaXMucmVzb2x2ZShGaWxlU3lzdGVtKSB9O1xuICBwcml2YXRlIGdldCBwcm9qZWN0KCkgeyByZXR1cm4gdGhpcy5yZXNvbHZlKFByb2plY3QpIH07XG4gIHByaXZhdGUgZ2V0IHBhY2thZ2VKc29uKCkgeyByZXR1cm4gdGhpcy5yZXNvbHZlKFBhY2thZ2VKc29uKSB9O1xuXG4gIGdldCByZW1vdmFscygpIDogRGVwZW5kZW5jeVtdIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2aW91c0RlcGVuZGVuY2llcy5maWx0ZXIoKHByZXZEZXApID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmRlcGVuZGVuY2llcy5maW5kKChkZXApID0+IHtcbiAgICAgICAgcmV0dXJuIChwcmV2RGVwLm5hbWUgPT09IGRlcC5uYW1lKSAmJiAocHJldkRlcC50eXBlID09PSBkZXAudHlwZSkgJiYgKHByZXZEZXAudmVyc2lvbiA9PT0gZGVwLnZlcnNpb24pO1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBDb21wb25lbnQpIHtcbiAgICBzdXBlcihwYXJlbnQpO1xuXG4gICAgY29uc3QgY29uZmlnRmlsZSA9IFt0aGlzLnByb2plY3QuY29uZmlnRm9sZGVyLCAnZGVwZW5kZW5jaWVzLmpzb24nXTtcblxuICAgIGlmICh0aGlzLmZpbGVTeXN0ZW0uZXhpc3RzU3luYyhjb25maWdGaWxlKSkge1xuXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5maWxlU3lzdGVtLnJlYWRGaWxlU3luYyhjb25maWdGaWxlKS50b1N0cmluZygndXRmLTgnKTtcbiAgICAgIHRoaXMucHJldmlvdXNEZXBlbmRlbmNpZXMgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZChkZXBlbmRlbmN5OiBTb3VyY2VEZXBlbmRlbmN5KSB7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KTtcbiAgfVxuXG4gIGFkZGl0aW9ucygpIHtcbiAgICBjb25zdCBwYWNrYWdlSnNvbkNvbnRlbnQgPSB0aGlzLnBhY2thZ2VKc29uLnJhdztcblxuICAgIHJldHVybiB0aGlzLmRlcGVuZGVuY2llcy5maWx0ZXIoKGRlcCkgPT4ge1xuICAgICAgaWYgKHBhY2thZ2VKc29uQ29udGVudFtkZXAudHlwZV0gJiYgcGFja2FnZUpzb25Db250ZW50W2RlcC50eXBlXVtkZXAubmFtZV0pIHtcbiAgICAgICAgaWYgKGRlcC52ZXJzaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHBhY2thZ2VKc29uQ29udGVudFtkZXAudHlwZV1bZGVwLm5hbWVdID09PSBkZXAudmVyc2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHN5bnRoZXNpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgc3VwZXIuc3ludGhlc2l6ZSgpO1xuXG4gICAgY29uc29sZS5sb2coJ0FERCBERVBTOiAnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZGl0aW9ucykpXG4gICAgY29uc29sZS5sb2coJ1JFTU9WRSBERVBTOiAnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZGl0aW9ucykpXG5cbiAgICBjb25zdCBjb25maWdGaWxlID0gW3RoaXMucHJvamVjdC5jb25maWdGb2xkZXIsICdkZXBlbmRlbmNpZXMuanNvbiddO1xuICAgIGNvbnN0IGNvbmZpZ0NvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRlcGVuZGVuY2llcywgbnVsbCwgMik7XG4gICAgYXdhaXQgdGhpcy5maWxlU3lzdGVtLmNyZWF0ZUZpbGUoY29uZmlnRmlsZSwgQnVmZmVyLmZyb20oY29uZmlnQ29udGVudCwgJ3V0Zi04JykpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmN5QWRkZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgc291cmNlOiBzdHJpbmcpIHt9XG5cbiAgXG59Il19
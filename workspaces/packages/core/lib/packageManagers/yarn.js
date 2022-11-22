"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yarn = void 0;
const utils_1 = require("../utils");
const component_1 = require("../utils/component");
const dependencies_1 = require("./dependencies");
class Yarn extends component_1.Component {
    get executor() { return this.resolve(utils_1.Executor); }
    ;
    get dependencies() { return this.resolve(dependencies_1.Dependencies); }
    ;
    async postSynthesize() {
        await super.postSynthesize();
        const additions = this.dependencies.additions();
        const devDeps = additions.filter((dep) => dep.type === dependencies_1.DependencyType.DEV).map(this.flattenDep);
        if (devDeps.length > 0) {
            this.executor.exec(`yarn add --no-interactive -D ${devDeps.join(' ')}`);
        }
        else {
            this.resolve(utils_1.Logger).verbose('No yarn updates');
        }
    }
    flattenDep(dep) {
        if (dep.version) {
            return `${dep.name}@${dep.version}`;
        }
        else
            return dep.name;
    }
}
exports.Yarn = Yarn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYWNrYWdlTWFuYWdlcnMveWFybi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBNEM7QUFDNUMsa0RBQStDO0FBQy9DLGlEQUEwRTtBQUUxRSxNQUFhLElBQUssU0FBUSxxQkFBUztJQUNqQyxJQUFZLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQVEsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDekQsSUFBWSxZQUFZLEtBQUssT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUFZLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFBQSxDQUFDO0lBRWpFLEtBQUssQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFaEQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyw2QkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFaEcsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDeEU7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBTSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLEdBQWdCO1FBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNwQzs7WUFDSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBeEJELG9CQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4ZWN1dG9yLCBMb2dnZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi91dGlscy9jb21wb25lbnRcIjtcbmltcG9ydCB7IERlcGVuZGVuY2llcywgRGVwZW5kZW5jeSwgRGVwZW5kZW5jeVR5cGUgfSBmcm9tIFwiLi9kZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNsYXNzIFlhcm4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBwcml2YXRlIGdldCBleGVjdXRvcigpIHsgcmV0dXJuIHRoaXMucmVzb2x2ZShFeGVjdXRvcikgfTtcbiAgcHJpdmF0ZSBnZXQgZGVwZW5kZW5jaWVzKCkgeyByZXR1cm4gdGhpcy5yZXNvbHZlKERlcGVuZGVuY2llcykgfTtcbiAgXG4gIGFzeW5jIHBvc3RTeW50aGVzaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHN1cGVyLnBvc3RTeW50aGVzaXplKCk7XG5cbiAgICBjb25zdCBhZGRpdGlvbnMgPSB0aGlzLmRlcGVuZGVuY2llcy5hZGRpdGlvbnMoKTtcblxuICAgIGNvbnN0IGRldkRlcHMgPSBhZGRpdGlvbnMuZmlsdGVyKChkZXApID0+IGRlcC50eXBlID09PSBEZXBlbmRlbmN5VHlwZS5ERVYpLm1hcCh0aGlzLmZsYXR0ZW5EZXApO1xuXG4gICAgaWYgKGRldkRlcHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5leGVjdXRvci5leGVjKGB5YXJuIGFkZCAtLW5vLWludGVyYWN0aXZlIC1EICR7ZGV2RGVwcy5qb2luKCcgJyl9YClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNvbHZlKExvZ2dlcikudmVyYm9zZSgnTm8geWFybiB1cGRhdGVzJyk7XG4gICAgfVxuICB9XG5cbiAgZmxhdHRlbkRlcChkZXAgOiBEZXBlbmRlbmN5KSB7XG4gICAgaWYgKGRlcC52ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gYCR7ZGVwLm5hbWV9QCR7ZGVwLnZlcnNpb259YFxuICAgIH1cbiAgICBlbHNlIHJldHVybiBkZXAubmFtZTtcbiAgfVxufSJdfQ==
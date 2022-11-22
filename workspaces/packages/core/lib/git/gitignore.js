"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitIgnore = void 0;
const files_1 = require("../files");
const component_1 = require("../utils/component");
class GitIgnore extends component_1.Component {
    constructor(props) {
        super();
        this.file = new files_1.TextFile(this, {
            path: ['.gitignore'],
        });
        if (props === null || props === void 0 ? void 0 : props.patterns) {
            this.file.lines.push(...props.patterns);
        }
    }
    addPattern(...patterns) {
        this.file.lines.push(...patterns);
    }
}
exports.GitIgnore = GitIgnore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aWdub3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dpdC9naXRpZ25vcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQW9DO0FBQ3BDLGtEQUErQztBQU0vQyxNQUFhLFNBQVUsU0FBUSxxQkFBUztJQUd0QyxZQUFZLEtBQXNCO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGdCQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQztTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFHLFFBQWtCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQWpCRCw4QkFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RmlsZSB9IGZyb20gXCIuLi9maWxlc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4uL3V0aWxzL2NvbXBvbmVudFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdpdElnbm9yZVByb3BzIHtcbiAgcmVhZG9ubHkgcGF0dGVybnM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY2xhc3MgR2l0SWdub3JlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBmaWxlOiBUZXh0RmlsZTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcz86IEdpdElnbm9yZVByb3BzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZpbGUgPSBuZXcgVGV4dEZpbGUodGhpcywge1xuICAgICAgcGF0aDogWycuZ2l0aWdub3JlJ10sXG4gICAgfSk7XG5cbiAgICBpZiAocHJvcHM/LnBhdHRlcm5zKSB7XG4gICAgICB0aGlzLmZpbGUubGluZXMucHVzaCguLi5wcm9wcy5wYXR0ZXJucyk7XG4gICAgfVxuICB9XG5cbiAgYWRkUGF0dGVybiguLi5wYXR0ZXJuczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmZpbGUubGluZXMucHVzaCguLi5wYXR0ZXJucyk7XG4gIH1cbn0iXX0=
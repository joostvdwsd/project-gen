"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitAttributes = void 0;
const files_1 = require("../files");
const component_1 = require("../utils/component");
class GitAttributes extends component_1.Component {
    constructor(props) {
        super();
        this.file = new files_1.TextFile(this, {
            path: ['.gitattributes'],
        });
        if (props === null || props === void 0 ? void 0 : props.patterns) {
            this.file.lines.push(...props.patterns);
        }
    }
    addPattern(...patterns) {
        this.file.lines.push(...patterns);
    }
}
exports.GitAttributes = GitAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0YXR0cmlidXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9naXQvZ2l0YXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBb0M7QUFDcEMsa0RBQStDO0FBTS9DLE1BQWEsYUFBYyxTQUFRLHFCQUFTO0lBRzFDLFlBQVksS0FBMEI7UUFDcEMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZ0JBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDN0IsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsR0FBRyxRQUFrQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7QUFqQkQsc0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEZpbGUgfSBmcm9tIFwiLi4vZmlsZXNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi91dGlscy9jb21wb25lbnRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHaXRBdHRyaWJ1dGVzUHJvcHMge1xuICByZWFkb25seSBwYXR0ZXJuczogc3RyaW5nW107XG59XG5cbmV4cG9ydCBjbGFzcyBHaXRBdHRyaWJ1dGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBmaWxlOiBUZXh0RmlsZTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcz86IEdpdEF0dHJpYnV0ZXNQcm9wcykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5maWxlID0gbmV3IFRleHRGaWxlKHRoaXMsIHtcbiAgICAgIHBhdGg6IFsnLmdpdGF0dHJpYnV0ZXMnXSxcbiAgICB9KTtcblxuICAgIGlmIChwcm9wcz8ucGF0dGVybnMpIHtcbiAgICAgIHRoaXMuZmlsZS5saW5lcy5wdXNoKC4uLnByb3BzLnBhdHRlcm5zKTtcbiAgICB9XG4gIH1cblxuICBhZGRQYXR0ZXJuKC4uLnBhdHRlcm5zOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuZmlsZS5saW5lcy5wdXNoKC4uLnBhdHRlcm5zKTtcbiAgfVxufSJdfQ==
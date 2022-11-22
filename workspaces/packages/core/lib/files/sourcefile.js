"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFile = void 0;
const file_1 = require("./file");
class SourceFile extends file_1.File {
    constructor(parent, options) {
        super(parent, options);
        this.options = options;
    }
    async synthesize() {
        await super.synthesize();
        let content = this.options.source;
        if (this.options.templateVars) {
            Object.entries(this.options.templateVars).forEach(([key, value]) => {
                content = content.replace(new RegExp(`%%${key}%%`, 'g'), value);
            });
        }
        const buffer = Buffer.from(content, 'utf-8');
        return this.fileSystem.createFile(this.path, buffer);
    }
}
exports.SourceFile = SourceFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWxlcy9zb3VyY2VmaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlDQUEyQztBQVEzQyxNQUFhLFVBQVcsU0FBUSxXQUFJO0lBSWxDLFlBQVksTUFBaUIsRUFBRSxPQUEwQjtRQUN2RCxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXpCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRWxDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pFLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUcsS0FBSyxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUE7U0FDSDtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBRUY7QUF2QkQsZ0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBGaWxlLCBGaWxlT3B0aW9ucyB9IGZyb20gXCIuL2ZpbGVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VGaWxlT3B0aW9ucyBleHRlbmRzIEZpbGVPcHRpb25ze1xuICBzb3VyY2U6IHN0cmluZztcbiAgdGVtcGxhdGVWYXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuXG5leHBvcnQgY2xhc3MgU291cmNlRmlsZSBleHRlbmRzIEZpbGUge1xuXG4gIHByb3RlY3RlZCBvcHRpb25zOiBTb3VyY2VGaWxlT3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IENvbXBvbmVudCwgb3B0aW9uczogU291cmNlRmlsZU9wdGlvbnMpIHtcbiAgICBzdXBlcihwYXJlbnQsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cbiAgYXN5bmMgc3ludGhlc2l6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBzdXBlci5zeW50aGVzaXplKCk7XG5cbiAgICBsZXQgY29udGVudCA9IHRoaXMub3B0aW9ucy5zb3VyY2U7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRlbXBsYXRlVmFycykge1xuICAgICAgT2JqZWN0LmVudHJpZXModGhpcy5vcHRpb25zLnRlbXBsYXRlVmFycykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChgJSUke2tleX0lJWAsICdnJykgLCB2YWx1ZSk7XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGNvbnRlbnQsICd1dGYtOCcpO1xuICAgIHJldHVybiB0aGlzLmZpbGVTeXN0ZW0uY3JlYXRlRmlsZSh0aGlzLnBhdGgsIGJ1ZmZlcik7XG4gIH1cblxufSJdfQ==
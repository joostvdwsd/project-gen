"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
const files_1 = require("../files");
const utils_1 = require("../utils");
class PackageJson extends utils_1.Component {
    constructor(parent) {
        super(parent);
        const fileSystem = this.resolve(utils_1.FileSystem);
        const location = ['package.json'];
        if (fileSystem.existsSync(location)) {
            const jsonContent = fileSystem.readFileSync(location).toString('utf-8');
            this.raw = JSON.parse(jsonContent);
        }
        else {
            this.raw = {};
        }
        new files_1.JsonFile(this, {
            path: location,
            object: () => this.raw
        });
    }
    addScript(name, content) {
        if (!this.raw.scripts) {
            this.raw.scripts = {};
        }
        this.raw.scripts[name] = content;
    }
}
exports.PackageJson = PackageJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1qc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhY2thZ2VNYW5hZ2Vycy9wYWNrYWdlLWpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQW9DO0FBQ3BDLG9DQUFpRDtBQUVqRCxNQUFhLFdBQVksU0FBUSxpQkFBUztJQUd4QyxZQUFZLE1BQWlCO1FBQzNCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVkLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQVUsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sUUFBUSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBRW5DLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXhFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksZ0JBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUc7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsT0FBZTtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQS9CRCxrQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uRmlsZSB9IGZyb20gXCIuLi9maWxlc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGaWxlU3lzdGVtIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBQYWNrYWdlSnNvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyByYXc6IGFueTsgIFxuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogQ29tcG9uZW50KSB7XG4gICAgc3VwZXIocGFyZW50KTtcbiAgICBcbiAgICBjb25zdCBmaWxlU3lzdGVtID0gdGhpcy5yZXNvbHZlKEZpbGVTeXN0ZW0pO1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSBbJ3BhY2thZ2UuanNvbiddO1xuXG4gICAgaWYgKGZpbGVTeXN0ZW0uZXhpc3RzU3luYyhsb2NhdGlvbikpIHtcblxuICAgICAgY29uc3QganNvbkNvbnRlbnQgPSBmaWxlU3lzdGVtLnJlYWRGaWxlU3luYyhsb2NhdGlvbikudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICAgIHRoaXMucmF3ID0gSlNPTi5wYXJzZShqc29uQ29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmF3ID0ge307XG4gICAgfVxuXG4gICAgbmV3IEpzb25GaWxlKHRoaXMsIHtcbiAgICAgIHBhdGg6IGxvY2F0aW9uLFxuICAgICAgb2JqZWN0OiAoKSA9PiB0aGlzLnJhd1xuICAgIH0pXG4gIH1cblxuICBhZGRTY3JpcHQobmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMucmF3LnNjcmlwdHMpIHtcbiAgICAgIHRoaXMucmF3LnNjcmlwdHMgPSB7fVxuICAgIH1cbiAgICB0aGlzLnJhdy5zY3JpcHRzW25hbWVdID0gY29udGVudDtcbiAgfVxufSJdfQ==
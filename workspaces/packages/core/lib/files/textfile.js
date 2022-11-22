"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFile = void 0;
const file_1 = require("./file");
class TextFile extends file_1.File {
    constructor() {
        super(...arguments);
        this.lines = [];
    }
    async synthesize() {
        await super.synthesize();
        const content = this.lines.join('\n');
        const buffer = Buffer.from(content, 'utf-8');
        return this.fileSystem.createFile(this.path, buffer);
    }
}
exports.TextFile = TextFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmlsZXMvdGV4dGZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQThCO0FBRTlCLE1BQWEsUUFBUyxTQUFRLFdBQUk7SUFBbEM7O1FBQ1MsVUFBSyxHQUFhLEVBQUUsQ0FBQztJQVE5QixDQUFDO0lBTkMsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNGO0FBVEQsNEJBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlIH0gZnJvbSAnLi9maWxlJztcblxuZXhwb3J0IGNsYXNzIFRleHRGaWxlIGV4dGVuZHMgRmlsZSB7XG4gIHB1YmxpYyBsaW5lczogc3RyaW5nW10gPSBbXTtcblxuICBhc3luYyBzeW50aGVzaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHN1cGVyLnN5bnRoZXNpemUoKTtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5saW5lcy5qb2luKCdcXG4nKTtcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShjb250ZW50LCAndXRmLTgnKTtcbiAgICByZXR1cm4gdGhpcy5maWxlU3lzdGVtLmNyZWF0ZUZpbGUodGhpcy5wYXRoLCBidWZmZXIpO1xuICB9XG59Il19
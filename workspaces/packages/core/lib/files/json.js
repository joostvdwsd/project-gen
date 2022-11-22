"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFile = void 0;
const object_1 = require("./object");
class JsonFile extends object_1.ObjectFile {
    generateContent(object) {
        const jsonContent = JSON.stringify(object, null, 2);
        return Buffer.from(jsonContent, 'utf-8');
    }
}
exports.JsonFile = JsonFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWxlcy9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFzQztBQUV0QyxNQUFhLFFBQVMsU0FBUSxtQkFBVTtJQUN0QyxlQUFlLENBQUMsTUFBVztRQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7QUFORCw0QkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9iamVjdEZpbGUgfSBmcm9tICcuL29iamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBKc29uRmlsZSBleHRlbmRzIE9iamVjdEZpbGUge1xuICBnZW5lcmF0ZUNvbnRlbnQob2JqZWN0OiBhbnkpOiBCdWZmZXIge1xuICAgIGNvbnN0IGpzb25Db250ZW50ID0gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCAyKTtcblxuICAgIHJldHVybiBCdWZmZXIuZnJvbShqc29uQ29udGVudCwgJ3V0Zi04Jyk7XG4gIH1cbn0iXX0=
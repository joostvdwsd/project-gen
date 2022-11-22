"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileSystem = exports.MockFileSystem = exports.FileSystem = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const component_1 = require("./component");
const project_1 = require("./project");
class NotImplemented extends Error {
    constructor() {
        super('Not implemented');
    }
}
class FileSystem extends component_1.Component {
    get project() { return this.resolve(project_1.Project); }
    createFile(_path, _buffer) { throw new NotImplemented(); }
    readFile(_path) { throw new NotImplemented(); }
    readFileSync(_path) { throw new NotImplemented(); }
    updateFile(_path, _buffer) { throw new NotImplemented(); }
    deleteFile(_path) { throw new NotImplemented(); }
    existsSync(_path) { throw new NotImplemented(); }
    getPath(path) {
        return (0, path_1.join)(this.project.rootFolder, ...path);
    }
}
exports.FileSystem = FileSystem;
class MockFileSystem extends FileSystem {
    constructor() {
        super(...arguments);
        this.files = {};
    }
    async createFile(path, buffer) {
        this.files[this.getPath(path)] = buffer;
    }
    async readFile(path) {
        const result = this.files[this.getPath(path)];
        if (result) {
            return result;
        }
        throw new Error(`File doesn't exists : ${this.getPath(path)}`);
    }
    readFileSync(path) {
        const result = this.files[this.getPath(path)];
        if (result) {
            return result;
        }
        throw new Error(`File doesn't exists : ${this.getPath(path)}`);
    }
    existsSync(path) {
        return this.files[this.getPath(path)] !== undefined;
    }
    async updateFile(path, buffer) {
        this.files[this.getPath(path)] = buffer;
    }
    async deleteFile(path) {
        delete this.files[this.getPath(path)];
    }
}
exports.MockFileSystem = MockFileSystem;
class LocalFileSystem extends FileSystem {
    async createFile(path, buffer) {
        await fs_1.promises.mkdir(this.getPath(path.slice(0, -1)), { recursive: true });
        return fs_1.promises.writeFile(this.getPath(path), buffer);
    }
    async readFile(path) {
        return fs_1.promises.readFile(this.getPath(path));
    }
    readFileSync(path) {
        return (0, fs_1.readFileSync)(this.getPath(path));
    }
    existsSync(path) {
        return (0, fs_1.existsSync)(this.getPath(path));
    }
    async updateFile(path, buffer) {
        return fs_1.promises.writeFile(this.getPath(path), buffer);
    }
    async deleteFile(path) {
        return fs_1.promises.unlink(this.getPath(path));
    }
}
exports.LocalFileSystem = LocalFileSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWxlc3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJCQUE4RDtBQUM5RCwrQkFBNEI7QUFDNUIsMkNBQXdDO0FBQ3hDLHVDQUFvQztBQUVwQyxNQUFNLGNBQWUsU0FBUSxLQUFLO0lBQ2hDO1FBQ0UsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBRUQsTUFBYSxVQUFXLFNBQVEscUJBQVM7SUFFdkMsSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFPLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFOUMsVUFBVSxDQUFDLEtBQWUsRUFBRSxPQUFlLElBQW1CLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0YsUUFBUSxDQUFDLEtBQWUsSUFBcUIsTUFBTSxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxRSxZQUFZLENBQUMsS0FBZSxJQUFZLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckUsVUFBVSxDQUFDLEtBQWUsRUFBRSxPQUFlLElBQW1CLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0YsVUFBVSxDQUFDLEtBQWUsSUFBbUIsTUFBTSxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUxRSxVQUFVLENBQUMsS0FBZSxJQUFhLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFMUQsT0FBTyxDQUFDLElBQWM7UUFDOUIsT0FBTyxJQUFBLFdBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRjtBQWZELGdDQWVDO0FBRUQsTUFBYSxjQUFlLFNBQVEsVUFBVTtJQUE5Qzs7UUFD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QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FFRjtBQTNCRCwwQ0EyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGV4aXN0c1N5bmMsIHByb21pc2VzIGFzIGZzLCByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuY2xhc3MgTm90SW1wbGVtZW50ZWQgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlsZVN5c3RlbSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgZ2V0IHByb2plY3QoKSB7IHJldHVybiB0aGlzLnJlc29sdmUoUHJvamVjdCkgfVxuXG4gIGNyZWF0ZUZpbGUoX3BhdGg6IHN0cmluZ1tdLCBfYnVmZmVyOiBCdWZmZXIpOiBQcm9taXNlPHZvaWQ+IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkKCk7IH1cbiAgcmVhZEZpbGUoX3BhdGg6IHN0cmluZ1tdKTogUHJvbWlzZTxCdWZmZXI+IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkKCk7IH1cbiAgcmVhZEZpbGVTeW5jKF9wYXRoOiBzdHJpbmdbXSk6IEJ1ZmZlciB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZCgpOyB9XG4gIHVwZGF0ZUZpbGUoX3BhdGg6IHN0cmluZ1tdLCBfYnVmZmVyOiBCdWZmZXIpOiBQcm9taXNlPHZvaWQ+IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkKCk7IH1cbiAgZGVsZXRlRmlsZShfcGF0aDogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkKCk7IH1cblxuICBleGlzdHNTeW5jKF9wYXRoOiBzdHJpbmdbXSk6IGJvb2xlYW4geyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWQoKTsgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXRoKHBhdGg6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGpvaW4odGhpcy5wcm9qZWN0LnJvb3RGb2xkZXIsIC4uLnBhdGgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb2NrRmlsZVN5c3RlbSBleHRlbmRzIEZpbGVTeXN0ZW0ge1xuICBwcml2YXRlIGZpbGVzIDogUmVjb3JkPHN0cmluZywgQnVmZmVyPiA9IHt9O1xuXG4gIGFzeW5jIGNyZWF0ZUZpbGUocGF0aDogc3RyaW5nW10sIGJ1ZmZlcjogQnVmZmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5maWxlc1t0aGlzLmdldFBhdGgocGF0aCldID0gYnVmZmVyO1xuICB9XG5cbiAgYXN5bmMgcmVhZEZpbGUocGF0aDogc3RyaW5nW10pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZmlsZXNbdGhpcy5nZXRQYXRoKHBhdGgpXTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgZG9lc24ndCBleGlzdHMgOiAke3RoaXMuZ2V0UGF0aChwYXRoKX1gKTtcbiAgfVxuXG4gIHJlYWRGaWxlU3luYyhwYXRoOiBzdHJpbmdbXSk6IEJ1ZmZlciB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5maWxlc1t0aGlzLmdldFBhdGgocGF0aCldO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBkb2Vzbid0IGV4aXN0cyA6ICR7dGhpcy5nZXRQYXRoKHBhdGgpfWApO1xuICB9XG5cbiAgZXhpc3RzU3luYyhwYXRoOiBzdHJpbmdbXSk6IGJvb2xlYW4geyBcbiAgICByZXR1cm4gdGhpcy5maWxlc1t0aGlzLmdldFBhdGgocGF0aCldICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBhc3luYyB1cGRhdGVGaWxlKHBhdGg6IHN0cmluZ1tdLCBidWZmZXI6IEJ1ZmZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZmlsZXNbdGhpcy5nZXRQYXRoKHBhdGgpXSA9IGJ1ZmZlcjtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUZpbGUocGF0aDogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBkZWxldGUgdGhpcy5maWxlc1t0aGlzLmdldFBhdGgocGF0aCldO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbEZpbGVTeXN0ZW0gZXh0ZW5kcyBGaWxlU3lzdGVtIHtcblxuICBhc3luYyBjcmVhdGVGaWxlKHBhdGg6IHN0cmluZ1tdLCBidWZmZXI6IEJ1ZmZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZzLm1rZGlyKHRoaXMuZ2V0UGF0aChwYXRoLnNsaWNlKDAsIC0xKSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIHJldHVybiBmcy53cml0ZUZpbGUodGhpcy5nZXRQYXRoKHBhdGgpLCBidWZmZXIpO1xuICB9XG5cbiAgYXN5bmMgcmVhZEZpbGUocGF0aDogc3RyaW5nW10pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZSh0aGlzLmdldFBhdGgocGF0aCkpO1xuICB9XG5cbiAgcmVhZEZpbGVTeW5jKHBhdGg6IHN0cmluZ1tdKTogQnVmZmVyIHtcbiAgICByZXR1cm4gcmVhZEZpbGVTeW5jKHRoaXMuZ2V0UGF0aChwYXRoKSk7XG4gIH1cblxuICBleGlzdHNTeW5jKHBhdGg6IHN0cmluZ1tdKTogYm9vbGVhbiB7IFxuICAgIHJldHVybiBleGlzdHNTeW5jKHRoaXMuZ2V0UGF0aChwYXRoKSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVGaWxlKHBhdGg6IHN0cmluZ1tdLCBidWZmZXI6IEJ1ZmZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBmcy53cml0ZUZpbGUodGhpcy5nZXRQYXRoKHBhdGgpLCBidWZmZXIpO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlRmlsZShwYXRoOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBmcy51bmxpbmsodGhpcy5nZXRQYXRoKHBhdGgpKTtcbiAgfVxuXG59Il19
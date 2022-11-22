"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const child_process = __importStar(require("child_process"));
const component_1 = require("./component");
const logger_1 = require("./logger");
const project_1 = require("./project");
const MAX_BUFFER = 10 * 1024 * 1024;
class Executor extends component_1.Component {
    get project() { return this.resolve(project_1.Project); }
    get logger() { return this.resolve(logger_1.Logger); }
    /**
     * Executes a command with STDOUT > STDERR.
     */
    exec(command) {
        this.logger.verbose('Exec', this.project.rootFolder, command);
        child_process.execSync(command, {
            stdio: [
                'inherit',
                process.stderr,
                'pipe', // auto passthrough of std err
            ],
            maxBuffer: MAX_BUFFER,
            cwd: this.project.rootFolder,
        });
    }
    /**
     * Executes command and returns STDOUT. If the command fails (non-zero), throws an error.
     */
    execCapture(command) {
        this.logger.verbose('Exec Capture', this.project.rootFolder, command);
        return child_process.execSync(command, {
            stdio: [
                'inherit',
                'pipe',
                'pipe', // auto passthrough of std err
            ],
            maxBuffer: MAX_BUFFER,
            cwd: this.project.rootFolder,
        });
    }
    /**
     * Executes `command` and returns its value or undefined if the command failed.
     */
    execOrUndefined(command) {
        try {
            this.logger.verbose('Exec Undefined', this.project.rootFolder, command);
            const value = child_process.execSync(command, {
                stdio: [
                    'inherit',
                    'pipe',
                    'pipe', // auto passthrough of std err
                ],
                maxBuffer: MAX_BUFFER,
                cwd: this.project.rootFolder,
            }).toString('utf-8').trim();
            if (!value) {
                return undefined;
            } // an empty string is the same as undefined
            return value;
        }
        catch (_a) {
            return undefined;
        }
    }
}
exports.Executor = Executor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZXhlY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBK0M7QUFDL0MsMkNBQXdDO0FBQ3hDLHFDQUFrQztBQUNsQyx1Q0FBb0M7QUFFcEMsTUFBTSxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7QUFFcEMsTUFBYSxRQUFTLFNBQVEscUJBQVM7SUFFckMsSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFPLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDOUMsSUFBSSxNQUFNLEtBQUssT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUU1Qzs7T0FFRztJQUNILElBQUksQ0FBQyxPQUFlO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5RCxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUM5QixLQUFLLEVBQUU7Z0JBQ0wsU0FBUztnQkFDVCxPQUFPLENBQUMsTUFBTTtnQkFDZCxNQUFNLEVBQUUsOEJBQThCO2FBQ3ZDO1lBQ0QsU0FBUyxFQUFFLFVBQVU7WUFDckIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVTtTQUM3QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsT0FBZTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEUsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNyQyxLQUFLLEVBQUU7Z0JBQ0wsU0FBUztnQkFDVCxNQUFNO2dCQUNOLE1BQU0sRUFBRSw4QkFBOEI7YUFDdkM7WUFDRCxTQUFTLEVBQUUsVUFBVTtZQUNyQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBQyxPQUFlO1FBQzdCLElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN4RSxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDNUMsS0FBSyxFQUFFO29CQUNMLFNBQVM7b0JBQ1QsTUFBTTtvQkFDTixNQUFNLEVBQUUsOEJBQThCO2lCQUN2QztnQkFDRCxTQUFTLEVBQUUsVUFBVTtnQkFDckIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVTthQUM3QixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTVCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQUUsT0FBTyxTQUFTLENBQUM7YUFBRSxDQUFDLDJDQUEyQztZQUM3RSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQUMsV0FBTTtZQUNOLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztDQUVGO0FBNURELDRCQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuY29uc3QgTUFYX0JVRkZFUiA9IDEwICogMTAyNCAqIDEwMjQ7XG5cbmV4cG9ydCBjbGFzcyBFeGVjdXRvciBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgZ2V0IHByb2plY3QoKSB7IHJldHVybiB0aGlzLnJlc29sdmUoUHJvamVjdCkgfVxuICBnZXQgbG9nZ2VyKCkgeyByZXR1cm4gdGhpcy5yZXNvbHZlKExvZ2dlcikgfVxuICBcbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgY29tbWFuZCB3aXRoIFNURE9VVCA+IFNUREVSUi5cbiAgICovXG4gIGV4ZWMoY29tbWFuZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIudmVyYm9zZSgnRXhlYycsIHRoaXMucHJvamVjdC5yb290Rm9sZGVyLCBjb21tYW5kKTtcbiAgICBjaGlsZF9wcm9jZXNzLmV4ZWNTeW5jKGNvbW1hbmQsIHtcbiAgICAgIHN0ZGlvOiBbXG4gICAgICAgICdpbmhlcml0JywgLy8gUGFzcyBhbnkgaW5wdXQgdG8gc3RkaW5cbiAgICAgICAgcHJvY2Vzcy5zdGRlcnIsIC8vIG91dHB1dCBhbnkgbm9ybWFsIG91dHB1dCBvZiB0aGUgY2hpbGQgcHJvY2VzcyB0byBzdGRlcnJcbiAgICAgICAgJ3BpcGUnLCAvLyBhdXRvIHBhc3N0aHJvdWdoIG9mIHN0ZCBlcnJcbiAgICAgIF0sXG4gICAgICBtYXhCdWZmZXI6IE1BWF9CVUZGRVIsXG4gICAgICBjd2Q6IHRoaXMucHJvamVjdC5yb290Rm9sZGVyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGNvbW1hbmQgYW5kIHJldHVybnMgU1RET1VULiBJZiB0aGUgY29tbWFuZCBmYWlscyAobm9uLXplcm8pLCB0aHJvd3MgYW4gZXJyb3IuXG4gICAqL1xuICBleGVjQ2FwdHVyZShjb21tYW5kOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxvZ2dlci52ZXJib3NlKCdFeGVjIENhcHR1cmUnLCB0aGlzLnByb2plY3Qucm9vdEZvbGRlciwgY29tbWFuZCk7XG4gICAgcmV0dXJuIGNoaWxkX3Byb2Nlc3MuZXhlY1N5bmMoY29tbWFuZCwge1xuICAgICAgc3RkaW86IFtcbiAgICAgICAgJ2luaGVyaXQnLCAvLyBQYXNzIGFueSBpbnB1dCB0byBzdGRpblxuICAgICAgICAncGlwZScsIC8vIG91dHB1dCBzdGRvdXQgdG8gY3VycmVudCBzdGRvdXQgc28gd2UgY2FuIGNhcHR1cmUgaXRcbiAgICAgICAgJ3BpcGUnLCAvLyBhdXRvIHBhc3N0aHJvdWdoIG9mIHN0ZCBlcnJcbiAgICAgIF0sXG4gICAgICBtYXhCdWZmZXI6IE1BWF9CVUZGRVIsXG4gICAgICBjd2Q6IHRoaXMucHJvamVjdC5yb290Rm9sZGVyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGBjb21tYW5kYCBhbmQgcmV0dXJucyBpdHMgdmFsdWUgb3IgdW5kZWZpbmVkIGlmIHRoZSBjb21tYW5kIGZhaWxlZC5cbiAgICovXG4gIGV4ZWNPclVuZGVmaW5lZChjb21tYW5kOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKCdFeGVjIFVuZGVmaW5lZCcsIHRoaXMucHJvamVjdC5yb290Rm9sZGVyLCBjb21tYW5kKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gY2hpbGRfcHJvY2Vzcy5leGVjU3luYyhjb21tYW5kLCB7XG4gICAgICAgIHN0ZGlvOiBbXG4gICAgICAgICAgJ2luaGVyaXQnLCAvLyBQYXNzIGFueSBpbnB1dCB0byBzdGRpblxuICAgICAgICAgICdwaXBlJywgLy8gb3V0cHV0IHN0ZG91dCB0byBjdXJyZW50IHN0ZG91dCBzbyB3ZSBjYW4gY2FwdHVyZSBpdFxuICAgICAgICAgICdwaXBlJywgLy8gYXV0byBwYXNzdGhyb3VnaCBvZiBzdGQgZXJyXG4gICAgICAgIF0sXG4gICAgICAgIG1heEJ1ZmZlcjogTUFYX0JVRkZFUixcbiAgICAgICAgY3dkOiB0aGlzLnByb2plY3Qucm9vdEZvbGRlcixcbiAgICAgIH0pLnRvU3RyaW5nKCd1dGYtOCcpLnRyaW0oKTtcblxuICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IC8vIGFuIGVtcHR5IHN0cmluZyBpcyB0aGUgc2FtZSBhcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbn0iXX0=
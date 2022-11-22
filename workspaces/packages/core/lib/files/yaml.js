"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlFile = void 0;
const object_1 = require("./object");
const yaml_1 = __importDefault(require("yaml"));
class YamlFile extends object_1.ObjectFile {
    generateContent(object) {
        const yamlContent = yaml_1.default.stringify(object, null, 2);
        return Buffer.from(yamlContent, 'utf-8');
    }
}
exports.YamlFile = YamlFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWxlcy95YW1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUFzQztBQUN0QyxnREFBd0I7QUFFeEIsTUFBYSxRQUFTLFNBQVEsbUJBQVU7SUFDdEMsZUFBZSxDQUFDLE1BQVc7UUFDekIsTUFBTSxXQUFXLEdBQUcsY0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBTkQsNEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RGaWxlIH0gZnJvbSBcIi4vb2JqZWN0XCI7XG5pbXBvcnQgWUFNTCBmcm9tICd5YW1sJztcblxuZXhwb3J0IGNsYXNzIFlhbWxGaWxlIGV4dGVuZHMgT2JqZWN0RmlsZSB7XG4gIGdlbmVyYXRlQ29udGVudChvYmplY3Q6IGFueSk6IEJ1ZmZlciB7XG4gICAgY29uc3QgeWFtbENvbnRlbnQgPSBZQU1MLnN0cmluZ2lmeShvYmplY3QsIG51bGwsIDIpO1xuXG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHlhbWxDb250ZW50LCAndXRmLTgnKTtcbiAgfVxufSJdfQ==
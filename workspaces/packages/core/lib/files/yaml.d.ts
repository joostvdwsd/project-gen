/// <reference types="node" />
import { ObjectFile } from "./object";
export declare class YamlFile extends ObjectFile {
    generateContent(object: any): Buffer;
}

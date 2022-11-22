/// <reference types="node" />
import { ObjectFile } from './object';
export declare class JsonFile extends ObjectFile {
    generateContent(object: any): Buffer;
}

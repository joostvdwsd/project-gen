import { File } from './file';
export declare class TextFile extends File {
    lines: string[];
    synthesize(): Promise<void>;
}

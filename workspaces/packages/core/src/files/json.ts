import { ObjectFile } from './object';

export class JsonFile extends ObjectFile {
  generateContent(object: any): Buffer {
    const jsonContent = JSON.stringify(object, null, 2);

    return Buffer.from(jsonContent, 'utf-8');
  }
}
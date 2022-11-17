import { ObjectFile } from "./object";
import YAML from 'yaml';

export class YamlFile extends ObjectFile {
  generateContent(object: any): Buffer {
    const yamlContent = YAML.stringify(object, null, 2);

    return Buffer.from(yamlContent, 'utf-8');
  }
}
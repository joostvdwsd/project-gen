import { JsonFile } from "../files";
import { Component, FileSystem } from "../utils";

export class PackageJson extends Component {
  public raw: any;  

  constructor(parent: Component) {
    super(parent);
    
    const fileSystem = this.resolve(FileSystem);

    const location = ['package.json'];

    if (fileSystem.existsSync(location)) {

      const jsonContent = fileSystem.readFileSync(location).toString('utf-8');

      this.raw = JSON.parse(jsonContent);
    } else {
      this.raw = {};
    }

    new JsonFile(this, {
      path: location,
      object: () => this.raw
    })
  }

  addScript(name: string, content: string) {
    if (!this.raw.scripts) {
      this.raw.scripts = {}
    }
    this.raw.scripts[name] = content;
  }
}
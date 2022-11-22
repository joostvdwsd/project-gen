import { JsonFile } from "../files";
import { RootComponent, FileSystem, SingletonComponent } from "../utils";

export class PackageJson extends SingletonComponent {
  public raw: any;  

  constructor(parent: RootComponent) {
    super(parent);
    
    const fileSystem = this.resolve(FileSystem);

    const location = ['package.json'];

    if (fileSystem.existsSync(location)) {

      const jsonContent = fileSystem.readFileSync(location).toString('utf-8');

      this.raw = JSON.parse(jsonContent);
    } else {
      this.raw = {};
    }

    new JsonFile(this, 'package.json', {
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
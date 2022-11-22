import { TextFile } from "../files";
import { RootComponent, SingletonComponent } from "../utils/component";

export interface GitAttributesProps {
  readonly patterns: string[];
}

export class GitAttributes extends SingletonComponent {
  private file: TextFile;

  constructor(parent: RootComponent, props?: GitAttributesProps) {
    super(parent);

    this.file = new TextFile(this, '.gitattributes', {
      path: ['.gitattributes'],
    });

    if (props?.patterns) {
      this.file.lines.push(...props.patterns);
    }
  }

  addPattern(...patterns: string[]) {
    this.file.lines.push(...patterns);
  }
}
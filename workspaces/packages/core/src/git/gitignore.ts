import { TextFile } from "../files";
import { RootComponent, SingletonComponent } from "../utils/component";

export interface GitIgnoreProps {
  readonly patterns: string[];
}

export class GitIgnore extends SingletonComponent {
  private file: TextFile;

  constructor(parent: RootComponent, props?: GitIgnoreProps) {
    super(parent);
    this.file = new TextFile(this, '.gitignore', {
      path: ['.gitignore'],
    });

    if (props?.patterns) {
      this.file.lines.push(...props.patterns);
    }
  }

  addPattern(...patterns: string[]) {
    this.file.lines.push(...patterns);
  }
}
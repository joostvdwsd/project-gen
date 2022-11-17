import { TextFile } from "../files";
import { Component } from "../utils/component";

export interface GitIgnoreProps {
  readonly patterns: string[];
}

export class GitIgnore extends Component {
  private file: TextFile;

  constructor(props?: GitIgnoreProps) {
    super();
    this.file = new TextFile(this, {
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
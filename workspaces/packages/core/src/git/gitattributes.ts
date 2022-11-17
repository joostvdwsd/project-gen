import { TextFile } from "../files";
import { Component } from "../utils/component";

export interface GitAttributesProps {
  readonly patterns: string[];
}

export class GitAttributes extends Component {
  private file: TextFile;

  constructor(props?: GitAttributesProps) {
    super();
    this.file = new TextFile(this, {
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
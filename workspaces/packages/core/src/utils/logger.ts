import { Component } from './component';

export class Logger extends Component {

  verbose(...text: any[]) {
    console.log(...text);
  }
}
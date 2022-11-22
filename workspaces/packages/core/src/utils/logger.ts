import { SingletonComponent } from './component';

export class Logger extends SingletonComponent {

  verbose(...text: any[]) {
    console.log(...text);
  }
}
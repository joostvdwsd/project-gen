import * as child_process from 'child_process';
import { SingletonComponent } from './component';
import { Logger } from './logger';
import { Project } from './project';

const MAX_BUFFER = 10 * 1024 * 1024;

export class Executor extends SingletonComponent {

  get project() { return this.resolve(Project) }
  get logger() { return this.resolve(Logger) }
  
  /**
   * Executes a command with STDOUT > STDERR.
   */
  exec(command: string): void {
    this.logger.verbose('Exec', this.project.rootFolder, command);
    child_process.execSync(command, {
      stdio: [
        'inherit', // Pass any input to stdin
        process.stderr, // output any normal output of the child process to stderr
        'pipe', // auto passthrough of std err
      ],
      maxBuffer: MAX_BUFFER,
      cwd: this.project.rootFolder,
    });
  }

  /**
   * Executes command and returns STDOUT. If the command fails (non-zero), throws an error.
   */
  execCapture(command: string) {
    this.logger.verbose('Exec Capture', this.project.rootFolder, command);
    return child_process.execSync(command, {
      stdio: [
        'inherit', // Pass any input to stdin
        'pipe', // output stdout to current stdout so we can capture it
        'pipe', // auto passthrough of std err
      ],
      maxBuffer: MAX_BUFFER,
      cwd: this.project.rootFolder,
    });
  }

  /**
   * Executes `command` and returns its value or undefined if the command failed.
   */
  execOrUndefined(command: string): string | undefined {
    try {
      this.logger.verbose('Exec Undefined', this.project.rootFolder, command);
      const value = child_process.execSync(command, {
        stdio: [
          'inherit', // Pass any input to stdin
          'pipe', // output stdout to current stdout so we can capture it
          'pipe', // auto passthrough of std err
        ],
        maxBuffer: MAX_BUFFER,
        cwd: this.project.rootFolder,
      }).toString('utf-8').trim();

      if (!value) { return undefined; } // an empty string is the same as undefined
      return value;
    } catch {
      return undefined;
    }
  }

}
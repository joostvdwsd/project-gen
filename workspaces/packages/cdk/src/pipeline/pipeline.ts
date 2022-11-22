import { SingletonComponent } from "@project-gen/core";
import { PipelineStage } from "./pipeline-stage";

export interface StageOptions {
  stageEnvironment?: string;
  depends?: string | string[];
}

export class Pipeline extends SingletonComponent {
  addStage(_name: string, _stageOptions?: StageOptions) : PipelineStage {
    throw new Error('Not implemented');
  }
}
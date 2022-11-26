import { Component } from "@project-gen/core";
import { PipelineStage } from "./pipeline-stage-builder";

export interface StageOptions {
  environment?: string;
  depends?: string | string[];
}

export class PipelineBuilder extends Component {  
  addStage(_name: string, _stageOptions?: StageOptions) : PipelineStage {
    throw new Error('Not implemented');
  }
}
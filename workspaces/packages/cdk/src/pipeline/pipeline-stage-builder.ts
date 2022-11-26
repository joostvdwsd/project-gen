import { PipelineStepList } from "./steps";

export interface PipelineStage {
  name: string;

  setup: PipelineStepList;
  preExecute: PipelineStepList;
  execute: PipelineStepList;
  postExecute: PipelineStepList;
  tearDown: PipelineStepList;
}
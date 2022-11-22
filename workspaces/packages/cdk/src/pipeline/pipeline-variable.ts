
export interface PipelineDynamicVariable {
  renderEnvironmentVariable() : string;
}

export type PipelineVariable = string | PipelineDynamicVariable;
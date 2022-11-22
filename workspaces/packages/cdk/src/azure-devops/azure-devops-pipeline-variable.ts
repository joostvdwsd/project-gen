import { PipelineDynamicVariable } from "../pipeline/pipeline-variable";
import { AzureDevops } from "./azure-devops-schema";

export interface AzureDevopsVariableHolder {
  variables: AzureDevops.VariableItem[];
}

export class AzureDevopsGroupVariable implements PipelineDynamicVariable {
  mappingVariableName : string;

  constructor(parent: AzureDevopsVariableHolder, groupName: string, variableName: string) {
    const groupVariable : AzureDevops.VariableGroup = {
      group: groupName
    }
    parent.variables.push(groupVariable);

    this.mappingVariableName = `PG_AZDO_GROUP_MAPPING_${parent.variables.length}`;

    const mappingVariable : AzureDevops.VariableNameValue = {
      name: this.mappingVariableName,
      value: `\$${variableName}`
    }
    parent.variables.push(mappingVariable);    
  }
  renderEnvironmentVariable(): string {
    return `\${{ variables.${this.mappingVariableName} }}`
  }
}
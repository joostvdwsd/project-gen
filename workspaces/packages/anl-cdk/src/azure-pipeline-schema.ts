
export interface BuildJob {

}

export interface DeployJob {

}


export type Job = BuildJob | DeployJob;

export interface Stage {

}

export interface Pipeline {
  stages: Stage[];
}
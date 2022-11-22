export namespace AzureDevops {

  export interface TemplateReference {

    /*****
      * Required as first property. Reference to a template for this step. 
      */
    template: string;

    /*****
      * Parameters used in a step template
      */
    parameters?: Record<string, string>;
  }

  export interface ResourceContainerMount {

    /*****
      * Mount the work directory as readonly.  (false,n,no,off,on,true,y,yes)
      */
    work?: boolean;

    /*****
      * Mount the externals directory as readonly.  (false,n,no,off,on,true,y,yes)
      */
    externals?: boolean;

    /*****
      * Mount the tools directory as readonly.  (false,n,no,off,on,true,y,yes)
      */
    tools?: boolean;

    /*****
      * Mount the tasks directory as readonly.  (false,n,no,off,on,true,y,yes)
      */
    tasks?: boolean;
  }

  export interface Container {

    /*****
      * Required. Container image tag. 
      */
    image: string;

    /*****
      * ID of the service endpoint connecting to a private container registry. 
      */
    endpoint?: string;

    /*****
      * # Variables to map into the container's environment
      */
    env?: Record<string, string>;

    /*****
      * Set this flag to false to force the agent not to setup the /var/run/docker.sock volume on container jobs.  (false,n,no,off,on,true,y,yes)
      */
    mapDockerSocket?: boolean;

    /*****
      * Options to pass into container host. 
      */
    options?: string;

    /*****
      * Ports to expose on the container. 
      */
    ports?: string[];

    /*****
      * Volumes to mount on the container. 
      */
    volumes?: string[];

    /*****
      * Volumes to mount read-only, the default is all false.  
      */
    mountReadOnly?: ResourceContainerMount;
  }

  export interface ResourceContainer extends Container {

    /*****
      * Required as first property. ID for the container.  ([-_A-Za-z0-9]*)
      */
    container: string;

    /*****
      * Type of the registry like ACR or GCR.
      */
    type?: string;

    /*****
      * # none to disable, true to trigger on all image tags, or full syntax (see the following examples).
      */
    trigger?: 'none' | true;

    /*****
      * Azure subscription (ARM service connection) for container registry. 
      */
    azureSubscription?: string;

    /*****
      * Resource group for your ACR. 
      */
    resourceGroup?: string;

    /*****
      * Registry for container images. 
      */
    registry?: string;

    /*****
      * Name of the container image repository in ACR. 
      */
    repository?: string;
  }

  export interface ResourceRepository {

    /*****
      * Required as first property. Alias for the specified repository.  ([-_A-Za-z0-9]*)
      */
    repository: string;

    /*****
      * ID of the service endpoint connecting to this repository. 
      */
    endpoint: string;

    /*****
      * CI trigger for this repository, no CI trigger if skipped (only works for Azure Repos).
      */
    trigger?: Trigger;

    /*****
      * repository name (format depends on `type`); does not accept variables. 
      */
    name: string;

    /*****
      * Type of repository: `git`, `github`, `githubenterprise`, and `bitbucket`. 
      */
    type?: 'git' | 'github' | 'githubenterprise' | 'bitbucket';

    /*****
      * ref name to checkout; defaults to 'refs/heads/main'. The branch checked out by default whenever the resource trigger fires. Does not accept variables. 
      */
    ref?: string;
  }

  export interface Resources {
    builds: unknown[];
    containers: ResourceContainer[];
    pipelines: unknown[];
    repositories: ResourceRepository[];
    webhooks: unknown[];
    packages: unknown[];
  }

  export interface VariableGroup {
    group: string;
  }

  export interface VariableNameValue {
    name: string;
    value: string;
  }

  export type VariableItem = VariableGroup | VariableNameValue;

  export type Variables = Record<string, string> | VariableItem[];

  export interface ScheduleCron {

    /*****
      * Required as first property. Cron syntax defining a schedule in UTC time.. 
      */
    cron: string;

    /*****
      * Optional friendly name given to a specific schedule.. 
      */
    displayName?: string;
    branches?: IncludeExcludeList

    /*****
      * Whether to run the pipeline if the previously scheduled run is in-progress; the default is false..  (false,n,no,off,on,true,y,yes)
      */
    batch?: boolean;

    /*****
      * Whether to always run the pipeline or only if there have been source code changes since the last successful scheduled run; the default is false..  (false,n,no,off,on,true,y,yes)
      */
    always?: boolean;
  }

  export interface IncludeExcludeList {
    include?: string[];
    exclude?: string[];
  }

  export interface TriggerType {

    /*****
      * Whether to batch changes per branch.  (false,n,no,off,on,true,y,yes)
      */
    batch?: boolean;

    /*****
      * Branch names to include or exclude for triggering a run.
      */
    branches?: IncludeExcludeList;

    /*****
      * File paths to include or exclude for triggering a run.
      */
    paths?: IncludeExcludeList;

    /*****
      * Tag names to include or exclude for triggering a run.
      */
    tags?: IncludeExcludeList;
  }

  export type Trigger = 'none' | string[] | TriggerType;

  export type ParameterType =
    'boolean' | 'container' | 'containerList' | 'deployment' | 'deploymentList' | 'environment' | 'filePath' | 'job' | 'jobList' | 'number' |
    'object' | 'pool' | 'secureFile' | 'serviceConnection' | 'stage' | 'stageList' | 'step' | 'stepList' | 'string';

  export interface Parameter {

    /*****
      * Required as first property. Parameter name.. 
      */
    name: string;

    /*****
      * Human-readable name for the parameter. 
      */
    displayName?: string;

    /*****
      * Parameter type. Required..  (boolean,container,containerList,deployment,deploymentList,environment,filePath,job,jobList,number,object,pool,secureFile,serviceConnection,stage,stageList,step,stepList,string)
      */
    type: ParameterType;
    default?: any
    /*****
      * Default value if none is specified.
      */
    values?: string[]
    /*****
      * Allowed parameter values. 
      */
  }

  export interface WorkspaceOptions {

    /*****
      * Which parts of the workspace should be scorched before fetching.  (outputs, resources, all)
      */
    clean: 'outputs' | 'resources' | 'all';
  }

  export interface JobUses {

    /*****
      * Repository references 
      */
    repositories: string[];

    /*****
      * Pool references 
      */
    pools: string[];
  }

  export interface StepBase {

    /*****
      * Evaluate this condition expression to determine whether to run this task. 
      */
    condition?: string;

    /*****
      * Continue running even on failure?.  (false,n,no,off,on,true,y,yes)
      */
    continueOnError?: boolean;

    /*****
      * Human-readable name for the task. 
      */
    displayName?: string;

    /*****
      * Environment in which to run this task
      */
    target?: string;

    /*****
      * Run this task when the job runs?.  (false,n,no,off,on,true,y,yes)
      */
    enabled?: boolean;
    env?: Record<string, string>;

    /*****
      * ID of the step.
      */
    name?: string;

    /*****
      * Time to wait for this task to complete before the server kills it. 
      */
    timeoutInMinutes?: number;

    /*****
      * Number of retries if the task fails. 
      */
    retryCountOnTaskFailure?: number;
  }

  export interface StepTask extends StepBase {
    task: string;
    inputs?: Record<string, string>;
  }

  export interface StepScript extends StepBase {

    /*****
      * Required as first property. An inline script. 
      */
    script: string;

    /*****
      * Fail the task if output is sent to Stderr?. 
      */
    failOnStderr?: boolean;

    /*****
      * Start the script with this working directory. 
      */
    workingDirectory?: string;
  }

  export interface StepPowerShell extends StepBase {

    /*****
      * Required as first property. Inline PowerShell or reference to a PowerShell file. 
      */
    powershell: string;

    /*****
      * Unless otherwise specified, the error action preference defaults to the value stop. See the following section for more information.. 
      */
    errorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';

    /*****
      * Fail the task if output is sent to Stderr?. 
      */
    failOnStderr?: boolean;

    /*****
      * Check the final exit code of the script to determine whether the step succeeded?. 
      */
    ignoreLASTEXITCODE?: boolean;

    /*****
      * Start the script with this working directory. 
      */
    workingDirectory?: string;
  }

  export interface StepPwsh extends StepBase {

    /*****
      * Required as first property. Inline PowerShell or reference to a PowerShell file. 
      */
    pwsh: string;

    /*****
      * Unless otherwise specified, the error action preference defaults to the value stop. See the following section for more information.. 
      */
    errorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';

    /*****
      * Fail the task if output is sent to Stderr?. 
      */
    failOnStderr?: boolean;

    /*****
      * Check the final exit code of the script to determine whether the step succeeded?. 
      */
    ignoreLASTEXITCODE?: boolean;

    /*****
      * Start the script with this working directory. 
      */
    workingDirectory?: string;
  }

  export interface StepBash extends StepBase {

    /*****
      * Required as first property. An inline script. 
      */
    bash: string;

    /*****
      * Fail the task if output is sent to Stderr?. 
      */
    failOnStderr?: boolean;

    /*****
      * Start the script with this working directory. 
      */
    workingDirectory?: string;
  }

  export interface StepCheckOut extends StepBase {

    /*****
      * Required as first property. Alias of the repository resource to check out or 'none'. 
      */
    checkout: string;

    /*****
      * If true, run git clean -ffdx followed by git reset --hard HEAD before fetching.  (true, false)
      */
    clean?: boolean;

    /*****
      * Depth of Git graph to fetch. 
      */
    fetchDepth?: number;

    /*****
      * Set to 'true' to sync tags when fetching the repo, or 'false' to not sync tags. See remarks for the default behavior.. 
      */
    fetchTags?: boolean;

    /*****
      * set to 'true' to download Git-LFS files. Default is not to download them.
      */
    lfs?: boolean;

    /*****
      * set to 'true' to leave the OAuth token in the Git config after the initial fetch. The default is not to leave it.
      */
    persistCredentials?: boolean;

    /*****
      * set to 'true' for a single level of submodules or 'recursive' to get submodules of submodules. Default is not to fetch submodules.
      */
    submodules?: true | 'recursive';

    /*****
      * Where to put the repository. The root directory is $(Pipeline.Workspace). 
      */
    path?: string;
  }

  export interface StepDownload extends StepBase {

    /*****
      * Required as first property. Specify current, pipeline resource identifier, or none to disable automatic download. 
      */
    download: string;

    /*****
      * Artifact name.. 
      */
    artifact?: string;

    /*****
      * Pattern to download files from artifact. 
      */
    patterns?: string;
  }

  export interface StepDownloadBuild extends StepBase {

    /*****
      * Required as first property. ID for the build resource. 
      */
    downloadBuild: string;

    /*****
      * Artifact name.. 
      */
    artifact?: string;

    /*****
      * Path to download the artifact into. 
      */
    path?: string;

    /*****
      * Downloads the files which matches the patterns. 
      */
    patterns?: string;
  }

  export interface StepGetPackage extends StepBase {

    /*****
      * # Required as first property. ID for the package resource. 
      */
    getPackage: string;

    /*****
      * # Path to download the package into. 
      */
    path?: string;
  }

  export interface StepPublish extends StepBase {

    /*****
      * Required as first property. The publish step is a shortcut for the PublishPipelineArtifact@1 task. The task publishes (uploads) a file or folder as a pipeline artifact that other jobs and pipelines can consume.. 
      */
    publish: string;

    /*****
      * Artifact name.. 
      */
    artifact: string;
  }

  export interface StepRestoreCache extends StepBase {

    /*****
      * Required as first property. The name of the key. 
      */
    restoreCache: string;

    /*****
      * Required. The folder path to download the cache to. This can be a fully-qualified path or a path relative to the root of the repository. Wildcards are not supported.. 
      */
    path: string;
  }

  export interface StepSaveCache extends StepBase {

    /*****
      * Required as first property. The name of the key. 
      */
    saveCache: string;

    /*****
      * Required. The folder or file path to publish. This can be a fully-qualified path or a path relative to the root of the repository. Wildcards are not supported.. 
      */
    path: string;
  }

  export interface StepReviewApp extends StepBase {

    /*****
      * Required as first property. Use this task under deploy phase provider to create a resource dynamically.. 
      */
    reviewApp: string;
  }

  export type Step = TemplateReference | StepBash | StepCheckOut | StepDownload | StepDownloadBuild | StepGetPackage | StepPowerShell
    | StepPublish | StepPwsh | StepRestoreCache | StepReviewApp | StepSaveCache | StepScript | StepTask;

  export interface JobBase {

    /*****
      * Human-readable name for the job. 
      */
    displayName?: string;

    /*****
      * Any jobs which must complete before this one
      */
    dependsOn?: string | string[];

    /*****
      * Evaluate this condition expression to determine whether to run this job. 
      */
    condition?: string;

    /*****
      * Continue running even on failure?. 
      */
    continueOnError?: boolean;

    /*****
      * Time to wait for this job to complete before the server kills it. 
      */
    timeoutInMinutes?: number;

    /*****
      * Time to wait for the job to cancel before forcibly terminating it. 
      */
    cancelTimeoutInMinutes?: number;

    /*****
      * Job-specific variables
      */
    variables?: Variables;

    /*****
      * Pool where this job will run
      */
    pool?: string;

    /*****
      * Container resource name
      */
    container?: string | Container;

    /*****
      * Container resources to run as a service container.
      */
    services?: Record<string, string>;

    /*****
      * Workspace options on the agent.
      */
    workspace?: WorkspaceOptions;

    /*****
      * Any resources required by this job that are not already referenced
      */
    uses?: JobUses;

    /*****
      * Job related information passed from a pipeline when extending a template. See remarks for more information.
      */
    templateContext?: unknown;
  }

  export interface JobBuildStrategyMatrix {
    matrix: Record<string, Record<string, string>>;
    maxParallel?: number
  }

  export interface JobBuildStrategyParallel {

    /*****
      * Run the job this many times. 
      */
    parallel: number;
  }

  export type JobBuildStrategy = JobBuildStrategyMatrix | JobBuildStrategyParallel;

  export interface JobBuild extends JobBase {

    /*****
      * Required as first property. ID of the job. Valid names may only contain alphanumeric characters and '_' and may not start with a number.
      */
    job: string;
    steps: Step[];

    /*****
      * Execution strategy for this job
      */
    strategy?: JobBuildStrategy;
  }

  export interface JobDeploymentEnvironmentType {

    /*****
      * Name of environment. 
      */
    name: string;

    /*****
      * Name of resource. 
      */
    resourceName?: string;

    /*****
      * Id of resource. 
      */
    resourceId?: number;

    /*****
      * Type of environment resource. 
      */
    resourceType?: string;

    /*****
      * List of tag filters. 
      */
    tags: string;
  }

  export type JobDeploymentEnvironment = string | JobDeploymentEnvironmentType;

  export interface JobDeploymentPhase {
    steps: Step[];
    pool?: string;
  }

  export interface JobDeploymentOnEvent {
    failure?: JobDeploymentPhase;
    success?: JobDeploymentPhase;
  }

  export interface JobDeploymentStrategyBase {
    preDeploy?: JobDeploymentPhase;
    deploy: JobDeploymentPhase;
    routeTraffic?: JobDeploymentPhase;
    postRouteTraffic?: JobDeploymentPhase;
    on?: JobDeploymentOnEvent;
  }

  export type JobDeploymentStrategyRunOnceDetail = JobDeploymentStrategyBase;

  export interface JobDeploymentStrategyRunOnce {
    runOnce: JobDeploymentStrategyRunOnceDetail;
  }

  export interface JobDeploymentStrategyRollingDetail extends JobDeploymentStrategyBase {

    /*****
      * Maximum number of jobs running in parallel. 
      */
    maxParallel: number;
  }

  export interface JobDeploymentStrategyRolling {
    rolling: JobDeploymentStrategyRollingDetail;
  }

  export interface JobDeploymentStrategyCanaryDetail extends JobDeploymentStrategyBase {

    /*****
      * # Maximum batch size for deployment 
      */
    increments: string[];
  }

  export interface JobDeploymentStrategyCanary {
    canary: JobDeploymentStrategyCanaryDetail;
  }

  export type JobDeploymentStrategy = JobDeploymentStrategyRunOnce | JobDeploymentStrategyRolling | JobDeploymentStrategyCanary;

  export interface JobDeployment {
    deployment: string;

    /*****
      * Target environment name and optionally a resource name to record the deployment history; format: environment-name.resource-name.
      */
    environment?: JobDeploymentEnvironment;

    /*****
      * Execution strategy for this deployment
      */
    strategy: JobDeploymentStrategy;
  }

  export type Job = TemplateReference | JobBuild | JobDeployment;

  export interface StageType {

    /*****
      * Required as first property. ID of the stage. 
      */
    stage: string;

    /*****
      * Human-readable name for the stage. 
      */
    displayName?: string;

    /*****
      * Pool where jobs in this stage will run unless otherwise specified
      */
    pool?: string;

    /*****
      * Any stages which must complete before this one
      */
    dependsOn?: string | string[];

    /*****
      * Evaluate this condition expression to determine whether to run this stage. 
      */
    condition?: string;

    /*****
      * Stage-specific variables
      */
    variables?: Variables;
    jobs: Job[];

    /*****
     * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests.  (runLatest,sequential)
     */
    lockBehavior?: 'runLatest' | 'sequential';

    /*****
      * Stage related information passed from a pipeline when extending a template. See remarks for more information.
      */
    templateContext?: unknown;
  }

  export type Stage = TemplateReference | StageType;

  export interface Pipeline {

    /*****
      * Pipeline run number.. 
      */
    name?: string;

    /*****
      * Pool where jobs in this pipeline will run unless otherwise specified
      */
    pool?: string;

    /*****
      * Append the commit message to the build number. The default is true.  (false,n,no,off,on,true,y,yes)
      */
    appendCommitMessageToRunName?: boolean;

    /*****
      * Continuous integration triggers
      */
    trigger?: Trigger;

    /*****
      * Parameters
      */
    parameters?: Parameter;

    /*****
      * Pull request triggers
      */
    pr?: Trigger;
    schedules?: ScheduleCron[];
    /*****
    * Containers and repositories used in the build
    */
    resources?: Resources;

    /*****
     * Variables for this pipeline
     */
    variables?: Variables;

    /*****
     * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests.  (runLatest,sequential)
     */
    lockBehavior?: 'runLatest' | 'sequential';
  }

  export interface PipelineStages extends Pipeline {
    stages: Stage[];
  }

  export interface PipelineJobs extends Pipeline {
    jobs: Job[];
  }

  export interface PipelineSteps extends Pipeline {
    steps: Step[];
  }
}

export type ClassType<T> = new (...args: [...any]) => T;

export class Component {

  private parent!: Component | null;

  protected allComponents: Component[] = [];

  protected children: Component[] = [];

  public setParent(parent: Component | null) {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  public getRoot(): Component {
    if (this.parent) {
      return this.parent.getRoot();
    }
    return this;
  }

  public find<T extends Component>(componentType: ClassType<T>): T | undefined {
    if (this instanceof componentType) {
      return this;
    }

    const result = this.children.find((component) => component instanceof componentType) as T;
    if (result) {
      return result;
    }

    const parentResult = this.parent?.find(componentType);

    if (parentResult) {
      return parentResult;
    }

    return this.getRoot().allComponents.find((component) => component instanceof componentType) as T;
  }

  public resolve<T extends Component>(componentType: ClassType<T>): T {
    const result = this.find(componentType);
    if (!result) {
      throw new Error(`Required component '${componentType}' not found`);
    }
    return result;
  }

  /**
   * A composite object can add or remove other components (both simple or
   * complex) to or from its child list.
   */
  public addChild(component: Component): void {
    this.children.push(component);
    component.setParent(this);

    this.getRoot().allComponents.push(component);
  }

  public removeChild(component: Component): void {
    const allComponentIndex = this.getRoot().allComponents.indexOf(component);
    this.getRoot().allComponents.splice(allComponentIndex, 1);

    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  constructor(parent?: Component) {
    if (parent) {
      parent.addChild(this);
    }
  }

  async preSynthesize() {
    await Promise.all(this.children.map((component) => component.preSynthesize()))
  }

  async synthesize() {
    await Promise.all(this.children.map((component) => component.synthesize()))
  }

  async postSynthesize() {
    await Promise.all(this.children.map((component) => component.postSynthesize()))
  }
}

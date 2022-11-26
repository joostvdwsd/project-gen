
export type ClassType<T> = new (...args: [...any]) => T;

export abstract class BaseComponent {
  private parent!: BaseComponent | null;

  protected children: BaseComponent[] = [];

  constructor(parent?: BaseComponent) {
    if (parent) {
      parent.addChild(this);
    }
  }

  public setParent(parent: BaseComponent | null) {
    this.parent = parent;
  }

  public getParent(): BaseComponent | null {
    return this.parent;
  }

  public getRoot(): RootComponent {
    if (this.parent) {
      return this.parent.getRoot();
    }
    return this;
  }

  public find<T extends BaseComponent>(componentType: ClassType<T>): T | undefined {
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

    return this.getRoot().children.find((component) => component instanceof componentType) as T;
  }

  public resolve<T extends BaseComponent>(componentType: ClassType<T>): T {
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
  public addChild(component: BaseComponent) {
    this.children.push(component);
    component.setParent(this);
  }

  public removeChild(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  async preSynthesize() {
    for (let child of this.children) {
      await child.preSynthesize();
    }
  }

  async synthesize() {
    await Promise.all(this.children.map((component) => component.synthesize()))
  }

  async postSynthesize() {
    await Promise.all(this.children.map((component) => component.postSynthesize()))
  }
}

export class RootComponent extends BaseComponent {
  constructor() {
    super();
  }
}

export class SingletonComponent extends BaseComponent {
  constructor(parent: RootComponent) {
    super(parent);
  }
}

export class Component extends BaseComponent {
  constructor(parent: BaseComponent) {
    super(parent);
  }
}
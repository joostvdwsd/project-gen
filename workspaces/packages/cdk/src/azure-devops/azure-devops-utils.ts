export function azureDevopsSafeName(name: string) {
  return name.replace(/[^a-zA-Z0-9_]/, '_');
}

type DependsOn = string | string[];
type DependsOnType<T> = 
    T extends string ? string :
    T extends string[] ? string[] : never;

export function azureSafeDependsOn<T extends DependsOn>(dependsOn?: T) : DependsOnType<T> | undefined {
  if (!dependsOn) {
    return undefined;
  } else if (typeof dependsOn == 'string') {
    return azureDevopsSafeName(dependsOn) as DependsOnType<T>;
  } else {
    return dependsOn.map(azureDevopsSafeName) as DependsOnType<T>;
  }
} 
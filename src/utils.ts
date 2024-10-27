export function applyMixins(derivedClass: any, baseClasses: any[]): typeof derivedClass {
  baseClasses.forEach((baseClass) => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
      Object.defineProperty(derivedClass.prototype, name, Object.getOwnPropertyDescriptor(baseClass.prototype, name) || Object.create(null));
    });
  });
  return derivedClass;
}

export function extractNamespace(name: string): string {
  return name.split("\\").slice(0, -1).join("\\");
}

const REGEX_IDENTIFIER = '[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*';

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

export function extractShortName(name: string): string {
  return name.split("\\").pop() || name;
}

export function isNamespaceIdentifier(value: string, allowLeadingSlash: boolean = false): boolean {
  const regex = '^' + (allowLeadingSlash ? '\\' : '') + REGEX_IDENTIFIER + '(' + '\\\\' + REGEX_IDENTIFIER + ')*$';
  return new RegExp(regex).test(value);
}

export function ltrim(value: string, chars: string): string {
  return value.replace(new RegExp(`^[${chars}]+`), '');
}

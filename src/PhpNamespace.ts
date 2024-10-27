export enum PhpNamespaceType {
  NORMAL = "n",
  FUNCTION = "f",
  CONSTANT = "c",
}

export class PhpNamespace {
  private name: string;
  private bracketedSyntax = false;

  private aliases: Record<PhpNamespaceType, string[]> = {
    [PhpNamespaceType.NORMAL]: [],
    [PhpNamespaceType.FUNCTION]: [],
    [PhpNamespaceType.CONSTANT]: [],
  };

  private classes: Record<string, any> = {};
  private functions: Record<string, any> = {};

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setBracketedSyntax(bracketedSyntax: boolean = true): this {
    this.bracketedSyntax = bracketedSyntax;

    return this;
  }

  hasBracketedSyntax(): boolean {
    return this.bracketedSyntax;
  }
}

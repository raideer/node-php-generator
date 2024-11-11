import { extractShortName, ltrim } from "./utils";

export enum PhpNamespaceType {
  NORMAL = "n",
  FUNCTION = "f",
  CONSTANT = "c",
}

export class PhpNamespace {
  private name: string;
  private bracketedSyntax = false;

  private aliases: Record<PhpNamespaceType, Record<string, string>> = {
    [PhpNamespaceType.NORMAL]: {},
    [PhpNamespaceType.FUNCTION]: {},
    [PhpNamespaceType.CONSTANT]: {},
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

  addUse(name: string, alias: string | null = null, of: PhpNamespaceType = PhpNamespaceType.NORMAL): this {
    name = ltrim(name, '\\');

    const aliases = this.aliases[of];
    const used = {
      [PhpNamespaceType.NORMAL]: this.classes,
      [PhpNamespaceType.FUNCTION]: this.functions,
      [PhpNamespaceType.CONSTANT]: [],
    }[of] as Record<string, string>;

    if (!alias) {
      const base = extractShortName(name);
      let counter = 0;
      let lower: string;

      do {
        alias = `${base}${counter}`;
        lower = alias.toLowerCase();
        counter++;
      } while ((aliases[lower] && aliases[lower] !== alias) || used[lower]);
    } else {
      const lower = alias.toLowerCase();

      if (aliases[lower] && aliases[lower] !== alias) {
        throw new Error(`Alias ${alias} is already used in ${of} namespace ${this.name}`);
      }
    }

    this.aliases[of][alias] = name;

    return this;
  }

  removeUse(name: string, of: PhpNamespaceType = PhpNamespaceType.NORMAL): this {
    delete this.aliases[of][name];

    return this;
  }

  addUseFunction(name: string, alias: string | null = null): this {
    return this.addUse(name, alias, PhpNamespaceType.FUNCTION);
  }

  addUseConstant(name: string, alias: string | null = null): this {
    return this.addUse(name, alias, PhpNamespaceType.CONSTANT);
  }

  getUses(of: PhpNamespaceType = PhpNamespaceType.NORMAL): Record<string, string> {
    return this.aliases[of];
  }
}

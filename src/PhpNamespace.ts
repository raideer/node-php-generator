import { ClassType } from './ClassType';
import { InterfaceType } from './InterfaceType';
import { TraitType } from './TraitType';
import { EnumType } from './EnumType';
import { GlobalFunction } from './GlobalFunction';
import { Helpers } from './Helpers';

export enum NamespaceType {
  Normal = 'normal',
  Function = 'function',
  Constant = 'constant',
}

export class PhpNamespace {
  private name: string;
  private bracketedSyntax: boolean = false;
  private aliases: Record<string, Record<string, string>> = {
    [NamespaceType.Normal]: {},
    [NamespaceType.Function]: {},
    [NamespaceType.Constant]: {},
  };
  private classes: Record<
    string,
    ClassType | InterfaceType | TraitType | EnumType
  > = {};
  private functions: Record<string, GlobalFunction> = {};

  constructor(name: string) {
    if (name !== '' && !Helpers.isNamespaceIdentifier(name)) {
      throw new Error(`Value '${name}' is not valid name.`);
    }
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setBracketedSyntax(state: boolean = true): this {
    this.bracketedSyntax = state;
    return this;
  }

  public hasBracketedSyntax(): boolean {
    return this.bracketedSyntax;
  }

  public addUse(
    name: string,
    alias: string | null = null,
    of: string = NamespaceType.Normal
  ): this {
    if (
      !Helpers.isNamespaceIdentifier(name, true) ||
      (Helpers.isIdentifier(name) && Helpers.Keywords[name.toLowerCase()])
    ) {
      throw new Error(
        `Value '${name}' is not valid class/function/constant name.`
      );
    } else if (
      alias &&
      (!Helpers.isIdentifier(alias) || Helpers.Keywords[alias.toLowerCase()])
    ) {
      throw new Error(`Value '${alias}' is not valid alias.`);
    }

    name = name.replace(/^\\/, '');
    const aliases = this.aliases[of];
    const used = of === NamespaceType.Normal ? this.classes : this.functions;

    if (alias === null) {
      let base = Helpers.extractShortName(name);
      let counter = 0;
      do {
        alias = base + (counter ? counter : '');
        counter++;
      } while (
        aliases[alias.toLowerCase()] &&
        aliases[alias.toLowerCase()] !== name
      );
    } else {
      if (
        aliases[alias.toLowerCase()] &&
        aliases[alias.toLowerCase()] !== name
      ) {
        throw new Error(
          `Alias '${alias}' used already for '${aliases[alias.toLowerCase()]}', cannot use for '${name}'.`
        );
      } else if (used[alias.toLowerCase()]) {
        throw new Error(
          `Name '${alias}' used already for '${this.name}\\${used[alias.toLowerCase()].getName()}'.`
        );
      }
    }

    aliases[alias] = name;
    return this;
  }

  public removeUse(name: string, of: string = NamespaceType.Normal): void {
    for (const alias in this.aliases[of]) {
      if (this.aliases[of][alias].toLowerCase() === name.toLowerCase()) {
        delete this.aliases[of][alias];
      }
    }
  }

  public addUseFunction(name: string, alias: string | null = null): this {
    return this.addUse(name, alias, NamespaceType.Function);
  }

  public addUseConstant(name: string, alias: string | null = null): this {
    return this.addUse(name, alias, NamespaceType.Constant);
  }

  public getUses(of: string = NamespaceType.Normal): Record<string, string> {
    const aliases = this.aliases[of];

    // Sort the aliases based on the transformed string
    const sortedAliases = Object.entries(aliases).sort(
      ([aliasA, nameA], [aliasB, nameB]) => {
        const transformedA = nameA.replace(/\\/g, ' ');
        const transformedB = nameB.replace(/\\/g, ' ');
        return transformedA.localeCompare(transformedB);
      }
    );

    // Filter the aliases
    const filteredAliases = sortedAliases.filter(([alias, name]) => {
      const fullAlias = (this.name ? this.name + '\\' : '') + alias;
      return (
        fullAlias.localeCompare(name, undefined, { sensitivity: 'base' }) !== 0
      );
    });

    return Object.fromEntries(filteredAliases);
  }

  public resolveName(name: string, of: string = NamespaceType.Normal): string {
    if (Helpers.Keywords[name.toLowerCase()] || name === '') {
      return name;
    } else if (name[0] === '\\') {
      return name.substring(1);
    }

    const aliases = this.aliases[of];
    if (of !== NamespaceType.Normal) {
      return (
        aliases[name.toLowerCase()] ||
        this.resolveName(Helpers.extractNamespace(name) + '\\') +
          Helpers.extractShortName(name)
      );
    }

    const parts = name.split('\\', 2);
    return (
      aliases[parts[0].toLowerCase()] ||
      this.name + (this.name ? '\\' : '') + name
    );
  }

  public simplifyType(type: string, of: string = NamespaceType.Normal): string {
    return type.replace(/[\w\x7f-\xff\\]+/g, (match) =>
      this.simplifyName(match, of)
    );
  }

  public simplifyName(name: string, of: string = NamespaceType.Normal): string {
    if (Helpers.Keywords[name.toLowerCase()] || name === '') {
      return name;
    }

    name = name.replace(/^\\/, '');

    if (of !== NamespaceType.Normal) {
      for (const alias in this.aliases[of]) {
        if (this.aliases[of][alias].toLowerCase() === name.toLowerCase()) {
          return alias;
        }
      }

      return (
        this.simplifyName(Helpers.extractNamespace(name) + '\\') +
        Helpers.extractShortName(name)
      );
    }

    let shortest: string | null = null;
    let relative = name.startsWith(this.name + '\\')
      ? name.substring(this.name.length + 1)
      : null;

    for (const alias in this.aliases[of]) {
      const original = this.aliases[of][alias];
      if (relative && (relative + '\\').startsWith(alias + '\\')) {
        relative = null;
      }

      if ((name + '\\').startsWith(original + '\\')) {
        const short = alias + name.substring(original.length);
        if (!shortest || shortest.length > short.length) {
          shortest = short;
        }
      }
    }

    if (shortest && relative && shortest.length < relative.length) {
      return shortest;
    }

    return relative ?? shortest ?? (this.name ? '\\' : '') + name;
  }

  public add(
    classType: ClassType | InterfaceType | TraitType | EnumType
  ): this {
    const name = classType.getName();
    if (!name) {
      throw new Error('Class does not have a name.');
    }

    const lower = name.toLowerCase();
    if (this.classes[lower] && this.classes[lower] !== classType) {
      throw new Error(`Cannot add '${name}', because it already exists.`);
    } else if (this.aliases[NamespaceType.Normal][lower]) {
      throw new Error(
        `Name '${name}' used already as alias for ${this.aliases[NamespaceType.Normal][lower]}.`
      );
    }

    this.classes[lower] = classType;
    return this;
  }

  public addClass(name: string): ClassType {
    const classType = new ClassType(name, this);
    this.add(classType);
    return classType;
  }

  public addInterface(name: string): InterfaceType {
    const interfaceType = new InterfaceType(name, this);
    this.add(interfaceType);
    return interfaceType;
  }

  public addTrait(name: string): TraitType {
    const traitType = new TraitType(name, this);
    this.add(traitType);
    return traitType;
  }

  public addEnum(name: string): EnumType {
    const enumType = new EnumType(name, this);
    this.add(enumType);
    return enumType;
  }

  public getClass(
    name: string
  ): ClassType | InterfaceType | TraitType | EnumType {
    const classType = this.classes[name.toLowerCase()];
    if (!classType) {
      throw new Error(`Class '${name}' not found.`);
    }
    return classType;
  }

  public getClasses(): (ClassType | InterfaceType | TraitType | EnumType)[] {
    return Object.values(this.classes);
  }

  public removeClass(name: string): this {
    delete this.classes[name.toLowerCase()];
    return this;
  }

  public addFunction(name: string): GlobalFunction {
    const lower = name.toLowerCase();
    if (this.functions[lower]) {
      throw new Error(`Cannot add '${name}', because it already exists.`);
    } else if (this.aliases[NamespaceType.Function][lower]) {
      throw new Error(
        `Name '${name}' used already as alias for ${this.aliases[NamespaceType.Function][lower]}.`
      );
    }

    const func = new GlobalFunction(name);
    this.functions[lower] = func;
    return func;
  }

  public getFunction(name: string): GlobalFunction {
    const func = this.functions[name.toLowerCase()];
    if (!func) {
      throw new Error(`Function '${name}' not found.`);
    }
    return func;
  }

  public getFunctions(): GlobalFunction[] {
    return Object.values(this.functions);
  }

  public removeFunction(name: string): this {
    delete this.functions[name.toLowerCase()];
    return this;
  }
}

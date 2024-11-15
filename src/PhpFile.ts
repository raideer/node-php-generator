import { HasComment } from './Api/HasComment';
import { NamespaceType, PhpNamespace } from './PhpNamespace';
import { ClassType } from './ClassType';
import { InterfaceType } from './InterfaceType';
import { TraitType } from './TraitType';
import { EnumType } from './EnumType';
import { GlobalFunction } from './GlobalFunction';
import { Helpers } from './Helpers';

export class PhpFile implements HasComment {
  private comment: string | undefined;
  private namespaces: Map<string, PhpNamespace> = new Map();
  private strictTypes: boolean = false;

  public addClass(name: string): ClassType {
    return this.addNamespace(Helpers.extractNamespace(name)).addClass(
      Helpers.extractShortName(name)
    );
  }

  public addInterface(name: string): InterfaceType {
    return this.addNamespace(Helpers.extractNamespace(name)).addInterface(
      Helpers.extractShortName(name)
    );
  }

  public addTrait(name: string): TraitType {
    return this.addNamespace(Helpers.extractNamespace(name)).addTrait(
      Helpers.extractShortName(name)
    );
  }

  public addEnum(name: string): EnumType {
    return this.addNamespace(Helpers.extractNamespace(name)).addEnum(
      Helpers.extractShortName(name)
    );
  }

  public addFunction(name: string): GlobalFunction {
    return this.addNamespace(Helpers.extractNamespace(name)).addFunction(
      Helpers.extractShortName(name)
    );
  }

  public addNamespace(namespace: string | PhpNamespace): PhpNamespace {
    const ns =
      namespace instanceof PhpNamespace
        ? namespace
        : new PhpNamespace(namespace);

    this.namespaces.set(ns.getName(), ns);

    this.namespaces.forEach((ns) => {
      ns.setBracketedSyntax(
        this.namespaces.size > 1 && this.namespaces.has('')
      );
    });

    return ns;
  }

  public removeNamespace(namespace: string | PhpNamespace): this {
    const name =
      namespace instanceof PhpNamespace ? namespace.getName() : namespace;
    this.namespaces.delete(name);
    return this;
  }

  public getNamespaces(): PhpNamespace[] {
    return Array.from(this.namespaces.values());
  }

  public getClasses(): (ClassType | InterfaceType | TraitType | EnumType)[] {
    const classes: (ClassType | InterfaceType | TraitType | EnumType)[] = [];
    this.namespaces.forEach((namespace, n) => {
      const prefix = n ? `${n}\\` : '';
      namespace.getClasses().forEach((classType, c) => {
        classes.push(classType);
      });
    });
    return classes;
  }

  public getFunctions(): GlobalFunction[] {
    const functions: GlobalFunction[] = [];
    this.namespaces.forEach((namespace, n) => {
      const prefix = n ? `${n}\\` : '';
      namespace.getFunctions().forEach((func, f) => {
        functions.push(func);
      });
    });
    return functions;
  }

  public addUse(
    name: string,
    alias: string | null = null,
    of: NamespaceType = NamespaceType.Normal
  ): this {
    this.addNamespace('').addUse(name, alias, of);
    return this;
  }

  public setStrictTypes(state: boolean = true): this {
    this.strictTypes = state;
    return this;
  }

  public hasStrictTypes(): boolean {
    return this.strictTypes;
  }

  getComment(): string | undefined {
    return this.comment;
  }

  setComment(comment: string | undefined): this {
    this.comment = comment;
    return this;
  }

  addComment(comment: string): this {
    this.comment = (this.comment ? this.comment + '\n' : '') + comment;
    return this;
  }

  removeComment(): this {
    this.comment = undefined;
    return this;
  }
}

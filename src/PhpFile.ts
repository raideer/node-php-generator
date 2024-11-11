import { ClassType } from "./ClassType";
import { EnumType } from "./EnumType";
import { FunctionType } from "./FunctionType";
import { InterfaceType } from "./InterfaceType";
import { TraitType } from "./TraitType";
import { withComments } from "./mixins/withComments";
import { PhpNamespace, PhpNamespaceType } from "./PhpNamespace";
import { extractNamespace, extractShortName } from "./utils";

export class PhpFile extends withComments(class {}) {
  private namespaces: PhpNamespace[] = [];
  private strictTypes = false;

  addClass(name: string): ClassType {
    return this.addNamespace(extractNamespace(name))
      .addClass(extractShortName(name));
  }

  addInterface(name: string): InterfaceType {
    return this.addNamespace(extractNamespace(name))
      .addInterface(extractShortName(name));
  }

  addTrait(name: string): TraitType {
    return this.addNamespace(extractNamespace(name))
      .addTrait(extractShortName(name));
  }

  addEnum(name: string): EnumType {
    return this.addNamespace(extractNamespace(name))
      .addEnum(extractShortName(name));
  }

  addFunction(name: string): FunctionType {
    return this.addNamespace(extractNamespace(name))
      .addFunction(extractShortName(name));
  }

  addNamespace(namespace: PhpNamespace | string): PhpNamespace {
    const namespaceName = typeof namespace === "string" ? namespace : namespace.getName();
    
    const existingNamespace = this.namespaces.find((ns) => ns.getName() === namespaceName);
  }

  getNamespaces(): PhpNamespace[] {
    return this.namespaces;
  }

  getClasses(): ClassType[] {
    return this.namespaces.flatMap((ns) => ns.getClasses());
  }

  getFunctions(): FunctionType[] {
    return this.namespaces.flatMap((ns) => ns.getFunctions());
  }

  addUse(name: string, alias: string | null = null, of: PhpNamespaceType = PhpNamespaceType.NORMAL): this {
    this.addNamespace('')->addUse(name, alias, of);

    return this;
  }

  setStrictTypes(strictTypes: boolean = true): this {
    this.strictTypes = strictTypes;

    return this;
  }

  hasStrictTypes(): boolean {
    return this.strictTypes;
  }
}

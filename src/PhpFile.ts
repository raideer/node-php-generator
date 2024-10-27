import { ClassType } from "./ClassType";
import { withComments } from "./mixins/withComments";
import { PhpNamespace } from "./PhpNamespace";

export class PhpFile extends withComments(class {}) {
  private namespaces: PhpNamespace[] = [];
  private strictTypes = false;

  addClass(name: string): ClassType {
    const classType = new ClassType(name);

    this.namespaces.push(classType);

    return classType;
  }

  addNamespace(namespace: PhpNamespace | string): PhpNamespace {
    const namespaceName = typeof namespace === "string" ? namespace : namespace.getName();
    
    const existingNamespace = this.namespaces.find((ns) => ns.getName() === namespaceName);
  }
}

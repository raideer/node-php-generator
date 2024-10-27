import { ClassLike } from "./ClassLike";
import { Constant } from "./Constant";
import { Method } from "./Method";
import { withConstants } from "./mixins/withConstants";
import { withMethods } from "./mixins/withMethods";

export type InterfaceTypeMember = Constant | Method;

export class InterfaceType extends withConstants(withMethods(ClassLike)) {
  extends: string[] = [];

  getExtends(): string[] {
    return this.extends;
  }

  setExtends(interfaceExtends: string[]): this {
    this.extends = interfaceExtends;

    return this;
  }

  addExtends(interfaceExtends: string): this {
    this.extends.push(interfaceExtends);

    return this;
  }

  addMember(member: InterfaceTypeMember): this {
    const name = member.getName() as string;

    if (member instanceof Constant) {
      this.constants[name] = member;
    } else if (member instanceof Method) {
      this.methods[name] = member;
    }

    return this;
  }
}

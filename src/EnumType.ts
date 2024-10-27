import { ClassLike } from "./ClassLike";
import { ClassTypeMember } from "./ClassType";
import { Constant } from "./Constant";
import { EnumCase } from "./EnumCase";
import { Method } from "./Method";
import { withConstants } from "./mixins/withConstants";
import { withMethods } from "./mixins/withMethods";
import { withTraits } from "./mixins/withTraits";
import { Property } from "./Property";
import { TraitUse } from "./TraitUse";

export type EnumTypeMember = Constant | Method | EnumCase | TraitUse;

export class EnumType extends withConstants(withMethods(withTraits(ClassLike))) {
  private implements: string[] = [];

  private type: string | undefined;
  private cases: Record<string, EnumCase> = {};

  getType(): string | undefined {
    return this.type;
  }

  setType(type: string | undefined): this {
    this.type = type;

    return this;
  }

  getImplements(): string[] {
    return this.implements;
  }

  setImplements(impl: string[]): this {
    this.implements = impl;

    return this;
  }

  addImplement(impl: string): this {
    this.implements.push(impl);

    return this;
  }

  setCases(cases: EnumCase[]): this {
    this.cases = cases.reduce((acc, curr) => {
      const name = curr.getName() as string;
      acc[name] = curr;

      return acc;
    }, {} as Record<string, EnumCase>);

    return this;
  }

  getCases(): EnumCase[] {
    return Object.values(this.cases);
  }

  addCase(name: string, value: string | undefined, override: boolean = false): this {
    if (this.cases[name] && !override) {
      throw new Error(`Case ${name} already exists`);
    }

    this.cases[name] = (new EnumCase()).setName(name).setValue(value);

    return this;
  }

  removeCase(name: string): this {
    delete this.cases[name];

    return this;
  }

  addMember(member: EnumTypeMember, override: boolean = false): this {
    const name = member.getName() as string;
    
    if (member instanceof Constant) {
      this.constants[name] = member;
    } else if (member instanceof Method) {
      this.methods[name] = member;
    } else if (member instanceof EnumCase) {
      this.cases[name] = member;
    } else if (member instanceof TraitUse) {
      this.traits[name] = member;
    }

    return this;
  }
}

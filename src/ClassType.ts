import { ClassLike } from "@/ClassLike";
import { PhpNamespace } from "@/PhpNamespace";
import { Constant } from "@/Constant";
import { Method } from "@/Method";
import { Property } from "@/Property";
import { withConstants } from "@/mixins/withConstants";
import { withMethods } from "@/mixins/withMethods";
import { withProperties } from "@/mixins/withProperties";
import { withTraits } from "@/mixins/withTraits";
import { TraitUse } from "@/TraitUse";

export type ClassTypeMember = Constant | Method | Property | TraitUse;

export class ClassType extends withConstants(withMethods(withProperties(withTraits(ClassLike)))) {
  private final = false;
  private abstract = false;
  private extends: string | null = null;
  private readOnly = false;
  private implements: string[] = [];

  isClass(): boolean {
    return true;
  }

  constructor(name: string, namespace: PhpNamespace | null = null) {
    super(name, namespace);
  }

  setFinal(final: boolean = true): this {
    this.final = final;

    return this;
  }

  isFinal(): boolean {
    return this.final;
  }

  setAbstract(abstract: boolean = true): this {
    this.abstract = abstract;

    return this;
  }

  setReadOnly(readOnly: boolean = true): this {
    this.readOnly = readOnly;

    return this;
  }

  isReadOnly(): boolean {
    return this.readOnly;
  }

  isAbstract(): boolean {
    return this.abstract;
  }

  setExtends(ext: string | null): this {
    this.extends = ext;

    return this;
  }

  getExtends(): string | null {
    return this.extends;
  }

  setImplements(impl: string[]): this {
    this.implements = impl;

    return this;
  }

  getImplements(): string[] {
    return this.implements;
  }

  addMember(member: ClassTypeMember, override: boolean = false): this {
    const name = member.getName() as string;

    if (member instanceof Constant) {
      this.constants[name] = member;
    } else if (member instanceof Method) {
      this.methods[name] = member;
    } else if (member instanceof Property) {
      this.properties[name] = member;
    } else if (member instanceof TraitUse) {
      this.traits[name] = member;
    }

    return this;
  }
}

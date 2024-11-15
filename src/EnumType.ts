import { HasConstants } from './Api/HasConstants';
import { HasMethods } from './Api/HasMethods';
import { HasTraits } from './Api/HasTraits';
import { ClassLike } from './ClassLike';
import { Constant } from './Constant';
import { EnumCase, EnumCaseValue } from './EnumCase';
import { Method } from './Method';
import { TraitUse } from './TraitUse';

export type EnumMember = Constant | Method | TraitUse | EnumCase;

export class EnumType
  extends ClassLike
  implements HasConstants, HasMethods, HasTraits
{
  private consts: Map<string, Constant> = new Map();
  private methods: Map<string, Method> = new Map();
  private traits: Map<string, TraitUse> = new Map();

  private implements: string[] = [];
  private cases: Map<string, EnumCase> = new Map();
  private type: string | undefined;

  public isEnum(): boolean {
    return true;
  }

  public setType(type?: string): this {
    this.type = type;
    return this;
  }

  public getType(): string | undefined {
    return this.type;
  }

  public setImplements(impl: string[]): this {
    this.validateNames(impl);
    this.implements = impl;
    return this;
  }

  public getImplements(): string[] {
    return this.implements;
  }

  public addImplement(impl: string): this {
    this.validateNames([impl]);
    this.implements.push(impl);
    return this;
  }

  public removeImplement(impl: string): this {
    this.implements = this.implements.filter((i) => i !== impl);
    return this;
  }

  public setCases(cases: EnumCase[]): this {
    this.cases.clear();
    for (const c of cases) {
      this.cases.set(c.getName(), c);
    }
    return this;
  }

  public getCases(): EnumCase[] {
    return Array.from(this.cases.values());
  }

  public addCase(
    name: string,
    value: EnumCaseValue = null,
    overwrite: boolean = false
  ): EnumCase {
    if (!overwrite && this.cases.has(name)) {
      throw new Error(`Case ${name} already exists`);
    }
    const c = new EnumCase(name);
    c.setValue(value);
    this.cases.set(name, c);
    return c;
  }

  public removeCase(name: string): this {
    this.cases.delete(name);
    return this;
  }

  public hasCase(name: string): boolean {
    return this.cases.has(name);
  }

  public addMember(member: EnumMember, overwrite: boolean = false): this {
    const name = member.getName();

    if (member instanceof Constant) {
      if (!overwrite && this.consts.has(name)) {
        throw new Error(`Constant ${name} already exists`);
      }
      this.consts.set(name, member);
      return this;
    } else if (member instanceof Method) {
      if (!overwrite && this.methods.has(name)) {
        throw new Error(`Method ${name} already exists`);
      }
      this.methods.set(name, member);
      return this;
    } else if (member instanceof TraitUse) {
      if (!overwrite && this.traits.has(name)) {
        throw new Error(`Trait ${name} already exists`);
      }
      this.traits.set(name, member);
      return this;
    } else if (member instanceof EnumCase) {
      if (!overwrite && this.cases.has(name)) {
        throw new Error(`Case ${name} already exists`);
      }
      this.cases.set(name, member);
      return this;
    }

    throw new Error('Invalid member');
  }

  public getConstants(): Constant[] {
    return Array.from(this.consts.values());
  }

  public getConstant(name: string): Constant | undefined {
    return this.consts.get(name);
  }

  public addConstant(
    name: string,
    value: string | undefined,
    override: boolean = false
  ): Constant {
    if (!override && this.consts.has(name)) {
      throw new Error(`Constant ${name} already exists`);
    }
    const constant = new Constant(name);
    constant.setValue(value);
    this.consts.set(name, constant);
    return constant;
  }

  public setConstants(constants: Constant[]): this {
    this.consts.clear();
    for (const constant of constants) {
      this.consts.set(constant.getName(), constant);
    }
    return this;
  }

  public removeConstant(name: string): this {
    this.consts.delete(name);
    return this;
  }

  public hasConstant(name: string): boolean {
    return this.consts.has(name);
  }

  public getMethods(): Method[] {
    return Array.from(this.methods.values());
  }

  public setMethods(methods: Method[]): this {
    this.methods.clear();
    for (const method of methods) {
      this.methods.set(method.getName(), method);
    }
    return this;
  }

  public getMethod(name: string): Method | undefined {
    return this.methods.get(name);
  }

  public addMethod(name: string, overwrite: boolean = false): Method {
    if (!overwrite && this.methods.has(name)) {
      throw new Error(`Method ${name} already exists`);
    }
    const method = new Method(name);
    this.methods.set(name, method);
    return method;
  }

  public removeMethod(name: string): this {
    this.methods.delete(name);
    return this;
  }

  public hasMethod(name: string): boolean {
    return this.methods.has(name);
  }

  public getTraits(): TraitUse[] {
    return Array.from(this.traits.values());
  }

  public setTraits(traits: TraitUse[]): this {
    this.traits.clear();
    for (const trait of traits) {
      this.traits.set(trait.getName(), trait);
    }
    return this;
  }

  public getTrait(name: string): TraitUse | undefined {
    return this.traits.get(name);
  }

  public addTrait(name: string, overwrite: boolean = false): TraitUse {
    if (!overwrite && this.traits.has(name)) {
      throw new Error(`Trait ${name} already exists`);
    }
    const trait = new TraitUse(name);
    this.traits.set(name, trait);
    return trait;
  }

  public removeTrait(name: string): this {
    this.traits.delete(name);
    return this;
  }

  public hasTrait(name: string): boolean {
    return this.traits.has(name);
  }

  public validate(): void {}
}

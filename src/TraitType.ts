import { HasConstants } from './Api/HasConstants';
import { HasMethods } from './Api/HasMethods';
import { HasProperties } from './Api/HasProperties';
import { HasTraits } from './Api/HasTraits';
import { ClassLike } from './ClassLike';
import { Constant } from './Constant';
import { Method } from './Method';
import { Property } from './Property';
import { TraitUse } from './TraitUse';

export type TraitMember = Constant | Method | Property | TraitUse;

export class TraitType
  extends ClassLike
  implements HasConstants, HasMethods, HasProperties, HasTraits
{
  private consts: Map<string, Constant> = new Map();
  private methods: Map<string, Method> = new Map();
  private properties: Map<string, Property> = new Map();
  private traits: Map<string, TraitUse> = new Map();

  public isTrait(): boolean {
    return true;
  }

  public addMember(member: TraitMember, overwrite: boolean = false): this {
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
    } else if (member instanceof Property) {
      if (!overwrite && this.properties.has(name)) {
        throw new Error(`Property ${name} already exists`);
      }
      this.properties.set(name, member);
      return this;
    } else if (member instanceof TraitUse) {
      if (!overwrite && this.traits.has(name)) {
        throw new Error(`Trait ${name} already exists`);
      }
      this.traits.set(name, member);
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

  public getProperties(): Property[] {
    return Array.from(this.properties.values());
  }

  public setProperties(properties: Property[]): this {
    this.properties.clear();
    for (const property of properties) {
      this.properties.set(property.getName(), property);
    }
    return this;
  }

  public getProperty(name: string): Property | undefined {
    return this.properties.get(name);
  }

  public addProperty(
    name: string,
    value: string | undefined,
    overwrite: boolean = false
  ): Property {
    if (!overwrite && this.properties.has(name)) {
      throw new Error(`Property ${name} already exists`);
    }
    const property = new Property(name);
    property.setValue(value);
    this.properties.set(name, property);
    return property;
  }

  public removeProperty(name: string): this {
    this.properties.delete(name);
    return this;
  }

  public hasProperty(name: string): boolean {
    return this.properties.has(name);
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

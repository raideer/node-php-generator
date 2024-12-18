import { HasConstants } from './Api/HasConstants';
import { HasMethods } from './Api/HasMethods';
import { HasProperties } from './Api/HasProperties';
import { HasTraits } from './Api/HasTraits';
import { ClassLike } from './ClassLike';
import { Constant } from './Constant';
import { Method } from './Method';
import type { PhpNamespace } from './PhpNamespace';
import { Property } from './Property';
import { TraitUse } from './TraitUse';
import { PropertyValue } from './types';

export type ClassMember = Constant | Method | Property | TraitUse;

export class ClassType
  extends ClassLike
  implements HasConstants, HasMethods, HasProperties, HasTraits
{
  private consts: Map<string, Constant> = new Map();
  private methods: Map<string, Method> = new Map();
  private properties: Map<string, Property> = new Map();
  private traits: Map<string, TraitUse> = new Map();

  private _isAbstract: boolean = false;
  private _isFinal: boolean = false;
  private readOnly: boolean = false;
  private extends: string | undefined;
  private implements: string[] = [];

  public constructor(name?: string, namespace?: PhpNamespace) {
    super(name ?? '', namespace);

    this.setName(name);
  }

  public isClass(): boolean {
    return true;
  }

  public setFinal(value: boolean = true): this {
    this._isFinal = value;
    return this;
  }

  public isFinal(): boolean {
    return this._isFinal;
  }

  public setAbstract(value: boolean = true): this {
    this._isAbstract = value;
    return this;
  }

  public isAbstract(): boolean {
    return this._isAbstract;
  }

  public setReadOnly(value: boolean = true): this {
    this.readOnly = value;
    return this;
  }

  public isReadOnly(): boolean {
    return this.readOnly;
  }

  public setExtends(name?: string): this {
    if (name) {
      this.validateNames([name]);
    }

    this.extends = name;
    return this;
  }

  public getExtends(): string | undefined {
    return this.extends;
  }

  public setImplements(names: string[]): this {
    this.validateNames(names);

    this.implements = names;
    return this;
  }

  public getImplements(): string[] {
    return this.implements;
  }

  public addImplement(name: string): this {
    this.validateNames([name]);

    this.implements.push(name);
    return this;
  }

  public removeImplement(name: string): this {
    this.implements = this.implements.filter((n) => n !== name);
    return this;
  }

  public addMember(member: ClassMember, override: boolean = false): this {
    const name = member.getName();

    if (member instanceof Constant) {
      if (!override && this.consts.has(name)) {
        throw new Error(`Constant ${name} already exists`);
      }

      this.consts.set(name, member);
    } else if (member instanceof Method) {
      if (!override && this.methods.has(name)) {
        throw new Error(`Method ${name} already exists`);
      }

      this.methods.set(name, member);
    } else if (member instanceof Property) {
      if (!override && this.properties.has(name)) {
        throw new Error(`Property ${name} already exists`);
      }

      this.properties.set(name, member);
    } else if (member instanceof TraitUse) {
      if (!override && this.traits.has(name)) {
        throw new Error(`Trait ${name} already exists`);
      }

      this.traits.set(name, member);
    }

    return this;
  }

  public setConstants(consts: Constant[]): this {
    this.consts.clear();
    for (const constant of consts) {
      this.consts.set(constant.getName(), constant);
    }

    return this;
  }

  public getConstants(): Constant[] {
    return Array.from(this.consts.values());
  }

  public getConstant(name: string): Constant | undefined {
    return this.consts.get(name);
  }

  public addConstant(
    name: string,
    value: string | number | boolean | undefined,
    override: boolean = false
  ): Constant {
    if (!override && this.consts.has(name)) {
      throw new Error(`Constant ${name} already exists`);
    }

    const constant = new Constant(name);
    constant.setValue(value);
    constant.setPublic();

    this.consts.set(name, constant);

    return constant;
  }

  public removeConstant(name: string): this {
    this.consts.delete(name);

    return this;
  }

  public hasConstant(name: string): boolean {
    return this.consts.has(name);
  }

  public setMethods(methods: Method[]): this {
    this.methods.clear();
    for (const method of methods) {
      this.methods.set(method.getName(), method);
    }

    return this;
  }

  public getMethods(): Method[] {
    return Array.from(this.methods.values());
  }

  public getMethod(name: string): Method | undefined {
    return this.methods.get(name);
  }

  public addMethod(name: string, override: boolean = false): Method {
    if (!override && this.methods.has(name)) {
      throw new Error(`Method ${name} already exists`);
    }

    const method = new Method(name);

    if (!this.isInterface()) {
      method.setPublic();
    }

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

  public setProperties(properties: Property[]): this {
    this.properties.clear();
    for (const property of properties) {
      this.properties.set(property.getName(), property);
    }

    return this;
  }

  public getProperties(): Property[] {
    return Array.from(this.properties.values());
  }

  public getProperty(name: string): Property | undefined {
    return this.properties.get(name);
  }

  public addProperty(
    name: string,
    value: PropertyValue = undefined,
    override: boolean = false
  ): Property {
    if (!override && this.properties.has(name)) {
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

  public setTraits(traits: TraitUse[]): this {
    this.traits.clear();
    for (const trait of traits) {
      this.traits.set(trait.getName(), trait);
    }

    return this;
  }

  public getTraits(): TraitUse[] {
    return Array.from(this.traits.values());
  }

  public getTrait(name: string): TraitUse | undefined {
    return this.traits.get(name);
  }

  public addTrait(name: string, override: boolean = false): TraitUse {
    if (!override && this.traits.has(name)) {
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

  public validate(): void {
    const name = this.getName();

    if (!name && (this._isAbstract || this._isFinal)) {
      throw new Error('Abstract and final classes must have a name');
    }

    if (this._isAbstract && this._isFinal) {
      throw new Error(
        'Abstract and final classes cannot be both abstract and final'
      );
    }
  }

  public clone(): this {
    return structuredClone(this);
  }
}

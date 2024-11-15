import { HasConstants } from './Api/HasConstants';
import { HasMethods } from './Api/HasMethods';
import { ClassLike } from './ClassLike';
import { Constant } from './Constant';
import { Method } from './Method';

export type InterfaceMember = Constant | Method;

export class InterfaceType
  extends ClassLike
  implements HasConstants, HasMethods
{
  private consts: Map<string, Constant> = new Map();
  private methods: Map<string, Method> = new Map();

  private ext: string[] = [];

  public isInterface(): boolean {
    return true;
  }

  public setExtends(ext: string[]): this {
    this.validateNames(ext);
    this.ext = ext;
    return this;
  }

  public getExtends(): string[] {
    return this.ext;
  }

  public addExtends(ext: string): this {
    this.validateNames([ext]);
    this.ext.push(ext);
    return this;
  }

  public addMember(member: InterfaceMember, overwrite: boolean = false): this {
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
    }

    throw new Error(`Invalid member`);
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

  public validate(): void {}
}

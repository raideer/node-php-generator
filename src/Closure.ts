import { HasAttributes } from './Api/HasAttributes';
import { Attribute, AttributeArguments } from './Attribute';
import { FunctionLike } from './FunctionLike';
import { Parameter } from './Parameter';

export class Closure extends FunctionLike implements HasAttributes {
  private attributes: Attribute[] = [];
  private uses: Parameter[] = [];

  public getAttributes(): Attribute[] {
    return this.attributes;
  }

  public addAttribute(name: string, args: AttributeArguments = {}): this {
    this.attributes.push(new Attribute(name, args));
    return this;
  }

  public setAttributes(attributes: Attribute[]): this {
    this.attributes = attributes;
    return this;
  }

  public setUses(uses: Parameter[]): this {
    this.uses = uses;
    return this;
  }

  public getUses(): Parameter[] {
    return this.uses;
  }

  public clone(): this {
    return structuredClone(this);
  }
}

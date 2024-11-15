import { Attribute, AttributeArguments } from './Attribute';

export type EnumCaseValue = string | number | boolean | null;

export class EnumCase {
  private name: string;
  private comment: string | undefined;
  private attributes: Attribute[] = [];
  private value: EnumCaseValue = null;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getComment(): string | undefined {
    return this.comment;
  }

  public setComment(comment: string | undefined): this {
    this.comment = comment;
    return this;
  }

  public addComment(comment: string): this {
    this.comment = (this.comment ? this.comment + '\n' : '') + comment;
    return this;
  }

  public removeComment(): this {
    this.comment = undefined;
    return this;
  }

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

  public setValue(value: EnumCaseValue): this {
    this.value = value;
    return this;
  }

  public getValue(): EnumCaseValue {
    return this.value;
  }

  public cloneWithName(name: string): this {
    const constant = structuredClone(this);
    constant.name = name;
    return constant;
  }
}

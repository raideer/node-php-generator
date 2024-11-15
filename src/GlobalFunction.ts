import { HasAttributes } from './Api/HasAttributes';
import { HasComment } from './Api/HasComment';
import { HasName } from './Api/HasName';
import { Attribute, AttributeArguments } from './Attribute';
import { FunctionLike } from './FunctionLike';

export class GlobalFunction
  extends FunctionLike
  implements HasName, HasComment, HasAttributes
{
  private name: string;
  private comment: string | undefined;
  private attributes: Attribute[] = [];

  constructor(name: string) {
    super();
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

  public cloneWithName(name: string): this {
    const constant = structuredClone(this);
    constant.name = name;
    return constant;
  }

  public clone(): this {
    return structuredClone(this);
  }
}

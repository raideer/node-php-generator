import { HasAttributes } from './Api/HasAttributes';
import { HasComment } from './Api/HasComment';
import { HasName } from './Api/HasName';
import { HasVisibility } from './Api/HasVisibility';
import { Attribute, AttributeArguments } from './Attribute';
import { Visibility } from './types';

export class Constant
  implements HasName, HasVisibility, HasComment, HasAttributes
{
  private name: string;
  private value: string | number | boolean | undefined;
  private final: boolean = false;
  private type: string | undefined;
  private visibility: Visibility | undefined;
  private comment: string | undefined;
  private attributes: Attribute[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getVisibility(): Visibility | undefined {
    return this.visibility;
  }

  public setVisibility(visibility: Visibility | undefined): this {
    this.visibility = visibility;
    return this;
  }

  public setPublic(): this {
    this.visibility = 'public';
    return this;
  }

  public isPublic(): boolean {
    return this.visibility === 'public';
  }

  public setPrivate(): this {
    this.visibility = 'private';
    return this;
  }

  public isPrivate(): boolean {
    return this.visibility === 'private';
  }

  public setProtected(): this {
    this.visibility = 'protected';
    return this;
  }

  public isProtected(): boolean {
    return this.visibility === 'protected';
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

  public getValue(): string | number | boolean | undefined {
    return this.value;
  }

  public setValue(value: string | number | boolean | undefined): this {
    this.value = value;
    return this;
  }

  public isFinal(): boolean {
    return this.final;
  }

  public setFinal(final: boolean = true): this {
    this.final = final;
    return this;
  }

  public getType(): string | undefined {
    return this.type;
  }

  public setType(type: string | undefined): this {
    this.type = type;
    return this;
  }

  public cloneWithName(name: string): this {
    const constant = structuredClone(this);
    constant.name = name;
    return constant;
  }
}

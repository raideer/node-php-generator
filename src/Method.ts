import { HasAttributes } from './Api/HasAttributes';
import { HasComment } from './Api/HasComment';
import { HasName } from './Api/HasName';
import { HasVisibility } from './Api/HasVisibility';
import { CanValidate } from './Api/CanValidate';
import { FunctionLike } from './FunctionLike';
import { Attribute, AttributeArguments } from './Attribute';
import { PropertyValue, Visibility } from './types';
import { PromotedParameter } from './PromotedParameter';

export const CONSTRUCTOR = '__construct';

export class Method
  extends FunctionLike
  implements HasName, HasVisibility, HasComment, HasAttributes, CanValidate
{
  private name: string;
  private visibility: Visibility | undefined;
  private comment: string | undefined;
  private attributes: Attribute[] = [];

  private _isStatic: boolean = false;
  private _isAbstract: boolean = false;
  private _isFinal: boolean = false;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public getVisibility(): Visibility | undefined {
    return this.visibility;
  }

  public setVisibility(visibility: Visibility | undefined): this {
    this.visibility = visibility;
    return this;
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
    const method = structuredClone(this);
    method.name = name;
    return method;
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

  public setStatic(value: boolean = true): this {
    this._isStatic = value;
    return this;
  }

  public isStatic(): boolean {
    return this._isStatic;
  }

  public setAbstract(value: boolean = true): this {
    this._isAbstract = value;
    return this;
  }

  public isAbstract(): boolean {
    return this._isAbstract;
  }

  public setFinal(value: boolean = true): this {
    this._isFinal = value;
    return this;
  }

  public isFinal(): boolean {
    return this._isFinal;
  }

  public validate(): void {
    if (this._isAbstract && (this._isFinal || this.visibility === 'private')) {
      throw new Error(
        `Method ${this.name} cannot be abstract and final or private at the same time`
      );
    }
  }

  public addPromotedParameter(
    name: string,
    value: PropertyValue = undefined
  ): PromotedParameter {
    const parameter = new PromotedParameter(name);

    if (value !== undefined) {
      parameter.setDefaultValue(value);
    }

    this.parameters.set(name, parameter);
    return parameter;
  }

  public clone(): this {
    return structuredClone(this);
  }
}

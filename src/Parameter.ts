import { HasAttributes } from './Api/HasAttributes';
import { HasComment } from './Api/HasComment';
import { HasName } from './Api/HasName';
import { Attribute, AttributeArguments } from './Attribute';
import { PropertyValue } from './types';

export class Parameter implements HasName, HasAttributes, HasComment {
  private name: string;
  private attributes: Attribute[] = [];
  private comment: string | undefined;
  private reference: boolean = false;
  private type: string | undefined;
  private nullable: boolean = false;
  private hasDefaultValue: boolean = false;
  private defaultValue: PropertyValue;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
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

  public setComment(comment: string | undefined): this {
    this.comment = comment;
    return this;
  }

  public getComment(): string | undefined {
    return this.comment;
  }

  public addComment(comment: string): this {
    this.comment = comment;
    return this;
  }

  public removeComment(): this {
    this.comment = undefined;
    return this;
  }

  public setReference(reference: boolean = true): this {
    this.reference = reference;
    return this;
  }

  public isReference(): boolean {
    return this.reference;
  }

  public setType(type: string | undefined): this {
    if (type?.startsWith('?')) {
      this.nullable = true;
      type = type.slice(1);
    }

    this.type = type;
    return this;
  }

  public getType(): string | undefined {
    return this.type;
  }

  public setNullable(nullable: boolean = true): this {
    this.nullable = nullable;
    return this;
  }

  public isNullable(): boolean {
    return (
      this.nullable || (this.hasDefaultValue && this.defaultValue === null)
    );
  }

  public setDefaultValue(defaultValue: PropertyValue): this {
    this.hasDefaultValue = defaultValue !== undefined;
    this.defaultValue = defaultValue;
    return this;
  }

  public getDefaultValue(): PropertyValue {
    return this.defaultValue;
  }

  public cloneWithName(name: string): this {
    const parameter = structuredClone(this);
    parameter.name = name;
    return parameter;
  }
}

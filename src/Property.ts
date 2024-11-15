import { CanValidate } from './Api/CanValidate';
import { HasAttributes } from './Api/HasAttributes';
import { HasComment } from './Api/HasComment';
import { HasName } from './Api/HasName';
import { HasVisibility } from './Api/HasVisibility';
import { Attribute, AttributeArguments } from './Attribute';
import { PropertyValue, Visibility } from './types';

export class Property
  implements HasName, HasVisibility, HasComment, HasAttributes, CanValidate
{
  private name: string;
  private visibility: Visibility | undefined;
  private comment: string | undefined;
  private attributes: Attribute[] = [];

  private value: PropertyValue;
  private static: boolean = false;
  private type: string | undefined;
  private nullable: boolean = false;
  private initialized: boolean = false;
  private readOnly: boolean = false;

  constructor(name: string) {
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

  public setValue(value: PropertyValue): this {
    this.value = value;
    this.initialized = true;
    return this;
  }

  public getValue(): PropertyValue {
    return this.value;
  }

  public setStatic(stat: boolean = true): this {
    this.static = stat;
    return this;
  }

  public isStatic(): boolean {
    return this.static;
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

  public isNullable(): boolean {
    return this.nullable || (this.initialized && this.value === null);
  }

  public setNullable(nullable: boolean = true): this {
    this.nullable = nullable;
    return this;
  }

  public setInitialized(initialized: boolean = true): this {
    this.initialized = initialized;
    return this;
  }

  public isInitialized(): boolean {
    return this.initialized || this.value !== undefined;
  }

  public setReadOnly(readOnly: boolean = true): this {
    this.readOnly = readOnly;
    return this;
  }

  public isReadOnly(): boolean {
    return this.readOnly;
  }

  public validate(): void {
    if (this.readOnly && !this.type) {
      throw new Error(
        'Property cannot be read-only if it does not have a type'
      );
    }
  }

  public cloneWithName(name: string): this {
    const property = structuredClone(this);
    property.name = name;
    return property;
  }
}

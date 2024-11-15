import { CanValidate } from './Api/CanValidate';
import { HasAttributes } from './Api/HasAttributes';
import { HasComment } from './Api/HasComment';
import { Attribute, AttributeArguments } from './Attribute';
import { Helpers } from './Helpers';
import { PhpNamespace } from './PhpNamespace';

export abstract class ClassLike
  implements HasComment, HasAttributes, CanValidate
{
  private comment: string | undefined;
  private attributes: Attribute[] = [];
  private name: string | undefined;
  private namespace: PhpNamespace | undefined;

  constructor(name: string, namespace: PhpNamespace | undefined = undefined) {
    this.name = name;
    this.namespace = namespace;
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

  public setName(name: string | undefined): this {
    this.name = name;
    return this;
  }

  public isClass(): boolean {
    return false;
  }

  public isTrait(): boolean {
    return false;
  }

  public isInterface(): boolean {
    return false;
  }

  public isEnum(): boolean {
    return false;
  }

  public getName(): string | undefined {
    return this.name;
  }

  protected validateNames(names: string[]): void {
    for (const name of names) {
      if (!Helpers.isNamespaceIdentifier(name, true)) {
        throw new Error(`Value '${name}' is not valid class name.`);
      }
    }
  }

  abstract validate(): void;

  public clone(): this {
    return structuredClone(this);
  }
}

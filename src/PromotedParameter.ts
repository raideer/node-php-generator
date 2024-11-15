import { CanValidate } from './Api/CanValidate';
import { HasVisibility } from './Api/HasVisibility';
import { Parameter } from './Parameter';
import { Visibility } from './types';

export class PromotedParameter
  extends Parameter
  implements HasVisibility, CanValidate
{
  private visibility: Visibility | undefined;
  private readOnly: boolean = false;

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

  public setReadOnly(value: boolean = true): this {
    this.readOnly = value;
    return this;
  }

  public isReadOnly(): boolean {
    return this.readOnly;
  }

  public validate(): void {
    if (this.readOnly && !this.getType()) {
      throw new Error(
        'Promoter parameter cannot be read-only if it does not have a type'
      );
    }
  }

  public toString(): string {
    //TODO: Implement
    return '';
  }
}

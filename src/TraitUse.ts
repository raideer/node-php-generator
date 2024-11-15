import { HasComment } from './Api/HasComment';
import { HasName } from './Api/HasName';

export class TraitUse implements HasName, HasComment {
  private name: string;
  private comment: string | undefined;
  private resolutions: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public cloneWithName(name: string): this {
    const traitUse = structuredClone(this);
    traitUse.name = name;
    return traitUse;
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

  public getResolutions(): string[] {
    return this.resolutions;
  }

  public addResolution(resolution: string): this {
    this.resolutions.push(resolution);
    return this;
  }
}

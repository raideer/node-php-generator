import { Parameter } from "./Parameter";

export class PromotedParameter extends Parameter {
  private readOnly: boolean = false;

  setReadOnly(readOnly: boolean): this {
    this.readOnly = readOnly;

    return this;
  }

  isReadOnly(): boolean {
    return this.readOnly;
  }
}

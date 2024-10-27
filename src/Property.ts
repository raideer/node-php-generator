import { withAttributes } from "mixins/withAttributes";
import { withComments } from "mixins/withComments";
import { withName } from "mixins/withName";
import { withVisibility } from "mixins/withVisibility";

export class Property extends withName(withVisibility(withComments(withAttributes(class {})))) {
  private value: string | null = null;
  private static = false;
  private type: string | null = null;
  private nullable = false;
  private initialized = false;
  private readOnly = false;

  setValue(value: string | null): this {
    this.value = value;
    this.initialized = true;

    return this;
  }

  getValue(): string | null {
    return this.value;
  }

  setStatic(isStatic: boolean): this {
    this.static = isStatic;

    return this;
  }

  isStatic(): boolean {
    return this.static;
  }

  setType(type: string | null): this {
    this.type = type;

    return this;
  }

  getType(): string | null {
    return this.type;
  }

  setNullable(nullable: boolean): this {
    this.nullable = nullable || (this.initialized && this.value === null);

    return this;
  }

  isNullable(): boolean {
    return this.nullable;
  }

  setInitialized(initialized: boolean): this {
    this.initialized = initialized;

    return this;
  }

  isInitialized(): boolean {
    return this.initialized || this.value !== null;
  }

  setReadOnly(readOnly: boolean): this {
    this.readOnly = readOnly;

    return this;
  }

  isReadOnly(): boolean {
    return this.readOnly;
  }
}

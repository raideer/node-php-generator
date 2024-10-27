import { withAttributes } from "@/mixins/withAttributes";
import { withComments } from "@/mixins/withComments";
import { withName } from "@/mixins/withName";
import { withVisibility } from "@/mixins/withVisibility";

export class Constant extends withVisibility(withAttributes(withComments(withName(class {})))) {
  private value: any;
  private final = false;
  private type: string | null = null;

  setValue(value: any): this {
    this.value = value;

    return this;
  }

  getValue(): any {
    return this.value;
  }

  setFinal(final: boolean): this {
    this.final = final;

    return this;
  }

  isFinal(): boolean {
    return this.final;
  }

  setType(type: string | null): this {
    this.type = type;

    return this;
  }

  getType(): string | null {
    return this.type;
  }
}


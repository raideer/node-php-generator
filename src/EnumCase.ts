import { withAttributes } from "./mixins/withAttributes";
import { withComments } from "./mixins/withComments";
import { withName } from "./mixins/withName";

export class EnumCase extends withName(withComments(withAttributes(class {}))) {
  private value: string | undefined;

  getValue(): string | undefined {
    return this.value;
  }

  setValue(value: string | undefined): this {
    this.value = value;

    return this;
  }
}

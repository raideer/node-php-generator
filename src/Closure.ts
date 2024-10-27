import { asFunction } from "./mixins/asFunction";
import { withAttributes } from "./mixins/withAttributes";
import { Parameter } from "./Parameter";

export class Closure extends asFunction(withAttributes(class {})) {
  private uses: Parameter[] = [];

  getUses(): Parameter[] {
    return this.uses;
  }

  setUses(uses: Parameter[]): this {
    this.uses = uses;

    return this;
  }

  addUse(name: string): this {
    this.uses.push((new Parameter()).setName(name));

    return this;
  }
}

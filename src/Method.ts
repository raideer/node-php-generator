import { asFunction } from "mixins/asFunction";
import { withAttributes } from "mixins/withAttributes";
import { withComments } from "mixins/withComments";
import { withName } from "mixins/withName";
import { withVisibility } from "mixins/withVisibility";
import { PromotedParameter } from "./PromotedParameter";

export class Method extends asFunction(withVisibility(withAttributes(withComments(withName(class {}))))) {
  public static: boolean = false;
  public final: boolean = false;
  public abstract: boolean = false;

  setStatic(isStatic: boolean): this {
    this.static = isStatic;

    return this;
  }

  isStatic(): boolean {
    return this.static;
  }

  setFinal(final: boolean): this {
    this.final = final;

    return this;
  }

  isFinal(): boolean {
    return this.final;
  }

  setAbstract(abstract: boolean): this {
    this.abstract = abstract;

    return this;
  }

  isAbstract(): boolean {
    return this.abstract;
  }

  addPromotedParameter(name: string, defaultValue: string | null | undefined): this {
    const parameter = new PromotedParameter();
    parameter.setName(name);

    if (defaultValue !== undefined) {
      parameter.setDefaultValue(defaultValue);
    }

    this.parameters[name] = parameter;

    return this;
  }
}

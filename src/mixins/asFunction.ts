import { Parameter } from "@/Parameter";
import { Constructor } from "@/types";

export function asFunction<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public body: string = "";
    public parameters: Record<string, Parameter> = {};
    public variadic = false;
    public returnType: string | undefined;
    public returnReference = false;
    public returnNullable = false;

    setBody(body: string): this {
      this.body = body;

      return this;
    }

    addBody(body: string): this {
      this.body += body;

      return this;
    }

    getBody(): string {
      return this.body;
    }

    setParameters(parameters: Parameter[]): this {
      this.parameters = parameters.reduce((acc, parameter) => {
        acc[parameter.getName()!] = parameter;

        return acc;
      }, {} as Record<string, Parameter>);

      return this;
    }

    getParameters(): Parameter[] {
      return Object.values(this.parameters);
    }

    addParameter(name: string, defaultValue: string | null = null): Parameter {
      const parameter = new Parameter().setName(name);

      if (defaultValue) {
        parameter.setDefaultValue(defaultValue);
      }

      this.parameters[name] = parameter;
      
      return parameter;
    }

    setVariadic(variadic: boolean): this {
      this.variadic = variadic;

      return this;
    }

    isVariadic(): boolean {
      return this.variadic;
    }

    setReturnType(returnType: string | undefined): this {
      this.returnType = returnType;

      return this;
    }

    getReturnType(): string | undefined {
      return this.returnType;
    }

    setReturnReference(returnReference: boolean): this {
      this.returnReference = returnReference;

      return this;
    }

    getReturnReference(): boolean {
      return this.returnReference;
    }

    setReturnNullable(returnNullable: boolean = true): this {
      this.returnNullable = returnNullable;

      return this;
    }

    getReturnNullable(): boolean {
      return this.returnNullable;
    }
  }
}
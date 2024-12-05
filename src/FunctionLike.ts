import { Parameter } from './Parameter';
import { PropertyValue } from './types';

export abstract class FunctionLike {
  protected body: string = '';
  protected parameters: Map<string, Parameter> = new Map();

  protected variadic: boolean = false;
  protected returnType: string | undefined;
  protected returnReference: boolean = false;
  protected returnNullable: boolean = false;

  public setBody(code: string): this {
    this.body = code;
    return this;
  }

  public getBody(): string {
    return this.body;
  }

  public addBody(code: string): this {
    this.body += code;
    return this;
  }

  public setParameters(parameters: Parameter[]): this {
    this.parameters = new Map(
      parameters.map((parameter) => [parameter.getName(), parameter])
    );
    return this;
  }

  public getParameters(): Parameter[] {
    return Array.from(this.parameters.values());
  }

  public getParameter(name: string): Parameter | undefined {
    return this.parameters.get(name);
  }

  public addParameter(
    name: string,
    defaultValue: PropertyValue = undefined
  ): Parameter {
    const param = new Parameter(name);

    if (defaultValue !== undefined) {
      param.setDefaultValue(defaultValue);
    }

    this.parameters.set(name, param);
    return param;
  }

  public removeParameter(name: string): this {
    this.parameters.delete(name);
    return this;
  }

  public hasParameter(name: string): boolean {
    return this.parameters.has(name);
  }

  public setVariadic(variadic: boolean = true): this {
    this.variadic = variadic;
    return this;
  }

  public isVariadic(): boolean {
    return this.variadic;
  }

  public setReturnType(type: string | undefined): this {
    if (type?.startsWith('?')) {
      this.returnNullable = true;
      type = type.slice(1);
    }

    this.returnType = type;
    return this;
  }

  public getReturnType(): string | undefined {
    return this.returnType;
  }

  public isReturnNullable(): boolean {
    return this.returnNullable;
  }

  public setReturnReference(reference: boolean = true): this {
    this.returnReference = reference;
    return this;
  }

  public getReturnReference(): boolean {
    return this.returnReference;
  }

  public setReturnNullable(nullable: boolean = true): this {
    this.returnNullable = nullable;
    return this;
  }
}

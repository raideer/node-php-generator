export type AttributeArgument = string | number | boolean | null;
export type AttributeArguments = Record<string, AttributeArgument>;

export class Attribute {
  private name: string;
  private args: AttributeArguments;

  constructor(name: string, args: AttributeArguments = {}) {
    this.name = name;
    this.args = args;
  }

  public getName(): string {
    return this.name;
  }

  public getArguments(): AttributeArguments {
    return this.args;
  }
}

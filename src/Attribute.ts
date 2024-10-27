export class Attribute {
  private name: string;
  private args: any[];

  constructor(name: string, args: any[]) {
    this.name = name;
    this.args = args;
  }

  getName(): string {
    return this.name;
  }

  getArguments(): any[] {
    return this.args;
  }
}

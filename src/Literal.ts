export class Literal {
  private value: string;
  private args: any[] = [];

  constructor(value: string, args: any[] = []) {
    this.value = value;
    this.args = args;
  }
}

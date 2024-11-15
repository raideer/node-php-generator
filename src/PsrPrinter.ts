import { Printer } from './Printer';

export class PsrPrinter extends Printer {
  public linesBetweenMethods: number = 1;
  public linesBetweenUseTypes: number = 1;

  protected isBraceOnNextLine(
    multiLine: boolean,
    hasReturnType: boolean
  ): boolean {
    return !multiLine;
  }
}

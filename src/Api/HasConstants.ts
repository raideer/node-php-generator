import { Constant } from '../Constant';

export interface HasConstants {
  getConstants(): Constant[];
  getConstant(name: string): Constant | undefined;
  addConstant(
    name: string,
    value: string | undefined,
    override: boolean
  ): Constant;
  setConstants(constants: Constant[]): this;
  removeConstant(name: string): this;
  hasConstant(name: string): boolean;
}


import { Constant } from "@/Constant";
import { Constructor } from "@/types";
import { withAttributes } from "@/mixins/withAttributes";

export function withConstants<T extends Constructor<{}>>(target: T) {
  return class extends withAttributes(target) {
    public constants: Record<string, Constant> = {};


    setConstants(constants: Record<string, Constant>): this {
      this.constants = constants;

      return this;
    }

    getConstants(): Constant[] {
      return Object.values(this.constants);
    }

    getConstant(name: string): Constant | undefined {
      return this.constants[name];
    }

    addConstant(name: string, value: any, overwrite = false): this {
      if (!overwrite && this.constants[name]) {
        throw new Error(`Constant ${name} already exists`);
      }

      this.constants[name] = (new Constant())
        .setName(name)
        .setValue(value)
        .setPublic();

      return this;
    }

    hasConstant(name: string): boolean {
      return !!this.constants[name];
    }
  }
}
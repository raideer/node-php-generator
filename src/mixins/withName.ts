import { Constructor } from "@/types";

export function withName<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public name: string | undefined;

    setName(name: string): this {
      this.name = name;

      return this;
    }

    getName(): string | undefined {
      return this.name;
    }
  }
}
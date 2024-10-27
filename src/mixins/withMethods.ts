import { Method } from "@/Method";
import { Constructor } from "@/types";

export function withMethods<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public methods: Record<string, Method> = {};

    setMethods(methods: Record<string, Method>): this {
      this.methods = methods;

      return this;
    }

    getMethods(): Method[] {
      return Object.values(this.methods);
    }

    getMethod(name: string): Method | null {
      return this.methods[name.toLowerCase()] ?? null;
    }

    addMethod(name: string, overwrite = false): Method {
      const lower = name.toLowerCase();

      if (!overwrite && this.methods[lower]) {
        throw new Error(`Method ${name} already exists`);
      }

      const method = (new Method()).setName(name);

      this.methods[lower] = method;

      return method;
    }
  }
}
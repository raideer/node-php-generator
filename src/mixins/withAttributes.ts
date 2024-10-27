import { Attribute } from "@/Attribute";
import { Constructor } from "@/types";

export function withAttributes<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public attributes: Attribute[] = [];

    addAttribute(name: string, args: any[]): this {
      this.attributes.push(new Attribute(name, args));

      return this;
    }

    setAttributes(attributes: Attribute[]): this {
      this.attributes = attributes;

      return this;
    }

    getAttributes(): Attribute[] {
      return this.attributes;
    } 
  }
}
import { Property } from "@/Property";
import { Constructor } from "@/types";

export function withProperties<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public properties: Record<string, Property> = {};

    setProperties(properties: Property[]): this {
      this.properties = properties.reduce((acc, property) => {
        const name = property.getName();

        acc[name!] = property;

        return acc;
      }, {} as Record<string, Property>);

      return this;
    }

    getProperties(): Property[] {
      return Object.values(this.properties);
    }

    addProperty(name: string, value?: string | null, overwrite = false): Property {
      if (!overwrite && this.properties[name]) {
        throw new Error(`Property ${name} already exists`);
      }

      const property = new Property().setName(name);

      if (value !== undefined) {
        property.setValue(value);
      }

      this.properties[name] = property;

      return property;
    }

    getProperty(name: string): Property | undefined {
      return this.properties[name];
    }

    removeProperty(name: string): this {
      delete this.properties[name];

      return this;
    }

    hasProperty(name: string): boolean {
      return !!this.properties[name];
    }
  }
}
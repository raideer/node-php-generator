import { Property } from '../Property';

export interface HasProperties {
  getProperties(): Property[];
  setProperties(properties: Property[]): this;
  getProperty(name: string): Property | undefined;
  addProperty(
    name: string,
    value: string | undefined,
    overwrite: boolean
  ): Property;
  removeProperty(name: string): this;
  hasProperty(name: string): boolean;
}

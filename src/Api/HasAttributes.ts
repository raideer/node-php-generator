import { Attribute, AttributeArguments } from '../Attribute';

export interface HasAttributes {
  getAttributes(): Attribute[];
  addAttribute(name: string, args: AttributeArguments): this;
  setAttributes(attributes: Attribute[]): this;
}

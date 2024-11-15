import { TraitUse } from '../TraitUse';

export interface HasTraits {
  getTraits(): TraitUse[];
  setTraits(traits: TraitUse[]): this;
  getTrait(name: string): TraitUse | undefined;
  addTrait(name: string, overwrite: boolean): TraitUse;
  removeTrait(name: string): this;
  hasTrait(name: string): boolean;
}

import { TraitUse } from "@/TraitUse";
import { Constructor } from "@/types";

export function withTraits<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public traits: Record<string, TraitUse> = {};

    setTraits(traits: TraitUse[]): this {
      this.traits = traits.reduce((acc, trait) => {
        const name = trait.getName();

        acc[name!] = trait;

        return acc;
      }, {} as Record<string, TraitUse>);

      return this;
    }

    getTraits(): TraitUse[] {
      return Object.values(this.traits);
    }

    addTrait(name: string): TraitUse {
      if (this.traits[name]) {
        throw new Error(`Trait ${name} already exists`);
      }

      const trait = new TraitUse().setName(name);

      this.traits[name] = trait;

      return trait;
    }

    getTrait(name: string): TraitUse | undefined {
      return this.traits[name];
    }

    removeTrait(name: string): this {
      delete this.traits[name];

      return this;
    }

    hasTrait(name: string): boolean {
      return !!this.traits[name];
    }
  };
}

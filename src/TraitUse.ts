import { withComments } from "mixins/withComments";
import { withName } from "mixins/withName";

export class TraitUse extends withName(withComments(class {})) {
  private resolutions: string[] = [];

  addResolution(resolution: string): this {
    this.resolutions.push(resolution);

    return this;
  }

  getResolutions(): string[] {
    return this.resolutions;
  }

  setResolutions(resolutions: string[]): this {
    this.resolutions = resolutions;

    return this;
  }
}

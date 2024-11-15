export interface HasName {
  getName(): string;
  cloneWithName(name: string): this;
}

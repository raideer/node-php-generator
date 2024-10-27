import { withAttributes } from "@/mixins/withAttributes";
import { withComments } from "@/mixins/withComments";
import { PhpNamespace } from "@/PhpNamespace";

export enum ClassVisibility {
  PUBLIC = "public",
  PROTECTED = "protected",
  PRIVATE = "private",
}

export class ClassLike extends withComments(withAttributes(class {})) {
  private namespace: PhpNamespace | null = null;

  private name: string | undefined;

  constructor(name: string, namespace: PhpNamespace | null = null) {
    super();

    this.name = name;
    this.namespace = namespace;
  }

  getName(): string | undefined {
    return this.name;
  }

  setName(name: string | undefined): this {
    this.name = name;

    return this;
  }

  isClass(): boolean {
    return false;
  }

  isTrait(): boolean {
    return false;
  }

  isInterface(): boolean {
    return false;
  }

  isEnum(): boolean {
    return false;
  }
}

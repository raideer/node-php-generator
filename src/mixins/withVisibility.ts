import { ClassVisibility } from "@/ClassLike";
import { Constructor } from "@/types";

export function withVisibility<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public visibility: ClassVisibility | undefined;

    setVisibility(visibility: ClassVisibility | undefined): this {
      if (visibility && ![ClassVisibility.PUBLIC, ClassVisibility.PROTECTED, ClassVisibility.PRIVATE].includes(visibility)) {
        throw new Error(`Invalid visibility: ${visibility}`);
      }

      this.visibility = visibility;

      return this;
    }

    getVisibility(): ClassVisibility | undefined {
      return this.visibility;
    }

    setPublic(): this {
      this.setVisibility(ClassVisibility.PUBLIC);

      return this;
    }

    setProtected(): this {
      this.setVisibility(ClassVisibility.PROTECTED);

      return this;
    }

    setPrivate(): this {
      this.setVisibility(ClassVisibility.PRIVATE);

      return this;
    }
  }
}

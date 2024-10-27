import { Constructor } from "@/types";

export function withComments<T extends Constructor<{}>>(target: T) {
  return class extends target {
    public comment: string | undefined;

    setComment(comment: string): this {
      this.comment = comment;

      return this;
    }

    getComment(): string | undefined {
      return this.comment;
    }

    addComment(comment: string): this {
      this.comment = this.comment ? `${this.comment}\n${comment}` : comment;

      return this;
    }

    removeComment(): this {
      this.comment = undefined;

      return this;
    }
  }
}
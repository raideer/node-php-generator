export interface HasComment {
  getComment(): string | undefined;
  setComment(comment: string | undefined): this;
  addComment(comment: string): this;
  removeComment(): this;
}

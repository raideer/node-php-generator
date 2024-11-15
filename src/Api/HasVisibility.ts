import { Visibility } from '../types';

export interface HasVisibility {
  getVisibility(): Visibility | undefined;
  setVisibility(visibility: Visibility | undefined): this;
  setPublic(): this;
  isPublic(): boolean;
  setPrivate(): this;
  isPrivate(): boolean;
  setProtected(): this;
  isProtected(): boolean;
}

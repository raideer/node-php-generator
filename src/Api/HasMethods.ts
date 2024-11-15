import { Method } from '../Method';

export interface HasMethods {
  getMethods(): Method[];
  setMethods(methods: Method[]): this;
  getMethod(name: string): Method | undefined;
  addMethod(name: string, overwrite: boolean): Method;
  removeMethod(name: string): this;
  hasMethod(name: string): boolean;
}

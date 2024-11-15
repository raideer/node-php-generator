export type Visibility = 'public' | 'private' | 'protected';

export enum Type {
  String = 'string',
  Int = 'int',
  Float = 'float',
  Bool = 'bool',
  Array = 'array',
  Object = 'object',
  Callable = 'callable',
  Iterable = 'iterable',
  Void = 'void',
  Never = 'never',
  Mixed = 'mixed',
  Null = 'null',
  False = 'false',
  True = 'true',
  Self = 'self',
  Parent = 'parent',
  Static = 'static',
}

export type PropertyValuePrimitive = string | number | boolean | undefined;
export type PropertyValue = PropertyValuePrimitive | PropertyValuePrimitive[];

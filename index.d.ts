declare module 'node-php-generator/Api/CanValidate' {
  export interface CanValidate {
      validate(): void;
  }

}
declare module 'node-php-generator/Api/HasAttributes' {
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  export interface HasAttributes {
      getAttributes(): Attribute[];
      addAttribute(name: string, args: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
  }

}
declare module 'node-php-generator/Api/HasComment' {
  export interface HasComment {
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
  }

}
declare module 'node-php-generator/Api/HasConstants' {
  import { Constant } from 'node-php-generator/Constant';
  export interface HasConstants {
      getConstants(): Constant[];
      getConstant(name: string): Constant | undefined;
      addConstant(name: string, value: string | undefined, override: boolean): Constant;
      setConstants(constants: Constant[]): this;
      removeConstant(name: string): this;
      hasConstant(name: string): boolean;
  }

}
declare module 'node-php-generator/Api/HasMethods' {
  import { Method } from 'node-php-generator/Method';
  export interface HasMethods {
      getMethods(): Method[];
      setMethods(methods: Method[]): this;
      getMethod(name: string): Method | undefined;
      addMethod(name: string, overwrite: boolean): Method;
      removeMethod(name: string): this;
      hasMethod(name: string): boolean;
  }

}
declare module 'node-php-generator/Api/HasName' {
  export interface HasName {
      getName(): string;
      cloneWithName(name: string): this;
  }

}
declare module 'node-php-generator/Api/HasProperties' {
  import { Property } from 'node-php-generator/Property';
  export interface HasProperties {
      getProperties(): Property[];
      setProperties(properties: Property[]): this;
      getProperty(name: string): Property | undefined;
      addProperty(name: string, value: string | undefined, overwrite: boolean): Property;
      removeProperty(name: string): this;
      hasProperty(name: string): boolean;
  }

}
declare module 'node-php-generator/Api/HasTraits' {
  import { TraitUse } from 'node-php-generator/TraitUse';
  export interface HasTraits {
      getTraits(): TraitUse[];
      setTraits(traits: TraitUse[]): this;
      getTrait(name: string): TraitUse | undefined;
      addTrait(name: string, overwrite: boolean): TraitUse;
      removeTrait(name: string): this;
      hasTrait(name: string): boolean;
  }

}
declare module 'node-php-generator/Api/HasVisibility' {
  import { Visibility } from 'node-php-generator/types';
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

}
declare module 'node-php-generator/Attribute' {
  export type AttributeArgument = string | number | boolean | null;
  export type AttributeArguments = Record<string, AttributeArgument>;
  export class Attribute {
      private name;
      private args;
      constructor(name: string, args?: AttributeArguments);
      getName(): string;
      getArguments(): AttributeArguments;
  }

}
declare module 'node-php-generator/ClassLike' {
  import { CanValidate } from 'node-php-generator/Api/CanValidate';
  import { HasAttributes } from 'node-php-generator/Api/HasAttributes';
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  import { PhpNamespace } from 'node-php-generator/PhpNamespace';
  export abstract class ClassLike implements HasComment, HasAttributes, CanValidate {
      private comment;
      private attributes;
      private name;
      private namespace;
      constructor(name: string, namespace?: PhpNamespace | undefined);
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      setName(name: string | undefined): this;
      isClass(): boolean;
      isTrait(): boolean;
      isInterface(): boolean;
      isEnum(): boolean;
      getName(): string | undefined;
      protected validateNames(names: string[]): void;
      abstract validate(): void;
      clone(): this;
  }

}
declare module 'node-php-generator/ClassType' {
  import { HasConstants } from 'node-php-generator/Api/HasConstants';
  import { HasMethods } from 'node-php-generator/Api/HasMethods';
  import { HasProperties } from 'node-php-generator/Api/HasProperties';
  import { HasTraits } from 'node-php-generator/Api/HasTraits';
  import { ClassLike } from 'node-php-generator/ClassLike';
  import { Constant } from 'node-php-generator/Constant';
  import { Method } from 'node-php-generator/Method';
  import type { PhpNamespace } from 'node-php-generator/PhpNamespace';
  import { Property } from 'node-php-generator/Property';
  import { TraitUse } from 'node-php-generator/TraitUse';
  import { PropertyValue } from 'node-php-generator/types';
  export type ClassMember = Constant | Method | Property | TraitUse;
  export class ClassType extends ClassLike implements HasConstants, HasMethods, HasProperties, HasTraits {
      private consts;
      private methods;
      private properties;
      private traits;
      private _isAbstract;
      private _isFinal;
      private readOnly;
      private extends;
      private implements;
      constructor(name?: string, namespace?: PhpNamespace);
      isClass(): boolean;
      setFinal(value?: boolean): this;
      isFinal(): boolean;
      setAbstract(value?: boolean): this;
      isAbstract(): boolean;
      setReadOnly(value?: boolean): this;
      isReadOnly(): boolean;
      setExtends(name?: string): this;
      getExtends(): string | undefined;
      setImplements(names: string[]): this;
      getImplements(): string[];
      addImplement(name: string): this;
      removeImplement(name: string): this;
      addMember(member: ClassMember, override?: boolean): this;
      setConstants(consts: Constant[]): this;
      getConstants(): Constant[];
      getConstant(name: string): Constant | undefined;
      addConstant(name: string, value: string | number | boolean | undefined, override?: boolean): Constant;
      removeConstant(name: string): this;
      hasConstant(name: string): boolean;
      setMethods(methods: Method[]): this;
      getMethods(): Method[];
      getMethod(name: string): Method | undefined;
      addMethod(name: string, override?: boolean): Method;
      removeMethod(name: string): this;
      hasMethod(name: string): boolean;
      setProperties(properties: Property[]): this;
      getProperties(): Property[];
      getProperty(name: string): Property | undefined;
      addProperty(name: string, value?: PropertyValue, override?: boolean): Property;
      removeProperty(name: string): this;
      hasProperty(name: string): boolean;
      setTraits(traits: TraitUse[]): this;
      getTraits(): TraitUse[];
      getTrait(name: string): TraitUse | undefined;
      addTrait(name: string, override?: boolean): TraitUse;
      removeTrait(name: string): this;
      hasTrait(name: string): boolean;
      validate(): void;
      clone(): this;
  }

}
declare module 'node-php-generator/Closure' {
  import { HasAttributes } from 'node-php-generator/Api/HasAttributes';
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  import { FunctionLike } from 'node-php-generator/FunctionLike';
  import { Parameter } from 'node-php-generator/Parameter';
  export class Closure extends FunctionLike implements HasAttributes {
      private attributes;
      private uses;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      setUses(uses: Parameter[]): this;
      getUses(): Parameter[];
      clone(): this;
  }

}
declare module 'node-php-generator/Constant' {
  import { HasAttributes } from 'node-php-generator/Api/HasAttributes';
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { HasName } from 'node-php-generator/Api/HasName';
  import { HasVisibility } from 'node-php-generator/Api/HasVisibility';
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  import { Visibility } from 'node-php-generator/types';
  export class Constant implements HasName, HasVisibility, HasComment, HasAttributes {
      private name;
      private value;
      private final;
      private type;
      private visibility;
      private comment;
      private attributes;
      constructor(name: string);
      getName(): string;
      getVisibility(): Visibility | undefined;
      setVisibility(visibility: Visibility | undefined): this;
      setPublic(): this;
      isPublic(): boolean;
      setPrivate(): this;
      isPrivate(): boolean;
      setProtected(): this;
      isProtected(): boolean;
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      getValue(): string | number | boolean | undefined;
      setValue(value: string | number | boolean | undefined): this;
      isFinal(): boolean;
      setFinal(final?: boolean): this;
      getType(): string | undefined;
      setType(type: string | undefined): this;
      cloneWithName(name: string): this;
  }

}
declare module 'node-php-generator/Dumper' {
  export class Dumper {
      private static readonly IndentLength;
      maxDepth: number;
      wrapLength: number;
      indentation: string;
      customObjects: boolean;
      dump(varToDump: any, column?: number): string;
      private dumpVar;
      private dumpString;
      private dumpArray;
      private dumpObject;
      private dumpCustomObject;
      private dumpLiteral;
      format(statement: string, ...args: any[]): string;
      private dumpArguments;
  }

}
declare module 'node-php-generator/EnumCase' {
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  export type EnumCaseValue = string | number | boolean | null;
  export class EnumCase {
      private name;
      private comment;
      private attributes;
      private value;
      constructor(name: string);
      getName(): string;
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      setValue(value: EnumCaseValue): this;
      getValue(): EnumCaseValue;
      cloneWithName(name: string): this;
  }

}
declare module 'node-php-generator/EnumType' {
  import { HasConstants } from 'node-php-generator/Api/HasConstants';
  import { HasMethods } from 'node-php-generator/Api/HasMethods';
  import { HasTraits } from 'node-php-generator/Api/HasTraits';
  import { ClassLike } from 'node-php-generator/ClassLike';
  import { Constant } from 'node-php-generator/Constant';
  import { EnumCase, EnumCaseValue } from 'node-php-generator/EnumCase';
  import { Method } from 'node-php-generator/Method';
  import { TraitUse } from 'node-php-generator/TraitUse';
  export type EnumMember = Constant | Method | TraitUse | EnumCase;
  export class EnumType extends ClassLike implements HasConstants, HasMethods, HasTraits {
      private consts;
      private methods;
      private traits;
      private implements;
      private cases;
      private type;
      isEnum(): boolean;
      setType(type?: string): this;
      getType(): string | undefined;
      setImplements(impl: string[]): this;
      getImplements(): string[];
      addImplement(impl: string): this;
      removeImplement(impl: string): this;
      setCases(cases: EnumCase[]): this;
      getCases(): EnumCase[];
      addCase(name: string, value?: EnumCaseValue, overwrite?: boolean): EnumCase;
      removeCase(name: string): this;
      hasCase(name: string): boolean;
      addMember(member: EnumMember, overwrite?: boolean): this;
      getConstants(): Constant[];
      getConstant(name: string): Constant | undefined;
      addConstant(name: string, value: string | undefined, override?: boolean): Constant;
      setConstants(constants: Constant[]): this;
      removeConstant(name: string): this;
      hasConstant(name: string): boolean;
      getMethods(): Method[];
      setMethods(methods: Method[]): this;
      getMethod(name: string): Method | undefined;
      addMethod(name: string, overwrite?: boolean): Method;
      removeMethod(name: string): this;
      hasMethod(name: string): boolean;
      getTraits(): TraitUse[];
      setTraits(traits: TraitUse[]): this;
      getTrait(name: string): TraitUse | undefined;
      addTrait(name: string, overwrite?: boolean): TraitUse;
      removeTrait(name: string): this;
      hasTrait(name: string): boolean;
      validate(): void;
  }

}
declare module 'node-php-generator/FunctionLike' {
  import { Parameter } from 'node-php-generator/Parameter';
  import { PropertyValue } from 'node-php-generator/types';
  export abstract class FunctionLike {
      protected body: string;
      protected parameters: Map<string, Parameter>;
      protected variadic: boolean;
      protected returnType: string | undefined;
      protected returnReference: boolean;
      protected returnNullable: boolean;
      setBody(code: string): this;
      getBody(): string;
      addBody(code: string): this;
      setParameters(parameters: Parameter[]): this;
      getParameters(): Parameter[];
      getParameter(name: string): Parameter | undefined;
      addParameter(name: string, defaultValue?: PropertyValue): Parameter;
      removeParameter(name: string): this;
      hasParameter(name: string): boolean;
      setVariadic(variadic?: boolean): this;
      isVariadic(): boolean;
      setReturnType(type: string | undefined): this;
      getReturnType(): string | undefined;
      isReturnNullable(): boolean;
      setReturnReference(reference?: boolean): this;
      getReturnReference(): boolean;
      setReturnNullable(nullable?: boolean): this;
  }

}
declare module 'node-php-generator/GlobalFunction' {
  import { HasAttributes } from 'node-php-generator/Api/HasAttributes';
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { HasName } from 'node-php-generator/Api/HasName';
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  import { FunctionLike } from 'node-php-generator/FunctionLike';
  export class GlobalFunction extends FunctionLike implements HasName, HasComment, HasAttributes {
      private name;
      private comment;
      private attributes;
      constructor(name: string);
      getName(): string;
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      cloneWithName(name: string): this;
      clone(): this;
  }

}
declare module 'node-php-generator/Helpers' {
  export class Helpers {
      static readonly ReIdentifier = "[a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*";
      static readonly Keywords: Record<string, number>;
      static formatDocComment(content: string, forceMultiLine?: boolean): string;
      static tagName(name: string, of?: string): string;
      static simplifyTaggedNames(code: string, namespace: any): string;
      static unformatDocComment(comment: string): string;
      static unindent(s: string, level?: number): string;
      static isIdentifier(value: any): boolean;
      static isNamespaceIdentifier(value: any, allowLeadingSlash?: boolean): boolean;
      static extractNamespace(name: string): string;
      static extractShortName(name: string): string;
      static tabsToSpaces(s: string, count?: number): string;
      static normalize(s: string): string;
      static normalizeNewLines(s: string): string;
      static validateType(type: string | null, nullable?: boolean): string | null;
  }

}
declare module 'node-php-generator/InterfaceType' {
  import { HasConstants } from 'node-php-generator/Api/HasConstants';
  import { HasMethods } from 'node-php-generator/Api/HasMethods';
  import { ClassLike } from 'node-php-generator/ClassLike';
  import { Constant } from 'node-php-generator/Constant';
  import { Method } from 'node-php-generator/Method';
  export type InterfaceMember = Constant | Method;
  export class InterfaceType extends ClassLike implements HasConstants, HasMethods {
      private consts;
      private methods;
      private ext;
      isInterface(): boolean;
      setExtends(ext: string[]): this;
      getExtends(): string[];
      addExtends(ext: string): this;
      addMember(member: InterfaceMember, overwrite?: boolean): this;
      getConstants(): Constant[];
      getConstant(name: string): Constant | undefined;
      addConstant(name: string, value: string | undefined, override?: boolean): Constant;
      setConstants(constants: Constant[]): this;
      removeConstant(name: string): this;
      hasConstant(name: string): boolean;
      getMethods(): Method[];
      setMethods(methods: Method[]): this;
      getMethod(name: string): Method | undefined;
      addMethod(name: string, overwrite?: boolean): Method;
      removeMethod(name: string): this;
      hasMethod(name: string): boolean;
      validate(): void;
  }

}
declare module 'node-php-generator/Literal' {
  export class Literal {
      private value;
      constructor(value: string);
      toString(): string;
  }

}
declare module 'node-php-generator/Method' {
  import { HasAttributes } from 'node-php-generator/Api/HasAttributes';
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { HasName } from 'node-php-generator/Api/HasName';
  import { HasVisibility } from 'node-php-generator/Api/HasVisibility';
  import { CanValidate } from 'node-php-generator/Api/CanValidate';
  import { FunctionLike } from 'node-php-generator/FunctionLike';
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  import { PropertyValue, Visibility } from 'node-php-generator/types';
  import { PromotedParameter } from 'node-php-generator/PromotedParameter';
  export const CONSTRUCTOR = "__construct";
  export class Method extends FunctionLike implements HasName, HasVisibility, HasComment, HasAttributes, CanValidate {
      private name;
      private visibility;
      private comment;
      private attributes;
      private _isStatic;
      private _isAbstract;
      private _isFinal;
      constructor(name: string);
      getName(): string;
      setName(name: string): this;
      getVisibility(): Visibility | undefined;
      setVisibility(visibility: Visibility | undefined): this;
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      cloneWithName(name: string): this;
      setPublic(): this;
      isPublic(): boolean;
      setPrivate(): this;
      isPrivate(): boolean;
      setProtected(): this;
      isProtected(): boolean;
      setStatic(value?: boolean): this;
      isStatic(): boolean;
      setAbstract(value?: boolean): this;
      isAbstract(): boolean;
      setFinal(value?: boolean): this;
      isFinal(): boolean;
      validate(): void;
      addPromotedParameter(name: string, value?: PropertyValue): PromotedParameter;
      clone(): this;
  }

}
declare module 'node-php-generator/Parameter' {
  import { HasAttributes } from 'node-php-generator/Api/HasAttributes';
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { HasName } from 'node-php-generator/Api/HasName';
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  import { PropertyValue } from 'node-php-generator/types';
  export class Parameter implements HasName, HasAttributes, HasComment {
      private name;
      private attributes;
      private comment;
      private reference;
      private type;
      private nullable;
      private hasDefaultValue;
      private defaultValue;
      constructor(name: string);
      getName(): string;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      setComment(comment: string | undefined): this;
      getComment(): string | undefined;
      addComment(comment: string): this;
      removeComment(): this;
      setReference(reference?: boolean): this;
      isReference(): boolean;
      setType(type: string | undefined): this;
      getType(): string | undefined;
      setNullable(nullable?: boolean): this;
      isNullable(): boolean;
      setDefaultValue(defaultValue: PropertyValue): this;
      getDefaultValue(): PropertyValue;
      cloneWithName(name: string): this;
  }

}
declare module 'node-php-generator/PhpFile' {
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { NamespaceType, PhpNamespace } from 'node-php-generator/PhpNamespace';
  import { ClassType } from 'node-php-generator/ClassType';
  import { InterfaceType } from 'node-php-generator/InterfaceType';
  import { TraitType } from 'node-php-generator/TraitType';
  import { EnumType } from 'node-php-generator/EnumType';
  import { GlobalFunction } from 'node-php-generator/GlobalFunction';
  export class PhpFile implements HasComment {
      private comment;
      private namespaces;
      private strictTypes;
      addClass(name: string): ClassType;
      addInterface(name: string): InterfaceType;
      addTrait(name: string): TraitType;
      addEnum(name: string): EnumType;
      addFunction(name: string): GlobalFunction;
      addNamespace(namespace: string | PhpNamespace): PhpNamespace;
      removeNamespace(namespace: string | PhpNamespace): this;
      getNamespaces(): PhpNamespace[];
      getClasses(): (ClassType | InterfaceType | TraitType | EnumType)[];
      getFunctions(): GlobalFunction[];
      addUse(name: string, alias?: string | null, of?: NamespaceType): this;
      setStrictTypes(state?: boolean): this;
      hasStrictTypes(): boolean;
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
  }

}
declare module 'node-php-generator/PhpNamespace' {
  import { ClassType } from 'node-php-generator/ClassType';
  import { InterfaceType } from 'node-php-generator/InterfaceType';
  import { TraitType } from 'node-php-generator/TraitType';
  import { EnumType } from 'node-php-generator/EnumType';
  import { GlobalFunction } from 'node-php-generator/GlobalFunction';
  export enum NamespaceType {
      Normal = "normal",
      Function = "function",
      Constant = "constant"
  }
  export class PhpNamespace {
      private name;
      private bracketedSyntax;
      private aliases;
      private classes;
      private functions;
      constructor(name: string);
      getName(): string;
      setBracketedSyntax(state?: boolean): this;
      hasBracketedSyntax(): boolean;
      addUse(name: string, alias?: string | null, of?: string): this;
      removeUse(name: string, of?: string): void;
      addUseFunction(name: string, alias?: string | null): this;
      addUseConstant(name: string, alias?: string | null): this;
      getUses(of?: string): Record<string, string>;
      resolveName(name: string, of?: string): string;
      simplifyType(type: string, of?: string): string;
      simplifyName(name: string, of?: string): string;
      add(classType: ClassType | InterfaceType | TraitType | EnumType): this;
      addClass(name: string): ClassType;
      addInterface(name: string): InterfaceType;
      addTrait(name: string): TraitType;
      addEnum(name: string): EnumType;
      getClass(name: string): ClassType | InterfaceType | TraitType | EnumType;
      getClasses(): (ClassType | InterfaceType | TraitType | EnumType)[];
      removeClass(name: string): this;
      addFunction(name: string): GlobalFunction;
      getFunction(name: string): GlobalFunction;
      getFunctions(): GlobalFunction[];
      removeFunction(name: string): this;
  }

}
declare module 'node-php-generator/Printer' {
  import { GlobalFunction } from 'node-php-generator/GlobalFunction';
  import { Closure } from 'node-php-generator/Closure';
  import { Method } from 'node-php-generator/Method';
  import { InterfaceType } from 'node-php-generator/InterfaceType';
  import { ClassType } from 'node-php-generator/ClassType';
  import { TraitType } from 'node-php-generator/TraitType';
  import { EnumType } from 'node-php-generator/EnumType';
  import { NamespaceType, PhpNamespace } from 'node-php-generator/PhpNamespace';
  import { PhpFile } from 'node-php-generator/PhpFile';
  import { Dumper } from 'node-php-generator/Dumper';
  import { Attribute } from 'node-php-generator/Attribute';
  export class Printer {
      wrapLength: number;
      indentation: string;
      linesBetweenProperties: number;
      linesBetweenMethods: number;
      linesBetweenUseTypes: number;
      returnTypeColon: string;
      bracesOnNextLine: boolean;
      singleParameterOnOneLine: boolean;
      omitEmptyNamespaces: boolean;
      protected namespace: PhpNamespace | null;
      protected dumper: Dumper;
      private resolveTypes;
      constructor();
      printFunction(func: GlobalFunction, namespace?: PhpNamespace | null): string;
      printClosure(closure: Closure, namespace?: PhpNamespace | null): string;
      printMethod(method: Method, namespace?: PhpNamespace | null, isInterface?: boolean): string;
      printClass(classType: ClassType | InterfaceType | TraitType | EnumType, namespace?: PhpNamespace | null): string;
      printEnum(enumType: EnumType): string;
      printTrait(traitType: TraitType): string;
      printInterface(interfaceType: InterfaceType): string;
      printNamespace(namespace: PhpNamespace): string;
      printFile(file: PhpFile): string;
      protected printUses(namespace: PhpNamespace, of?: NamespaceType): string;
      protected printParameters(func: GlobalFunction | Method | Closure, column?: number): string;
      private formatParameters;
      private formatParameter;
      private isVariadicParameter;
      private getParameterVisibility;
      private getParameterDefaultValue;
      private printConstant;
      private printProperty;
      protected printType(type: string | undefined, nullable: boolean): string;
      protected printDocComment(commentable: {
          getComment(): string | undefined;
      }): string;
      protected printReturnType(func: GlobalFunction | Method | Closure): string;
      protected printAttributes(attrs: Attribute[], inline?: boolean): string;
      protected indent(s: string): string;
      protected dump(varToDump: any, column?: number): string;
      protected isBraceOnNextLine(multiLine: boolean, hasReturnType: boolean): boolean;
  }

}
declare module 'node-php-generator/PromotedParameter' {
  import { CanValidate } from 'node-php-generator/Api/CanValidate';
  import { HasVisibility } from 'node-php-generator/Api/HasVisibility';
  import { Parameter } from 'node-php-generator/Parameter';
  import { Visibility } from 'node-php-generator/types';
  export class PromotedParameter extends Parameter implements HasVisibility, CanValidate {
      private visibility;
      private readOnly;
      getVisibility(): Visibility | undefined;
      setVisibility(visibility: Visibility | undefined): this;
      setPublic(): this;
      isPublic(): boolean;
      setPrivate(): this;
      isPrivate(): boolean;
      setProtected(): this;
      isProtected(): boolean;
      setReadOnly(value?: boolean): this;
      isReadOnly(): boolean;
      validate(): void;
      toString(): string;
  }

}
declare module 'node-php-generator/Property' {
  import { CanValidate } from 'node-php-generator/Api/CanValidate';
  import { HasAttributes } from 'node-php-generator/Api/HasAttributes';
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { HasName } from 'node-php-generator/Api/HasName';
  import { HasVisibility } from 'node-php-generator/Api/HasVisibility';
  import { Attribute, AttributeArguments } from 'node-php-generator/Attribute';
  import { PropertyValue, Visibility } from 'node-php-generator/types';
  export class Property implements HasName, HasVisibility, HasComment, HasAttributes, CanValidate {
      private name;
      private visibility;
      private comment;
      private attributes;
      private value;
      private static;
      private type;
      private nullable;
      private initialized;
      private readOnly;
      constructor(name: string);
      getName(): string;
      setName(name: string): this;
      getVisibility(): Visibility | undefined;
      setVisibility(visibility: Visibility | undefined): this;
      setPublic(): this;
      isPublic(): boolean;
      setPrivate(): this;
      isPrivate(): boolean;
      setProtected(): this;
      isProtected(): boolean;
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
      getAttributes(): Attribute[];
      addAttribute(name: string, args?: AttributeArguments): this;
      setAttributes(attributes: Attribute[]): this;
      setValue(value: PropertyValue): this;
      getValue(): PropertyValue;
      setStatic(stat?: boolean): this;
      isStatic(): boolean;
      setType(type: string | undefined): this;
      getType(): string | undefined;
      isNullable(): boolean;
      setNullable(nullable?: boolean): this;
      setInitialized(initialized?: boolean): this;
      isInitialized(): boolean;
      setReadOnly(readOnly?: boolean): this;
      isReadOnly(): boolean;
      validate(): void;
      cloneWithName(name: string): this;
  }

}
declare module 'node-php-generator/PsrPrinter' {
  import { Printer } from 'node-php-generator/Printer';
  export class PsrPrinter extends Printer {
      linesBetweenMethods: number;
      linesBetweenUseTypes: number;
      protected isBraceOnNextLine(multiLine: boolean, hasReturnType: boolean): boolean;
  }

}
declare module 'node-php-generator/TraitType' {
  import { HasConstants } from 'node-php-generator/Api/HasConstants';
  import { HasMethods } from 'node-php-generator/Api/HasMethods';
  import { HasProperties } from 'node-php-generator/Api/HasProperties';
  import { HasTraits } from 'node-php-generator/Api/HasTraits';
  import { ClassLike } from 'node-php-generator/ClassLike';
  import { Constant } from 'node-php-generator/Constant';
  import { Method } from 'node-php-generator/Method';
  import { Property } from 'node-php-generator/Property';
  import { TraitUse } from 'node-php-generator/TraitUse';
  export type TraitMember = Constant | Method | Property | TraitUse;
  export class TraitType extends ClassLike implements HasConstants, HasMethods, HasProperties, HasTraits {
      private consts;
      private methods;
      private properties;
      private traits;
      isTrait(): boolean;
      addMember(member: TraitMember, overwrite?: boolean): this;
      getConstants(): Constant[];
      getConstant(name: string): Constant | undefined;
      addConstant(name: string, value: string | undefined, override?: boolean): Constant;
      setConstants(constants: Constant[]): this;
      removeConstant(name: string): this;
      hasConstant(name: string): boolean;
      getMethods(): Method[];
      setMethods(methods: Method[]): this;
      getMethod(name: string): Method | undefined;
      addMethod(name: string, overwrite?: boolean): Method;
      removeMethod(name: string): this;
      hasMethod(name: string): boolean;
      getProperties(): Property[];
      setProperties(properties: Property[]): this;
      getProperty(name: string): Property | undefined;
      addProperty(name: string, value: string | undefined, overwrite?: boolean): Property;
      removeProperty(name: string): this;
      hasProperty(name: string): boolean;
      getTraits(): TraitUse[];
      setTraits(traits: TraitUse[]): this;
      getTrait(name: string): TraitUse | undefined;
      addTrait(name: string, overwrite?: boolean): TraitUse;
      removeTrait(name: string): this;
      hasTrait(name: string): boolean;
      validate(): void;
  }

}
declare module 'node-php-generator/TraitUse' {
  import { HasComment } from 'node-php-generator/Api/HasComment';
  import { HasName } from 'node-php-generator/Api/HasName';
  export class TraitUse implements HasName, HasComment {
      private name;
      private comment;
      private resolutions;
      constructor(name: string);
      getName(): string;
      cloneWithName(name: string): this;
      getComment(): string | undefined;
      setComment(comment: string | undefined): this;
      addComment(comment: string): this;
      removeComment(): this;
      getResolutions(): string[];
      addResolution(resolution: string): this;
  }

}
declare module 'node-php-generator/example' {
  export {};

}
declare module 'node-php-generator/index' {
  export { Attribute } from 'node-php-generator/Attribute';
  export { ClassType } from 'node-php-generator/ClassType';
  export { Closure } from 'node-php-generator/Closure';
  export { Constant } from 'node-php-generator/Constant';
  export { EnumCase } from 'node-php-generator/EnumCase';
  export { EnumType } from 'node-php-generator/EnumType';
  export { GlobalFunction } from 'node-php-generator/GlobalFunction';
  export { InterfaceType } from 'node-php-generator/InterfaceType';
  export { Literal } from 'node-php-generator/Literal';
  export { Method } from 'node-php-generator/Method';
  export { Parameter } from 'node-php-generator/Parameter';
  export { PhpFile } from 'node-php-generator/PhpFile';
  export { PhpNamespace } from 'node-php-generator/PhpNamespace';
  export { Printer } from 'node-php-generator/Printer';
  export { PromotedParameter } from 'node-php-generator/PromotedParameter';
  export { Property } from 'node-php-generator/Property';
  export { PsrPrinter } from 'node-php-generator/PsrPrinter';
  export { TraitType } from 'node-php-generator/TraitType';
  export { TraitUse } from 'node-php-generator/TraitUse';

}
declare module 'node-php-generator/types' {
  export type Visibility = 'public' | 'private' | 'protected';
  export enum Type {
      String = "string",
      Int = "int",
      Float = "float",
      Bool = "bool",
      Array = "array",
      Object = "object",
      Callable = "callable",
      Iterable = "iterable",
      Void = "void",
      Never = "never",
      Mixed = "mixed",
      Null = "null",
      False = "false",
      True = "true",
      Self = "self",
      Parent = "parent",
      Static = "static"
  }
  export type PropertyValuePrimitive = string | number | boolean | undefined;
  export type PropertyValue = PropertyValuePrimitive | PropertyValuePrimitive[];

}
declare module 'node-php-generator' {
  import main = require('node-php-generator/index');
  export = main;
}
import { Attribute } from "./Attribute";
import { GlobalFunction } from "./GlobalFunction"
import { Method } from "./Method";
import { PhpNamespace } from "./PhpNamespace";
import { PromotedParameter } from "./PromotedParameter";

export class Printer {
  public wrapLength = 120;
  public indentation = "\t";
  public linesBetweenProperties = 0;
  public linesBetweenMethods = 2;
  public linesBetweenUseTypes = 0;
  public returnTypeColon = ': ';
  public bracesOnNextLine = true;
  public singleParameterOnOneLine = true;
  public omitEmptyNamespaces = true;
  protected namespace: PhpNamespace | undefined;
  private resolvesType = true;

  printFunction(func: GlobalFunction): string {
    const reference = func.getReturnReference() ? '&' : '';
    const line = `function ${reference}${func.getName()}`;
    const returnType = this.printReturnType(func);

    return `${line}${returnType}`;
  }

  printReturnType(func: GlobalFunction | Method): string {
    const t = this.printType(func.getReturnType(), func.getReturnNullable());

    return `${this.returnTypeColon}${t}`;
  }

  printType(type: string | undefined, nullable = false): string {
    if (!type) {
      return '';
    }

    return nullable ? this.getNullable(type) : type;
  }

  printParameters(func: GlobalFunction | Method, column: int = 0): string {
    const special = func.getParameters()
      .some(param => param instanceof PromotedParameter || param.getAttributes().length > 0 || !!param.getComment());

    if (!special || (this.singleParameterOnOneLine && func.getParameters().length === 1)) {
      // const line = 
    }

  }

  private formatParameters(func: GlobalFunction | Method, multiline: boolean): string {
    const parameters = func.getParameters();
    let res = '';

    for (const param of parameters) {
      const variadic = func.isVariadic() && param === parameters[length - 1];
      const attrs = this.printAttributes(param.getAttributes(), true);
    }

    return res;
  }

  printAttributes(attrs: Attribute[], inline = false): string {
    if (attrs.length === 0) {
      return '';
    }

    const items = [];

    for (const attr of attrs) {
      items.push(attr.getName());
    }

    return '';
  }

  private getNullable(type: string, nullable: boolean = true): string {
    if (type.includes('&')) {
      if (nullable) {
        throw new Error('Intersection types cannot be nullable');
      }
      return type;
    }

    // Remove leading ? or null| or |null from type
    const nnType = type.replace(/^\?|^null\||(?<=\||^)null(?=\||$)/i, '');

    // Check if type is always nullable (null or mixed)
    const always = /^(null|mixed)$/i.test(nnType);

    if (nullable) {
      if (always || type !== nnType) {
        return type;
      }
    
      if (type.includes('|')) {
        return `${type}|null`;
      }

      return `?${type}`;
    }

    if (always) {
      throw new Error(`Type ${type} cannot be not nullable.`);
    }

    return nnType;
  }
}
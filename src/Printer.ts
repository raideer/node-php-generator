import { GlobalFunction } from './GlobalFunction';
import { Closure } from './Closure';
import { Method } from './Method';
import { InterfaceType } from './InterfaceType';
import { ClassType } from './ClassType';
import { TraitType } from './TraitType';
import { EnumType } from './EnumType';
import { NamespaceType, PhpNamespace } from './PhpNamespace';
import { PhpFile } from './PhpFile';
import { Dumper } from './Dumper';
import { Helpers } from './Helpers';
import { Attribute } from './Attribute';
import { PromotedParameter } from './PromotedParameter';
import { Constant } from './Constant';
import { Property } from './Property';

export class Printer {
  public wrapLength: number = 120;
  public indentation: string = '    ';
  public linesBetweenProperties: number = 0;
  public linesBetweenMethods: number = 2;
  public linesBetweenUseTypes: number = 0;
  public returnTypeColon: string = ': ';
  public bracesOnNextLine: boolean = true;
  public singleParameterOnOneLine: boolean = false;
  public omitEmptyNamespaces: boolean = true;
  protected namespace: PhpNamespace | null = null;
  protected dumper: Dumper;
  private resolveTypes: boolean = true;

  constructor() {
    this.dumper = new Dumper();
  }

  public printFunction(
    func: GlobalFunction,
    namespace: PhpNamespace | null = null
  ): string {
    this.namespace = this.resolveTypes ? namespace : null;
    const line =
      'function ' + (func.getReturnReference() ? '&' : '') + func.getName();
    const returnType = this.printReturnType(func);
    const params = this.printParameters(
      func,
      line.length + returnType.length + 2
    );
    const body = Helpers.simplifyTaggedNames(func.getBody(), this.namespace);
    const braceOnNextLine = this.isBraceOnNextLine(
      params.includes('\n'),
      !!returnType
    );

    return (
      this.printDocComment(func) +
      this.printAttributes(func.getAttributes()) +
      line +
      params +
      returnType +
      (braceOnNextLine ? '\n' : ' ') +
      '{\n' +
      this.indent(body) +
      '}\n'
    );
  }

  public printClosure(
    closure: Closure,
    namespace: PhpNamespace | null = null
  ): string {
    this.namespace = this.resolveTypes ? namespace : null;
    const uses = closure
      .getUses()
      .map((param) => (param.isReference() ? '&' : '') + '$' + param.getName());
    const useStr =
      uses.length > 1 && uses.join(', ').length > this.wrapLength
        ? '\n' + this.indentation + uses.join(',\n' + this.indentation) + ',\n'
        : uses.join(', ');
    const body = Helpers.simplifyTaggedNames(closure.getBody(), this.namespace);

    return (
      this.printAttributes(closure.getAttributes(), true) +
      'function ' +
      (closure.getReturnReference() ? '&' : '') +
      this.printParameters(closure) +
      (uses.length ? ' use (' + useStr + ')' : '') +
      this.printReturnType(closure) +
      ' {\n' +
      this.indent(body) +
      '}'
    );
  }

  public printMethod(
    method: Method,
    namespace: PhpNamespace | null = null,
    isInterface: boolean = false
  ): string {
    this.namespace = this.resolveTypes ? namespace : null;
    method.validate();
    const line =
      (method.isAbstract() && !isInterface ? 'abstract ' : '') +
      (method.isFinal() ? 'final ' : '') +
      (method.getVisibility() ? method.getVisibility() + ' ' : '') +
      (method.isStatic() ? 'static ' : '') +
      'function ' +
      (method.getReturnReference() ? '&' : '') +
      method.getName();
    const returnType = this.printReturnType(method);
    const params = this.printParameters(
      method,
      line.length + returnType.length + this.indentation.length + 2
    );
    let body = Helpers.simplifyTaggedNames(method.getBody(), this.namespace);
    body = Helpers.normalize(body).trimStart();
    body = body.trimEnd() + '\n';
    const braceOnNextLine = this.isBraceOnNextLine(
      params.includes('\n'),
      !!returnType
    );

    return (
      this.printDocComment(method) +
      this.printAttributes(method.getAttributes()) +
      line +
      params +
      returnType +
      (method.isAbstract() || isInterface
        ? ';\n'
        : (braceOnNextLine ? '\n' : ' ') + '{\n' + this.indent(body) + '}\n')
    );
  }

  public printClass(
    classType: ClassType | InterfaceType | TraitType | EnumType,
    namespace: PhpNamespace | null = null
  ): string {
    this.namespace = this.resolveTypes ? namespace : null;
    classType.validate();
    const resolver = this.namespace
      ? (s: string) => this.namespace!.simplifyType(s)
      : (s: string) => s;

    const traits =
      classType instanceof ClassType ||
      classType instanceof TraitType ||
      classType instanceof EnumType
        ? classType
            .getTraits()
            .map((trait) => {
              const resolutions = Helpers.simplifyTaggedNames(
                trait.getResolutions().join(';\n'),
                this.namespace
              );
              return (
                this.printDocComment(trait) +
                'use ' +
                resolver(trait.getName()) +
                (resolutions
                  ? ' {\n' + this.indent(resolutions) + ';\n}\n'
                  : ';\n')
              );
            })
            .join('')
        : '';

    const cases =
      classType instanceof EnumType
        ? classType
            .getCases()
            .map((enumCase) => {
              return (
                this.printDocComment(enumCase) +
                this.printAttributes(enumCase.getAttributes()) +
                'case ' +
                enumCase.getName() +
                (enumCase.getValue() === null
                  ? ''
                  : ' = ' + this.dump(enumCase.getValue())) +
                ';\n'
              );
            })
            .join('')
        : '';

    const readOnlyClass = classType instanceof ClassType;
    const consts = classType
      .getConstants()
      .map((constant) => this.printConstant(constant))
      .join('');

    const methods = classType
      .getMethods()
      .map((method) => {
        if (readOnlyClass && method.getName() === 'constructor') {
          const clonedMethod = method.clone();

          clonedMethod.getParameters().forEach((param) => {
            if (param instanceof PromotedParameter) {
              param.setReadOnly(false);
            }
          });

          return this.printMethod(
            clonedMethod,
            namespace,
            classType.isInterface()
          );
        }

        return this.printMethod(method, namespace, classType.isInterface());
      })
      .join('\n');
    const properties =
      classType instanceof ClassType || classType instanceof TraitType
        ? classType
            .getProperties()
            .map((property) => this.printProperty(property, readOnlyClass))
            .join('')
        : '';

    const members = [traits, consts, cases, properties, methods]
      .filter(Boolean)
      .join('\n');

    let classExtends: string[] = [];

    if (classType instanceof ClassType || classType instanceof InterfaceType) {
      if (classType.getExtends()) {
        if (classType instanceof ClassType) {
          classExtends = [classType.getExtends()!];
        } else {
          classExtends = classType.getExtends();
        }
      }
    }

    const line = [
      classType instanceof ClassType && classType.isAbstract()
        ? 'abstract'
        : null,
      classType instanceof ClassType && classType.isFinal() ? 'final' : null,
      classType instanceof ClassType && classType.isReadOnly()
        ? 'readonly'
        : null,
      classType instanceof ClassType ? 'class ' + classType.getName() : null,
      classType instanceof InterfaceType
        ? 'interface ' + classType.getName()
        : null,
      classType instanceof TraitType ? 'trait ' + classType.getName() : null,
      classType instanceof EnumType
        ? 'enum ' +
          classType.getName() +
          (classType.getType()
            ? this.returnTypeColon + classType.getType()
            : '')
        : null,
      classExtends.length
        ? 'extends ' + classExtends.map(resolver).join(', ')
        : null,
      (classType instanceof ClassType || classType instanceof EnumType) &&
      classType.getImplements().length
        ? 'implements ' + classType.getImplements().map(resolver).join(', ')
        : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      this.printDocComment(classType) +
      this.printAttributes(classType.getAttributes()) +
      line +
      '\n{\n' +
      this.indent(members) +
      '}\n'
    );
  }

  public printEnum(enumType: EnumType): string {
    return this.printClass(enumType);
  }

  public printTrait(traitType: TraitType): string {
    return this.printClass(traitType);
  }

  public printInterface(interfaceType: InterfaceType): string {
    return this.printClass(interfaceType);
  }

  public printNamespace(namespace: PhpNamespace): string {
    this.namespace = this.resolveTypes ? namespace : null;
    const name = namespace.getName();
    const uses = [
      this.printUses(namespace),
      this.printUses(namespace, NamespaceType.Function),
      this.printUses(namespace, NamespaceType.Constant),
    ]
      .filter(Boolean)
      .join('\n'.repeat(this.linesBetweenUseTypes));

    const items = [
      ...namespace.getClasses().map((cls) => this.printClass(cls, namespace)),
      ...namespace
        .getFunctions()
        .map((fn) => this.printFunction(fn, namespace)),
    ].join('\n');

    const body = (uses ? uses + '\n' : '') + items;

    return namespace.hasBracketedSyntax()
      ? `namespace${name ? ` ${name}` : ''} {\n${this.indent(body)}}\n`
      : `${name ? `namespace ${name};\n\n` : ''}${body}`;
  }

  public printFile(file: PhpFile): string {
    const namespaces = file
      .getNamespaces()
      .map((ns) => {
        if (
          !this.omitEmptyNamespaces ||
          ns.getClasses().length ||
          ns.getFunctions().length
        ) {
          return this.printNamespace(ns);
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');

    return (
      `<?php\n` +
      (file.getComment() ? '\n' + this.printDocComment(file) : '') +
      '\n' +
      (file.hasStrictTypes() ? 'declare(strict_types=1);\n\n' : '') +
      namespaces
    );
  }

  protected printUses(
    namespace: PhpNamespace,
    of: NamespaceType = NamespaceType.Normal
  ): string {
    const prefix = {
      [NamespaceType.Normal]: '',
      [NamespaceType.Function]: 'function ',
      [NamespaceType.Constant]: 'const ',
    }[of];
    return Object.entries(namespace.getUses(of))
      .map(([alias, original]) => {
        return Helpers.extractShortName(original) === alias
          ? `use ${prefix}${original};\n`
          : `use ${prefix}${original} as ${alias};\n`;
      })
      .join('');
  }

  protected printParameters(
    func: GlobalFunction | Method | Closure,
    column: number = 0
  ): string {
    const special = func
      .getParameters()
      .some(
        (param) =>
          param instanceof PromotedParameter ||
          param.getAttributes().length ||
          param.getComment()
      );

    if (
      !special ||
      (this.singleParameterOnOneLine && func.getParameters().length === 1)
    ) {
      const line = this.formatParameters(func, false);
      if (!line.includes('\n') && line.length + column <= this.wrapLength) {
        return line;
      }
    }
    return this.formatParameters(func, true);
  }

  private formatParameters(
    func: GlobalFunction | Method | Closure,
    multiline: boolean
  ): string {
    const params = func.getParameters();

    const res = params
      .map((param) => {
        const variadic =
          func.isVariadic() && param === params[params.length - 1];
        const attrs = this.printAttributes(param.getAttributes(), true);

        return (
          this.printDocComment(param) +
          (attrs ? (multiline ? attrs.slice(0, -1) + '\n' : attrs) : '') +
          (param instanceof PromotedParameter
            ? (param.getVisibility() || 'public') +
              (param.isReadOnly() && param.getType() ? ' readonly' : '') +
              ''
            : '') +
          this.printType(param.getType(), param.isNullable()) +
          ' ' +
          (param.isReference() ? '&' : '') +
          (variadic ? '...' : '') +
          '$' +
          param.getName() +
          (param.getDefaultValue() && !variadic
            ? ' = ' + this.dump(param.getDefaultValue())
            : '') +
          (multiline ? ',\n' : ', ')
        );
      })
      .join('');

    return multiline
      ? '(\n' + this.indent(res) + ')'
      : '(' + res.slice(0, -2) + ')';
  }

  private printConstant(constant: Constant): string {
    const type = this.printType(constant.getType(), false);

    const def =
      (constant.isFinal() ? 'final ' : '') +
      (constant.getVisibility() ? constant.getVisibility() + ' ' : '') +
      'const ' +
      (type ? type + ' ' : '') +
      constant.getName() +
      ' = ';

    return (
      this.printDocComment(constant) +
      this.printAttributes(constant.getAttributes()) +
      def +
      this.dump(constant.getValue()) +
      ';\n'
    );
  }

  private printProperty(
    property: Property,
    readOnlyClass: boolean = false
  ): string {
    property.validate();
    const type = property.getType();
    const def =
      (property.getVisibility() || 'public') +
      (property.isStatic() ? ' static' : '') +
      (!readOnlyClass && property.isReadOnly() && type ? ' readonly' : '') +
      ' ' +
      this.printType(type, property.isNullable()) +
      ' ' +
      '$' +
      property.getName();

    return (
      this.printDocComment(property) +
      this.printAttributes(property.getAttributes()) +
      def +
      (property.getValue() === null && !property.isInitialized()
        ? ''
        : ' = ' + this.dump(property.getValue())) +
      ';\n'
    );
  }

  protected printType(type: string | undefined, nullable: boolean): string {
    if (!type) return '';
    if (this.namespace) {
      type = this.namespace.simplifyType(type);
    }
    return nullable ? '?' + type : type;
  }

  protected printDocComment(commentable: {
    getComment(): string | undefined;
  }): string {
    const multiLine =
      commentable instanceof GlobalFunction ||
      commentable instanceof Method ||
      commentable instanceof ClassType ||
      commentable instanceof PhpFile;
    return Helpers.formatDocComment(commentable.getComment() || '', multiLine);
  }

  protected printReturnType(func: GlobalFunction | Method | Closure): string {
    const type = this.printType(func.getReturnType(), func.isReturnNullable());
    return type ? this.returnTypeColon + type : '';
  }

  protected printAttributes(
    attrs: Attribute[],
    inline: boolean = false
  ): string {
    if (!attrs.length) return '';
    this.dumper.indentation = this.indentation;
    const items = attrs.map((attr) => {
      const args = this.dumper.format('...?:', attr.getArguments());
      return this.printType(attr.getName(), false) + (args ? `(${args})` : '');
    });
    return inline ? `#[${items.join(', ')}] ` : `#[${items.join(']\n#[')}]\n`;
  }

  protected indent(s: string): string {
    s = s.replace(/\t/g, this.indentation);
    return s.replace(/(?:^|[\r\n]+)(?=[^\r\n])/g, '$&' + this.indentation);
  }

  protected dump(varToDump: any, column: number = 0): string {
    this.dumper.indentation = this.indentation;
    this.dumper.wrapLength = this.wrapLength;
    let s = this.dumper.dump(varToDump, column);
    s = Helpers.simplifyTaggedNames(s, this.namespace);
    return s;
  }

  protected isBraceOnNextLine(
    multiLine: boolean,
    hasReturnType: boolean
  ): boolean {
    return this.bracesOnNextLine && (!multiLine || hasReturnType);
  }
}

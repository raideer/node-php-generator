import { AttributeArguments } from './Attribute';
import { Helpers } from './Helpers';
import { Literal } from './Literal';

export class Dumper {
  private static readonly IndentLength = 4;

  public maxDepth: number = 50;
  public wrapLength: number = 120;
  public indentation: string = '\t';
  public customObjects: boolean = true;

  public dump(varToDump: any, column: number = 0): string {
    return this.dumpVar(varToDump, [], 0, column);
  }

  private dumpVar(
    varToDump: any,
    parents: any[] = [],
    level: number = 0,
    column: number = 0
  ): string {
    if (varToDump === null || varToDump === undefined) {
      return 'null';
    } else if (typeof varToDump === 'string') {
      return this.dumpString(varToDump);
    } else if (Array.isArray(varToDump)) {
      return this.dumpArray(varToDump, parents, level, column);
    } else if (varToDump instanceof Literal) {
      return this.dumpLiteral(varToDump, level);
    } else if (typeof varToDump === 'object') {
      return this.dumpObject(varToDump, parents, level, column);
    } else {
      return JSON.stringify(varToDump);
    }
  }

  private dumpString(s: string): string {
    const special: Record<string, string> = {
      '\r': '\\r',
      '\n': '\\n',
      '\t': '\\t',
      e: '\\e',
      '\\': '\\\\',
    };

    const utf8 = /[\u0080-\uFFFF]/.test(s);
    const escaped = s.replace(
      utf8 ? /[\p{C}\\]/gu : /[\x00-\x1F\x7F-\xFF\\]/g,
      (m) => {
        return (
          special[m] ??
          (m.length === 1
            ? '\\x' +
              m.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()
            : '\\u{' + m.codePointAt(0)!.toString(16).toUpperCase() + '}')
        );
      }
    );

    return s === escaped.replace(/\\\\/g, '\\')
      ? "'" + s.replace(/'|\\(?=[\\']|$)/g, '\\$&') + "'"
      : '"' + escaped.replace(/"/g, '\\"') + '"';
  }

  private dumpArray(
    varToDump: any[],
    parents: any[],
    level: number,
    column: number
  ): string {
    if (varToDump.length === 0) {
      return '[]';
    } else if (level > this.maxDepth || parents.includes(varToDump)) {
      throw new Error('Nesting level too deep or recursive dependency.');
    }

    const hideKeys = varToDump.every((v) => Number.isInteger(v));

    const pairs = varToDump.map((v, k) => {
      const keyPart =
        hideKeys && (k !== 0 || k === 0) ? '' : this.dumpVar(k) + ' => ';
      return keyPart + this.dumpVar(v, parents, level + 1, keyPart.length + 1);
    });

    const line = '[' + pairs.join(', ') + ']';
    const space = this.indentation.repeat(level);
    return !line.includes('\n') &&
      level * Dumper.IndentLength + column + line.length <= this.wrapLength
      ? line
      : '[\n' +
          space +
          this.indentation +
          pairs.join(',\n' + space + this.indentation) +
          ',\n' +
          space +
          ']';
  }

  private dumpObject(
    varToDump: object,
    parents: any[],
    level: number,
    column: number
  ): string {
    if (level > this.maxDepth || parents.includes(varToDump)) {
      throw new Error('Nesting level too deep or recursive dependency.');
    }

    const className = varToDump.constructor.name;
    parents.push(varToDump);

    if (className === 'Object') {
      return (
        '(object) ' +
        this.dumpArray(Object.entries(varToDump), parents, level, column + 10)
      );
    } else if (this.customObjects) {
      return this.dumpCustomObject(varToDump, parents, level);
    } else {
      throw new Error(`Cannot dump object of type ${className}.`);
    }
  }

  private dumpCustomObject(
    varToDump: object,
    parents: any[],
    level: number
  ): string {
    const className = varToDump.constructor.name;
    const space = this.indentation.repeat(level);
    let out = '\n';

    const arr = Object.entries(varToDump);
    for (const [k, v] of arr) {
      out +=
        space +
        this.indentation +
        this.dumpVar(k) +
        ' => ' +
        this.dumpVar(v, parents, level + 1, k.length) +
        ',\n';
    }

    return `\\Dumper::createObject(${className}, [${out}${space}])`;
  }

  private dumpLiteral(varToDump: Literal, level: number): string {
    let s = varToDump.toString();
    s = s.replace(/\r\n|\r|\n/g, '\n');
    s = s
      .split('\n')
      .map((line) => this.indentation.repeat(level) + line)
      .join('\n');
    return s.trimStart();
  }

  public format(statement: string, ...args: any[]): string {
    const tokens = statement.split(
      /(\.\.\.\?:?|\$\?|->\?|::\?|\\\?|\?\*|\?(?!\w))/
    );
    let res = '';
    for (let n = 0; n < tokens.length; n++) {
      const token = tokens[n];

      if (n % 2 === 0) {
        res += token;
      } else if (token === '\\?') {
        res += '?';
      } else if (!args.length) {
        throw new Error('Insufficient number of arguments.');
      } else if (token === '?') {
        res += this.dump(args.shift(), res.length - res.lastIndexOf('\n'));
      } else if (token === '...?' || token === '...?:' || token === '?*') {
        const arg = args.shift();

        res += this.dumpArguments(
          arg,
          res.length - res.lastIndexOf('\n'),
          token === '...?:'
        );
      } else {
        const arg = args.shift();
        if (arg instanceof Literal || !Helpers.isIdentifier(arg)) {
          res += token.slice(0, -1) + '{' + this.dumpVar(arg) + '}';
        } else {
          res += token.slice(0, -1) + arg;
        }
      }
    }

    if (args.length) {
      throw new Error('Insufficient number of placeholders.');
    }

    return res;
  }

  private dumpArguments(
    args: AttributeArguments,
    column: number,
    named: boolean
  ): string {
    const pairs = Object.entries(args).map(([k, v]) => {
      const name = named && !Number.isInteger(Number(k)) ? k + ': ' : '';
      return name + this.dumpVar(v, [args], 0, column + name.length + 1);
    });

    const line = pairs.join(', ');

    return Object.keys(args).length < 2 ||
      (!line.includes('\n') && column + line.length <= this.wrapLength)
      ? line
      : '\n' + this.indentation + pairs.join(',\n' + this.indentation) + ',\n';
  }
}

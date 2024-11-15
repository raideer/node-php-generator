export class Helpers {
  public static readonly ReIdentifier =
    '[a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*';

  public static readonly Keywords: Record<string, number> = {
    // built-in types
    string: 1,
    int: 1,
    float: 1,
    bool: 1,
    array: 1,
    object: 1,
    callable: 1,
    iterable: 1,
    void: 1,
    null: 1,
    mixed: 1,
    false: 1,
    never: 1,
    true: 1,

    // class keywords
    self: 1,
    parent: 1,
    static: 1,

    // PHP keywords
    include: 1,
    include_once: 1,
    eval: 1,
    require: 1,
    require_once: 1,
    or: 1,
    xor: 1,
    and: 1,
    instanceof: 1,
    new: 1,
    clone: 1,
    exit: 1,
    if: 1,
    elseif: 1,
    else: 1,
    endif: 1,
    echo: 1,
    do: 1,
    while: 1,
    endwhile: 1,
    for: 1,
    endfor: 1,
    foreach: 1,
    endforeach: 1,
    declare: 1,
    enddeclare: 1,
    as: 1,
    try: 1,
    catch: 1,
    finally: 1,
    throw: 1,
    use: 1,
    insteadof: 1,
    global: 1,
    var: 1,
    unset: 1,
    isset: 1,
    empty: 1,
    continue: 1,
    goto: 1,
    function: 1,
    const: 1,
    return: 1,
    print: 1,
    yield: 1,
    list: 1,
    switch: 1,
    endswitch: 1,
    case: 1,
    default: 1,
    break: 1,
    extends: 1,
    implements: 1,
    namespace: 1,
    trait: 1,
    interface: 1,
    class: 1,
    __CLASS__: 1,
    __TRAIT__: 1,
    __FUNCTION__: 1,
    __METHOD__: 1,
    __LINE__: 1,
    __FILE__: 1,
    __DIR__: 1,
    __NAMESPACE__: 1,
    fn: 1,
    match: 1,
    enum: 1,
    abstract: 1,
    final: 1,
    private: 1,
    protected: 1,
    public: 1,
    readonly: 1,
  };

  public static formatDocComment(
    content: string,
    forceMultiLine: boolean = false
  ): string {
    let s = content.trim();
    s = s.replace('*/', '* /');
    if (s === '') {
      return '';
    } else if (forceMultiLine || content.includes('\n')) {
      s = s.replace(/\n/g, '\n * ');
      return `/**\n * ${s}\n */\n`;
    } else {
      return `/** ${s} */\n`;
    }
  }

  public static tagName(name: string, of: string = 'normal'): string {
    return this.Keywords[name.toLowerCase()] ? name : `/*(${of}*/${name}`;
  }

  public static simplifyTaggedNames(code: string, namespace: any): string {
    return code.replace(
      /\/\*\(([ncf])\*\/([\w\x7f-\xff\\]+)/g,
      (match, of, name) => {
        return namespace ? namespace.simplifyType(name, of) : name;
      }
    );
  }

  public static unformatDocComment(comment: string): string {
    return comment
      .replace(/^\s*\* ?/gm, '')
      .trim()
      .replace(/^\/\*+|\*+\/$/g, '');
  }

  public static unindent(s: string, level: number = 1): string {
    return level
      ? s.replace(new RegExp(`^(\\t| {4}){1,${level}}`, 'gm'), '')
      : s;
  }

  public static isIdentifier(value: any): boolean {
    return (
      typeof value === 'string' &&
      new RegExp(`^${this.ReIdentifier}$`).test(value)
    );
  }

  public static isNamespaceIdentifier(
    value: any,
    allowLeadingSlash: boolean = false
  ): boolean {
    const re = `^${allowLeadingSlash ? '\\\\?' : ''}${this.ReIdentifier}(\\\\${this.ReIdentifier})*$`;
    return typeof value === 'string' && new RegExp(re).test(value);
  }

  public static extractNamespace(name: string): string {
    const pos = name.lastIndexOf('\\');
    return pos !== -1 ? name.substring(0, pos) : '';
  }

  public static extractShortName(name: string): string {
    const pos = name.lastIndexOf('\\');
    return pos !== -1 ? name.substring(pos + 1) : name;
  }

  public static tabsToSpaces(s: string, count: number = 4): string {
    return s.replace(/\t/g, ' '.repeat(count));
  }

  public static normalize(s: string): string {
    // normalize line endings to \n
    s = this.normalizeNewLines(s);

    // remove control characters except \t and \n
    s = s.replace(/[\x00-\x08\x0B-\x1F\x7F-\x9F]+/gu, '');

    // right trim each line
    s = s.replace(/[\t ]+$/gm, '');

    // remove leading/trailing blank lines
    s = s.trim();

    return s;
  }

  public static normalizeNewLines(s: string): string {
    return s.replace(/\r\n?|\u2028|\u2029/g, '\n');
  }

  public static validateType(
    type: string | null,
    nullable: boolean = false
  ): string | null {
    if (type === '' || type === null) {
      return null;
    }

    if (type[0] === '?') {
      nullable = true;
      return type.substring(1);
    }

    return type;
  }
}

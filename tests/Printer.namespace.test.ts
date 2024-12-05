import { Printer } from '../src/Printer';
import { PhpNamespace } from '../src/PhpNamespace';
import { ClassType } from '../src/ClassType';

test('prints empty namespace', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App');

  const output = printer.printNamespace(namespace);

  expect(output).toMatchSnapshot();
});

test('prints namespace with use statements', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App\\Entity');
  namespace.addUse('Doctrine\\ORM\\Mapping', 'ORM');
  namespace.addUse('App\\Traits\\TimestampableTrait');
  namespace.addUse('App\\Interfaces\\UserInterface');

  const output = printer.printNamespace(namespace);

  expect(output).toMatchSnapshot();
});

test('prints namespace with aliased use statements', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App');
  namespace.addUse('Foo\\Bar\\Baz', 'CustomBaz');
  namespace.addUse('Foo\\Bar\\Qux', 'CustomQux');

  const output = printer.printNamespace(namespace);

  expect(output).toMatchSnapshot();
});

test('prints namespace with class', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App');
  const classType = new ClassType('User');
  classType.setExtends('BaseEntity');
  namespace.add(classType);

  const output = printer.printNamespace(namespace);

  expect(output).toMatchSnapshot();
});

test('prints namespace with multiple classes', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App\\Entity');

  const class1 = new ClassType('User');
  const class2 = new ClassType('Post');
  namespace.add(class1);
  namespace.add(class2);

  const output = printer.printNamespace(namespace);

  expect(output).toMatchSnapshot();
});

test('prints namespace with bracketed syntax', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App');
  namespace.setBracketedSyntax(true);

  const classType = new ClassType('User');
  namespace.add(classType);

  const output = printer.printNamespace(namespace);

  expect(output).toMatchSnapshot();
});

test('prints complex namespace', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App\\Entity');

  // Add use statements
  namespace.addUse('Doctrine\\ORM\\Mapping', 'ORM');
  namespace.addUse('App\\BaseEntity');
  namespace.addUse('App\\Traits\\TimestampableTrait');
  namespace.addUse('App\\Interfaces\\EntityInterface');
  namespace.addUse('App\\Repository\\UserRepository');

  // Add class
  const classType = new ClassType('User');
  classType.setExtends('App\\BaseEntity');
  classType.addTrait('App\\Traits\\TimestampableTrait');
  classType.setImplements(['App\\Interfaces\\EntityInterface']);
  namespace.add(classType);

  // Use bracketed syntax
  namespace.setBracketedSyntax(true);

  const output = printer.printNamespace(namespace);

  expect(output).toMatchSnapshot();
});

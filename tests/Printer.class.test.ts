import { Printer } from '../src/Printer';
import { ClassType } from '../src/ClassType';
import { InterfaceType } from '../src/InterfaceType';
import { TraitType } from '../src/TraitType';
import { EnumType } from '../src/EnumType';
import { Method } from '../src/Method';
import { Property } from '../src/Property';
import { PhpNamespace } from '../src/PhpNamespace';

test('prints basic class', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints abstract class', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');
  classType.setAbstract();

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints final class', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');
  classType.setFinal();

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints readonly class', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');
  classType.setReadOnly();

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints class with extends', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');
  classType.setExtends('BaseClass');

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints class with implements', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');
  classType.setImplements(['Interface1', 'Interface2']);

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints class with properties', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');

  const prop1 = new Property('prop1');
  prop1.setPublic();
  prop1.setType('string');

  const prop2 = new Property('prop2');
  prop2.setPrivate();
  prop2.setType('int');
  prop2.setValue(42);

  classType.setProperties([prop1, prop2]);

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints class with methods', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');

  const method1 = new Method('method1');
  method1.setPublic();
  method1.setReturnType('string');

  const method2 = new Method('method2');
  method2.setPrivate();
  method2.addParameter('param');

  classType.setMethods([method1, method2]);

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints class with traits', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');
  classType.addTrait('Trait1');
  classType.addTrait('Trait2');

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints class with attributes', () => {
  const printer = new Printer();
  const classType = new ClassType('Foo');
  classType.addAttribute('Entity', { table: 'foo_table' });

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

test('prints interface', () => {
  const printer = new Printer();
  const interfaceType = new InterfaceType('IFoo');

  const method = new Method('doSomething');
  method.setReturnType('void');
  interfaceType.setMethods([method]);

  const output = printer.printClass(interfaceType);

  expect(output).toMatchSnapshot();
});

test('prints interface with extends', () => {
  const printer = new Printer();
  const interfaceType = new InterfaceType('IFoo');
  interfaceType.setExtends(['IBase1', 'IBase2']);

  const output = printer.printClass(interfaceType);

  expect(output).toMatchSnapshot();
});

test('prints trait', () => {
  const printer = new Printer();
  const traitType = new TraitType('MyTrait');

  const property = new Property('prop');
  property.setPrivate();

  const method = new Method('traitMethod');
  method.setPublic();

  traitType.setProperties([property]);
  traitType.setMethods([method]);

  const output = printer.printClass(traitType);

  expect(output).toMatchSnapshot();
});

test('prints enum', () => {
  const printer = new Printer();
  const enumType = new EnumType('Status');

  enumType.addCase('PENDING');
  enumType.addCase('ACTIVE', 1);
  enumType.addCase('INACTIVE', 2);

  const output = printer.printClass(enumType);

  expect(output).toMatchSnapshot();
});

test('prints backed enum', () => {
  const printer = new Printer();
  const enumType = new EnumType('Status');
  enumType.setType('string');

  enumType.addCase('PENDING', 'pending');
  enumType.addCase('ACTIVE', 'active');

  const output = printer.printClass(enumType);

  expect(output).toMatchSnapshot();
});

test('prints class with namespace resolution', () => {
  const printer = new Printer();
  const namespace = new PhpNamespace('App\\Entity');
  const classType = new ClassType('User');

  classType.setExtends('BaseEntity');
  classType.setImplements(['IdentifiableInterface']);
  namespace.addUse('App\\Base\\BaseEntity');
  namespace.addUse('App\\Contracts\\IdentifiableInterface');

  const output = printer.printClass(classType, namespace);

  expect(output).toMatchSnapshot();
});

test('prints complex class', () => {
  const printer = new Printer();
  const classType = new ClassType('ComplexClass');

  // Class modifiers
  classType.setFinal();
  classType.setReadOnly();

  // Inheritance
  classType.setExtends('BaseClass');
  classType.setImplements(['Interface1', 'Interface2']);
  classType.addTrait('Trait1');

  // Properties
  const prop1 = new Property('prop1');
  prop1.setPublic();
  prop1.setReadOnly();
  prop1.setType('string');

  const prop2 = new Property('prop2');
  prop2.setPrivate();
  prop2.setStatic();
  prop2.setValue(['a', 'b', 'c']);

  classType.setProperties([prop1, prop2]);

  // Methods
  const method1 = new Method('method1');
  method1.setPublic();
  method1.setReturnType('array');
  method1.addParameter('param').setType('string');

  const method2 = new Method('method2');
  method2.setProtected();
  method2.setStatic();
  method2.setReturnType('void');

  classType.setMethods([method1, method2]);

  // Attributes
  classType.addAttribute('Entity', { table: 'complex' });
  classType.addAttribute('Cached');

  const output = printer.printClass(classType);

  expect(output).toMatchSnapshot();
});

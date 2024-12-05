import { Method } from '../src/Method';
import { Printer } from '../src/Printer';
import { PromotedParameter } from '../src/PromotedParameter';

test('prints basic method', () => {
  const printer = new Printer();
  const method = new Method('foo');

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints public method', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setPublic();

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints private method', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setPrivate();

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints protected method', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setProtected();

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints static method', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setStatic();

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints abstract method', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setAbstract();

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints final method', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setFinal();

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with return type', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setReturnType('string');

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with nullable return type', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setReturnType('string');
  method.setReturnNullable(true);

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with parameters', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.addParameter('param1', 'default1');
  method.addParameter('param2', 'default2');

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with typed parameters', () => {
  const printer = new Printer();
  const method = new Method('foo');
  const param = method.addParameter('param');
  param.setType('string');
  param.setNullable(true);

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with promoted parameters', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.addPromoterParameter('param', 'default');

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with attributes', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.addAttribute('Route', { path: '/foo' });

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with doc comment', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.addComment('This is a method');
  method.addComment('@param string $param Description');
  method.addComment('@return void');

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with reference return', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setReturnReference(true);

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method with reference parameters', () => {
  const printer = new Printer();
  const method = new Method('foo');
  const param = method.addParameter('param');
  param.setReference(true);

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

test('prints method in interface context', () => {
  const printer = new Printer();
  const method = new Method('foo');
  method.setReturnType('string');
  method.addParameter('param');

  const output = printer.printMethod(method, null, true);

  expect(output).toMatchSnapshot();
});

test('prints complex method', () => {
  const printer = new Printer();
  const method = new Method('complexMethod');

  // Set modifiers
  method.setPublic();
  method.setStatic();

  // Add doc comment
  method.addComment('Complex method with multiple features');
  method.addComment('@param string $param1 First parameter');
  method.addComment('@param int $param2 Second parameter');
  method.addComment('@return array<string>');

  // Add parameters
  const param1 = method.addParameter('param1');
  param1.setType('string');
  param1.setNullable(true);

  const param2 = new PromotedParameter('param2');
  param2.setType('int');
  param2.setReadOnly(true);
  method.setParameters([param1, param2]);

  // Set return type
  method.setReturnType('array');

  // Add attribute
  method.addAttribute('Route', { path: '/complex' });

  const output = printer.printMethod(method);

  expect(output).toMatchSnapshot();
});

import { GlobalFunction } from '../src/GlobalFunction';
import { Printer } from '../src/Printer';

test('prints function', () => {
  const printer = new Printer();
  const func = new GlobalFunction('fooBar');

  const output = printer.printFunction(func);

  expect(output).toMatchSnapshot();
});

test('prints function with doc comment', () => {
  const printer = new Printer();
  const func = new GlobalFunction('fooBar');
  func.addComment('This is a doc comment\n');
  func.addComment('@return void');

  const output = printer.printFunction(func);

  expect(output).toMatchSnapshot();
});

test('prints function with return type', () => {
  const printer = new Printer();
  const func = new GlobalFunction('fooBar');
  func.setReturnType('void');

  const output = printer.printFunction(func);

  expect(output).toMatchSnapshot();
});

test('prints function with parameters', () => {
  const printer = new Printer();
  const func = new GlobalFunction('fooBar');
  const param = func.addParameter('foo', 'bar');

  const output = printer.printFunction(func);

  expect(output).toMatchSnapshot();
});

test('prints function with parameters (type & nullable)', () => {
  const printer = new Printer();
  const func = new GlobalFunction('fooBar');
  const param = func.addParameter('foo', 'bar');
  param.setNullable(true);
  param.setType('string');

  const output = printer.printFunction(func);

  expect(output).toMatchSnapshot();
});

test('prints function with attributes', () => {
  const printer = new Printer();
  const func = new GlobalFunction('fooBar');
  func.addAttribute('foo');
  const output = printer.printFunction(func);

  expect(output).toMatchSnapshot();
});

test('prints function with attributes (with arguments)', () => {
  const printer = new Printer();
  const func = new GlobalFunction('fooBar');
  func.addAttribute('Foo\\Cached', { mode: true });
  const output = printer.printFunction(func);

  expect(output).toMatchSnapshot();
});

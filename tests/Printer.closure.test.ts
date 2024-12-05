import { Closure } from '../src/Closure';
import { Printer } from '../src/Printer';
import { Parameter } from '../src/Parameter';

test('prints basic closure', () => {
  const printer = new Printer();
  const closure = new Closure();

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with parameters', () => {
  const printer = new Printer();
  const closure = new Closure();
  closure.addParameter('foo', 'bar');

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with return type', () => {
  const printer = new Printer();
  const closure = new Closure();
  closure.setReturnType('string');

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with use variables', () => {
  const printer = new Printer();
  const closure = new Closure();
  const useParam = new Parameter('bar');
  closure.setUses([useParam]);

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with reference use variables', () => {
  const printer = new Printer();
  const closure = new Closure();
  const useParam = new Parameter('bar');
  useParam.setReference(true);
  closure.setUses([useParam]);

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with multiple use variables on multiple lines', () => {
  const printer = new Printer();
  printer.wrapLength = 20; // Force wrapping
  const closure = new Closure();
  const useParam1 = new Parameter('longVariableName1');
  const useParam2 = new Parameter('longVariableName2');
  const useParam3 = new Parameter('longVariableName3');
  closure.setUses([useParam1, useParam2, useParam3]);

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with attributes', () => {
  const printer = new Printer();
  const closure = new Closure();
  closure.addAttribute('SomeAttribute');

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with attributes and arguments', () => {
  const printer = new Printer();
  const closure = new Closure();
  closure.addAttribute('SomeAttribute', { key: 'value' });

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints closure with return reference', () => {
  const printer = new Printer();
  const closure = new Closure();
  closure.setReturnReference(true);

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

test('prints complex closure', () => {
  const printer = new Printer();
  const closure = new Closure();

  // Add parameters
  const param = closure.addParameter('param');
  param.setType('string');
  param.setNullable(true);

  // Add use variables
  const useParam = new Parameter('useVar');
  useParam.setReference(true);
  closure.setUses([useParam]);

  // Set return type
  closure.setReturnType('int');

  // Add attribute
  closure.addAttribute('SomeAttribute', { key: 'value' });

  const output = printer.printClosure(closure);

  expect(output).toMatchSnapshot();
});

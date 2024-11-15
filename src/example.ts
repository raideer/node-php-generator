import { ClassType } from './ClassType';
import { EnumType } from './EnumType';
import { PsrPrinter } from './PsrPrinter';

const printer = new PsrPrinter();

// const classType = new ClassType('Demo');

// classType
//   .setFinal()
//   .setExtends('ParentClass')
//   .addImplement('Countable')
//   .addComment('This is class description\nMulti line\n')
//   .addComment('@property-read Hello $test');

// classType
//   .addMethod('__construct')
//   .addPromoterParameter('name')
//   .addPromoterParameter('args', [])
//   .setPrivate();

// classType.addConstant('ID', 123).setPrivate().setType('int').setFinal();

// classType
//   .addProperty('items', [1, 2, 3])
//   .setPrivate()
//   .setStatic()
//   .addComment('@var int[]');

// classType.addProperty('list').setType('?array').setInitialized();

// classType
//   .addMethod('count')
//   .addComment('Count it.')
//   .setFinal()
//   .setProtected()
//   .setReturnType('?int')
//   .setBody('return count($items ?: $this->items);')
//   .addParameter('items', [])
//   .setReference()
//   .setType('array');

////

// const classType = new ClassType('Demo');
// classType.addTrait('SmartObject');
// classType
//   .addTrait('MyTrait')
//   .addResolution('sayHello as protected')
//   .addComment('@use MyTrait<Foo>');

// const printer = new PsrPrinter();

// console.log(printer.printClass(classType));

const enumType = new EnumType('Suit');
enumType.addCase('Clubs', '♣');
enumType.addCase('Diamonds');
enumType.addCase('Hearts');
enumType.addCase('Spades');

console.log(printer.printClass(enumType));

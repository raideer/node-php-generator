import { GlobalFunction } from "./GlobalFunction";
import { Printer } from "./Printer";

const func = new GlobalFunction().setName('test');

console.log(new Printer().printFunction(func));
import { expect } from "chai";
import { BaseType, CompositeType, getValues, DummyClass, OldDummyClass } from "./_Utils.js";
import { TypeHint } from "../src/TypeHint.js";

const DUMMY = new DummyClass();
const OLD_DUMMY = new OldDummyClass();

describe(
	"TypeHint",
	() =>
	{
		describe(
			"GetBaseType",
			() =>
			{
				it(
					`should return "undefined" when given undefined`,
					() =>
					{
						expect(TypeHint.GetBaseType(undefined)).to.equal("undefined");
					}
				);

				it(
					`should return "null" when given null`,
					() =>
					{
						expect(TypeHint.GetBaseType(null)).to.equal("null");
					}
				);

				it(
					`should return "NaN" when given NaN`,
					() =>
					{
						expect(TypeHint.GetBaseType(Number.NaN)).to.equal("NaN");
					}
				);

				it(
					`should return "boolean" when given a boolean`,
					() =>
					{
						const VALUES = getValues(BaseType.BOOLEAN);

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("boolean");
						}
					}
				);

				it(
					`should return "number" when given a number`,
					() =>
					{
						const VALUES = getValues(CompositeType.NUMBER);

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("number");
						}
					}
				);

				it(
					`should return "string" when given a string`,
					() =>
					{
						const VALUES = getValues(BaseType.STRING);

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("string");
						}
					}
				);

				it(
					`should return "symbol" when given a symbol`,
					() =>
					{
						const VALUES = getValues(BaseType.SYMBOL);

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("symbol");
						}
					}
				);

				it(
					`should return "array" when given an array`,
					() =>
					{
						const VALUES = getValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("array");
						}
					}
				);

				it(
					`should return "class" when given a constructor`,
					() =>
					{
						const VALUES = [
							class {},
							DummyClass,
							OldDummyClass,
						];

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("class");
						}
					}
				);

				it(
					`should return "generator" when given a generator function`,
					() =>
					{
						function* generator1() { yield 1; }
						function *generator2() { yield 1; }
						function*generator3() { yield 1; }
						function * generator4() { yield 1; }

						const VALUES = [
							generator1,
							generator2,
							generator3,
							generator4,
							function*() { yield 1; },
							function *() { yield 1; },
							function* () { yield 1; },
							function * () { yield 1; },
						];

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("generator");
						}
					}
				);

				it(
					`should return "function" when given a function or method`,
					() =>
					{
						const VALUES = [
							function () {},
							async function () {},
							() => {},
							async () => {},
							DummyClass.Method,
							DummyClass.AsyncMethod,
							DUMMY.method,
							DUMMY.asyncMethod,
							OldDummyClass.Method,
							OldDummyClass.AsyncMethod,
							OLD_DUMMY.method,
							OLD_DUMMY.asyncMethod,
						];

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("function");
						}
					}
				);

				it(
					`should return "object" when given an object`,
					() =>
					{
						const VALUES = getValues(BaseType.RECORD, BaseType.INSTANTIATED);

						for (const value of VALUES)
						{
							expect(TypeHint.GetBaseType(value)).to.equal("object");
						}
					}
				);
			}
		);

		describe(
			"GetDetailedType",
			() =>
			{
				it(
					`should return "undefined" when given undefined`,
					() =>
					{
						expect(TypeHint.GetDetailedType(undefined)).to.equal("undefined");
					}
				);

				it(
					`should return "null" when given null`,
					() =>
					{
						expect(TypeHint.GetDetailedType(null)).to.equal("null");
					}
				);

				it(
					`should return "NaN" when given NaN`,
					() =>
					{
						expect(TypeHint.GetDetailedType(Number.NaN)).to.equal("NaN");
					}
				);

				it(
					`should return "boolean (true)" when given true`,
					() =>
					{
						expect(TypeHint.GetDetailedType(true)).to.equal("boolean (true)");
					}
				);

				it(
					`should return "boolean (false)" when given false`,
					() =>
					{
						expect(TypeHint.GetDetailedType(false)).to.equal("boolean (false)");
					}
				);

				it(
					`should return "number" when given a number`,
					() =>
					{
						const VALUES = getValues(CompositeType.NUMBER);

						for (const value of VALUES)
						{
							expect(TypeHint.GetDetailedType(value)).to.equal("number");
						}
					}
				);

				it(
					`should return "string (N characters)" when given a string`,
					() =>
					{
						expect(TypeHint.GetDetailedType("")).to.equal("string (0 characters)");
						expect(TypeHint.GetDetailedType("Hello, World!")).to.equal("string (13 characters)");
					}
				);

				it(
					`should return "symbol (description)" when given a symbol`,
					() =>
					{
						expect(TypeHint.GetDetailedType(Symbol())).to.equal("symbol ()");
						expect(TypeHint.GetDetailedType(Symbol(42))).to.equal("symbol (42)");
						expect(TypeHint.GetDetailedType(Symbol("local"))).to.equal("symbol (local)");
						expect(TypeHint.GetDetailedType(Symbol.for("global"))).to.equal("symbol (global)");
						expect(TypeHint.GetDetailedType(Symbol.iterator)).to.equal("symbol (Symbol.iterator)");
					}
				);

				it(
					`should return "array (N items)" when given an array`,
					() =>
					{
						expect(TypeHint.GetDetailedType([])).to.equal("array (0 items)");
						expect(TypeHint.GetDetailedType([1, 2, 3])).to.equal("array (3 items)");
					}
				);

				it(
					`should return "anonymous class" when given a class expression`,
					() =>
					{
						expect(TypeHint.GetDetailedType(class {})).to.equal("anonymous class");
					}
				);

				it(
					`should return "class Name" when given a class`,
					() =>
					{
						expect(TypeHint.GetDetailedType(DummyClass)).to.equal("class DummyClass");
						expect(TypeHint.GetDetailedType(OldDummyClass)).to.equal("class OldDummyClass");
					}
				);

				it(
					`should return "anonymous function" when given an anonymous function`,
					() =>
					{
						expect(TypeHint.GetDetailedType(() => {})).to.equal("anonymous function");
						expect(TypeHint.GetDetailedType(async () => {})).to.equal("anonymous function");
						expect(TypeHint.GetDetailedType(function () {})).to.equal("anonymous function");
						expect(TypeHint.GetDetailedType(async function () {})).to.equal("anonymous function");
						expect(TypeHint.GetDetailedType(OldDummyClass.Method)).to.equal("anonymous function");
						expect(TypeHint.GetDetailedType(OldDummyClass.AsyncMethod)).to.equal("anonymous function");
						expect(TypeHint.GetDetailedType(OLD_DUMMY.method)).to.equal("anonymous function");
						expect(TypeHint.GetDetailedType(OLD_DUMMY.asyncMethod)).to.equal("anonymous function");
					}
				);

				it(
					`should return "function name" when given a named function`,
					() =>
					{
						function alpha() {}
						async function beta() {}

						expect(TypeHint.GetDetailedType(alpha)).to.equal("function alpha");
						expect(TypeHint.GetDetailedType(beta)).to.equal("function beta");
						// Not using class notation
						expect(TypeHint.GetDetailedType(Array.from)).to.equal("function from");
						expect(TypeHint.GetDetailedType([].map)).to.equal("function map");
					}
				);

				it(
					`should return "anonymous generator" when given an anonymous generator`,
					() =>
					{
						expect(TypeHint.GetDetailedType(function*() { yield 1; })).to.equal("anonymous generator");
						expect(TypeHint.GetDetailedType(function *() { yield 1; })).to.equal("anonymous generator");
						expect(TypeHint.GetDetailedType(function* () { yield 1; })).to.equal("anonymous generator");
						expect(TypeHint.GetDetailedType(function * () { yield 1; })).to.equal("anonymous generator");
					}
				);

				it(
					`should return "generator name" when given a named generator`,
					() =>
					{
						function* generator1() { yield 1; }
						function *generator2() { yield 1; }
						function*generator3() { yield 1; }
						function * generator4() { yield 1; }

						expect(TypeHint.GetDetailedType(generator1)).to.equal("generator generator1");
						expect(TypeHint.GetDetailedType(generator2)).to.equal("generator generator2");
						expect(TypeHint.GetDetailedType(generator3)).to.equal("generator generator3");
						expect(TypeHint.GetDetailedType(generator4)).to.equal("generator generator4");
					}
				);

				it(
					`should return "method name" when given a method`,
					() =>
					{

						expect(TypeHint.GetDetailedType(DummyClass.Method)).to.equal("method Method");
						expect(TypeHint.GetDetailedType(DummyClass.AsyncMethod)).to.equal("method AsyncMethod");
						expect(TypeHint.GetDetailedType(DUMMY.method)).to.equal("method method");
						expect(TypeHint.GetDetailedType(DUMMY.asyncMethod)).to.equal("method asyncMethod");
					}
				);

				it(
					`should return "anonymous object" when given a record-like object`,
					() =>
					{
						const VALUES = getValues(BaseType.RECORD);

						for (const value of VALUES)
						{
							expect(TypeHint.GetDetailedType(value)).to.equal("anonymous object");
						}
					}
				);

				it(
					`should return "object anonymous class" when given an instance of a class expression`,
					() =>
					{
						expect(TypeHint.GetDetailedType(new (class {})())).to.equal("object anonymous class");
					}
				);

				it(
					`should return "object ClassName" when given an instantiated object`,
					() =>
					{
						expect(TypeHint.GetDetailedType(DUMMY)).to.equal("object DummyClass");
					}
				);
			}
		);
	}
);
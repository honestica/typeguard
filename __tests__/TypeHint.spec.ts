import { expect } from "chai";

import { TypeHint } from "../src/TypeHint.js";

import { BaseType, DummyClass, GroupType, OldDummyClass, getInvertedValues, getValues } from "./utils/Utils.js";

const DUMMY: DummyClass = new DummyClass();
/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/typedef -- required for testing */
const OLD_DUMMY = new OldDummyClass();

describe("TypeHint", (): void => {
  describe("GetBaseType", (): void => {
    it(`should return "undefined" when given undefined`, (): void => {
      // @ts-expect-error -- required for testing
      expect(TypeHint.GetBaseType()).to.equal("undefined");
    });

    it(`should return "null" when given null`, (): void => {
      // eslint-disable-next-line unicorn/no-null -- required for testing
      expect(TypeHint.GetBaseType(null)).to.equal("null");
    });

    it(`should return "NaN" when given NaN`, (): void => {
      expect(TypeHint.GetBaseType(Number.NaN)).to.equal("NaN");
    });

    it(`should return "boolean" when given a boolean`, (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("boolean");
      }
    });

    it(`should return "number (value)" when given a number`, (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("number");
      }
    });

    it(`should return "string" when given a string`, (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.STRING);

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("string");
      }
    });

    it(`should return "symbol" when given a symbol`, (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.SYMBOL);

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("symbol");
      }
    });

    it(`should return "array" when given an array`, (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.ARRAY);

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("array");
      }
    });

    it(`should return "class" when given a constructor`, (): void => {
      /**
       *
       */
      const VALUES: Array<unknown> = [class {}, DummyClass, OldDummyClass];

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("class");
      }
    });

    it(`should return "generator" when given a generator function`, (): void => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator1() {
        yield 1;
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator2() {
        yield 1;
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator3() {
        yield 1;
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator4() {
        yield 1;
      }

      const VALUES: Array<unknown> = [
        generator1,
        generator2,
        generator3,
        generator4,
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
      ];

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("generator");
      }
    });

    it(`should return "function" when given a function or method`, (): void => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function trapDummy() {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function TrapDummyClass() {} // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* trapDummyGenerator() {
          yield 1;
        }

        // @ts-expect-error -- Old class notation
        new TrapDummyClass(); // eslint-disable-line no-new -- required for testing
        trapDummyGenerator();
      }

      const VALUES: Array<unknown> = [
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function () {}, // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        async function () {}, // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing
        (): void => {}, // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing
        async (): Promise<void> => {}, // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing
        DummyClass.Method,
        DummyClass.AsyncMethod,
        DUMMY.method,
        DUMMY.asyncMethod,
        OldDummyClass.Method,
        OldDummyClass.AsyncMethod,
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- required for testing */
        OLD_DUMMY.method,
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- required for testing */
        OLD_DUMMY.asyncMethod,
        trapDummy,
      ];

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("function");
      }
    });

    it(`should return "object" when given an object`, (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.RECORD, BaseType.INSTANTIATED);

      for (const value of VALUES) {
        expect(TypeHint.GetBaseType(value)).to.equal("object");
      }
    });
  });

  describe("GetDetailedType", (): void => {
    it(`should return "undefined" when given undefined`, (): void => {
      // @ts-expect-error -- required for testing
      expect(TypeHint.GetDetailedType()).to.equal("undefined");
    });

    it(`should return "null" when given null`, (): void => {
      // eslint-disable-next-line unicorn/no-null -- required for testing
      expect(TypeHint.GetDetailedType(null)).to.equal("null");
    });

    it(`should return "NaN" when given NaN`, (): void => {
      expect(TypeHint.GetDetailedType(Number.NaN)).to.equal("NaN");
    });

    it(`should return "boolean (true)" when given true`, (): void => {
      expect(TypeHint.GetDetailedType(true)).to.equal("boolean (true)");
    });

    it(`should return "boolean (false)" when given false`, (): void => {
      expect(TypeHint.GetDetailedType(false)).to.equal("boolean (false)");
    });

    it(`should return "number" when given a number`, (): void => {
      expect(TypeHint.GetDetailedType(0)).to.equal("number (0)");
      expect(TypeHint.GetDetailedType(-0)).to.equal("number (0)");
      expect(TypeHint.GetDetailedType(1)).to.equal("number (1)");
      expect(TypeHint.GetDetailedType(-1)).to.equal("number (-1)");
      expect(TypeHint.GetDetailedType(Number.MIN_SAFE_INTEGER + 4)).to.equal("number (-9007199254740987)");
      expect(TypeHint.GetDetailedType(Number.MAX_SAFE_INTEGER - 4)).to.equal("number (9007199254740987)");
      expect(TypeHint.GetDetailedType(Number.MIN_SAFE_INTEGER - 4)).to.equal("number (-9007199254740996)");
      expect(TypeHint.GetDetailedType(Number.MAX_SAFE_INTEGER + 4)).to.equal("number (9007199254740996)");
      expect(TypeHint.GetDetailedType(Number.MIN_VALUE)).to.equal("number (5e-324)");
      expect(TypeHint.GetDetailedType(-Number.MIN_VALUE)).to.equal("number (-5e-324)");
      expect(TypeHint.GetDetailedType(Number.MAX_VALUE)).to.equal("number (1.7976931348623157e+308)");
      expect(TypeHint.GetDetailedType(-Number.MAX_VALUE)).to.equal("number (-1.7976931348623157e+308)");
      expect(TypeHint.GetDetailedType(Number.POSITIVE_INFINITY)).to.equal("number (Infinity)");
      expect(TypeHint.GetDetailedType(Number.NEGATIVE_INFINITY)).to.equal("number (-Infinity)");
    });

    it(`should return "string (N characters)" when given a string`, (): void => {
      expect(TypeHint.GetDetailedType("")).to.equal("string (0 characters)");
      expect(TypeHint.GetDetailedType("Hello, World!")).to.equal("string (13 characters)");
    });

    it(`should return "symbol (description)" when given a symbol`, (): void => {
      // eslint-disable-next-line symbol-description -- required for testing
      expect(TypeHint.GetDetailedType(Symbol())).to.equal("symbol ()");
      expect(TypeHint.GetDetailedType(Symbol(42))).to.equal("symbol (42)");
      expect(TypeHint.GetDetailedType(Symbol("local"))).to.equal("symbol (local)");
      expect(TypeHint.GetDetailedType(Symbol.for("global"))).to.equal("symbol (global)");
      expect(TypeHint.GetDetailedType(Symbol.iterator)).to.equal("symbol (Symbol.iterator)");
    });

    it(`should return "array (N items)" when given an array`, (): void => {
      expect(TypeHint.GetDetailedType([])).to.equal("array (0 items)");
      expect(TypeHint.GetDetailedType([1, 2, 3])).to.equal("array (3 items)");
    });

    it(`should return "anonymous class" when given a class expression`, (): void => {
      expect(TypeHint.GetDetailedType(class {})).to.equal("anonymous class");
    });

    it(`should return "class Name" when given a class`, (): void => {
      expect(TypeHint.GetDetailedType(DummyClass)).to.equal("class DummyClass");
      expect(TypeHint.GetDetailedType(OldDummyClass)).to.equal("class OldDummyClass");
    });

    it(`should return "anonymous function" when given an anonymous function`, (): void => {
      const VALUES: Array<unknown> = [
        // eslint-disable-next-line @typescript-eslint/no-empty-function -- required for testing
        (): void => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function -- required for testing
        async (): Promise<void> => {},
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function () {}, // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        async function () {}, // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing
        OldDummyClass.Method,
        OldDummyClass.AsyncMethod,
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- required for testing */
        OLD_DUMMY.method,
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- required for testing */
        OLD_DUMMY.asyncMethod,
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function () {
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
          function TrapDummyClass() {} // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing

          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
          function* trapDummyGenerator() {
            yield 1;
          }

          // @ts-expect-error -- Old class notation
          new TrapDummyClass(); // eslint-disable-line no-new -- required for testing
          trapDummyGenerator();
        },
      ];

      for (const value of VALUES) {
        expect(TypeHint.GetDetailedType(value)).to.equal("anonymous function");
      }
    });

    it(`should return "function name" when given a named function`, (): void => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function alpha() {} // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      async function beta() {} // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function trapDummy() {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function TrapDummyClass() {} // eslint-disable-line @typescript-eslint/no-empty-function -- required for testing

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* trapDummyGenerator() {
          yield 1;
        }

        // @ts-expect-error -- Old class notation
        new TrapDummyClass(); // eslint-disable-line no-new -- required for testing
        trapDummyGenerator();
      }

      expect(TypeHint.GetDetailedType(alpha)).to.equal("function alpha");
      expect(TypeHint.GetDetailedType(beta)).to.equal("function beta");
      expect(TypeHint.GetDetailedType(trapDummy)).to.equal("function trapDummy");
      // Not using class notation
      expect(TypeHint.GetDetailedType(Array.from)).to.equal("function from");
      expect(TypeHint.GetDetailedType([].map)).to.equal("function map");
    });

    it(`should return "anonymous generator" when given an anonymous generator`, (): void => {
      const VALUES: Array<unknown> = [
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
        function* () {
          yield 1;
        },
      ];

      for (const value of VALUES) {
        expect(TypeHint.GetDetailedType(value)).to.equal("anonymous generator");
      }
    });

    it(`should return "generator name" when given a named generator`, (): void => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator1() {
        yield 1;
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator2() {
        yield 1;
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator3() {
        yield 1;
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing
      function* generator4() {
        yield 1;
      }

      expect(TypeHint.GetDetailedType(generator1)).to.equal("generator generator1");
      expect(TypeHint.GetDetailedType(generator2)).to.equal("generator generator2");
      expect(TypeHint.GetDetailedType(generator3)).to.equal("generator generator3");
      expect(TypeHint.GetDetailedType(generator4)).to.equal("generator generator4");
    });

    it(`should return "method name" when given a method`, (): void => {
      expect(TypeHint.GetDetailedType(DummyClass.Method)).to.equal("method Method");
      expect(TypeHint.GetDetailedType(DummyClass.AsyncMethod)).to.equal("method AsyncMethod");
      expect(TypeHint.GetDetailedType(DUMMY.method)).to.equal("method method");
      expect(TypeHint.GetDetailedType(DUMMY.asyncMethod)).to.equal("method asyncMethod");
    });

    it(`should return "anonymous object" when given a record-like object`, (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.RECORD);

      for (const value of VALUES) {
        expect(TypeHint.GetDetailedType(value)).to.equal("anonymous object");
      }
    });

    it(`should return "object anonymous class" when given an instance of a class expression`, (): void => {
      const VALUES: Array<unknown> = [
        // @ts-expect-error -- Old class notation
        new (function () {})() /* eslint-disable-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function -- required for testing */,
        new (class {})(),
      ];

      for (const value of VALUES) {
        expect(TypeHint.GetDetailedType(value)).to.equal("object anonymous class");
      }
    });

    it(`should return "object ClassName" when given an instantiated object`, (): void => {
      expect(TypeHint.GetDetailedType(DUMMY)).to.equal("object DummyClass");
    });
  });

  describe("GetName", (): void => {
    it("should return the name of a given function, generator function, method, or class", (): void => {
      /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function -- required for testing */
      function dummyFunction() {}

      /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing */
      function* dummyGenerator() {
        yield 1;
      }

      expect(TypeHint.GetName(dummyFunction)).to.equal("dummyFunction");
      expect(TypeHint.GetName(dummyGenerator)).to.equal("dummyGenerator");
      expect(TypeHint.GetName(DummyClass.Method)).to.equal("Method");
      expect(TypeHint.GetName(DummyClass)).to.equal("DummyClass");
      expect(TypeHint.GetName(OldDummyClass)).to.equal("OldDummyClass");
    });

    it("should return the name of the constructor of a given object", (): void => {
      expect(TypeHint.GetName([])).to.equal("Array");
      expect(TypeHint.GetName({})).to.equal("Object");
      expect(TypeHint.GetName(DUMMY)).to.equal("DummyClass");
    });

    it("should return an empty string if the given value has no name", (): void => {
      const VALUES: Array<unknown> = [
        // @ts-expect-error -- Old class notation
        new (function () {})() /* eslint-disable-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function -- required for testing */,
        Object.create(null),
        new (class {})(),
        (): void => {} /* eslint-disable-line @typescript-eslint/no-empty-function -- required for testing */,
        function () {} /* eslint-disable-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function -- required for testing */,
        /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- required for testing */
        function* () {
          yield 1;
        },
        class {},
      ];

      for (const value of VALUES) {
        expect(TypeHint.GetName(value)).to.equal("");
      }
    });

    it("should return undefined when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS, GroupType.OBJECT);

      for (const value of VALUES) {
        expect(TypeHint.GetName(value)).to.equal(undefined);
      }
    });
  });
});

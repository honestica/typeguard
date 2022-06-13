import { expect } from "chai";

import { TypeGuard } from "../src/TypeGuard.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "./utils/Utils.js";

const GUARD: (value: unknown) => value is unknown = (value: unknown): value is number => {
  return Number.isSafeInteger(value);
};

describe("TypeGuard", (): void => {
  describe("IsPrimitive", (): void => {
    it("should return true when given a primitive value", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

      for (const value of VALUES) {
        expect(TypeGuard.IsPrimitive(value)).to.be.true;
      }
    });

    it("should return false when given a composite value", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

      for (const value of VALUES) {
        expect(TypeGuard.IsPrimitive(value)).to.be.false;
      }
    });
  });

  describe("IsDefined", (): void => {
    it("should return false when given undefined, null, or NaN", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.NULLISH);

      for (const value of VALUES) {
        expect(TypeGuard.IsDefined(value)).to.be.false;
      }
    });

    it("should return true when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.NULLISH);

      for (const value of VALUES) {
        expect(TypeGuard.IsDefined(value)).to.be.true;
      }
    });
  });

  describe("IsBoolean", (): void => {
    it("should return true when given a boolean", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

      for (const value of VALUES) {
        expect(TypeGuard.IsBoolean(value)).to.be.true;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.BOOLEAN);

      for (const value of VALUES) {
        expect(TypeGuard.IsBoolean(value)).to.be.false;
      }
    });
  });

  describe("IsNumber", (): void => {
    it("should return true when given a number", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect(TypeGuard.IsNumber(value)).to.be.true;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect(TypeGuard.IsNumber(value)).to.be.false;
      }
    });
  });

  describe("IsFiniteNumber", (): void => {
    it("should return true when given a real number", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.FINITE);

      for (const value of VALUES) {
        expect(TypeGuard.IsFiniteNumber(value)).to.be.true;
      }
    });

    it("should return false when given +/-Infinity", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.INFINITY);

      for (const value of VALUES) {
        expect(TypeGuard.IsFiniteNumber(value)).to.be.false;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect(TypeGuard.IsFiniteNumber(value)).to.be.false;
      }
    });
  });

  describe("IsInteger", (): void => {
    it("should return true when given a safe integer", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.INTEGER);

      for (const value of VALUES) {
        expect(TypeGuard.IsInteger(value)).to.be.true;
      }
    });

    it("should return false when given any other number", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.REAL, BaseType.INFINITY);

      for (const value of VALUES) {
        expect(TypeGuard.IsInteger(value)).to.be.false;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect(TypeGuard.IsInteger(value)).to.be.false;
      }
    });
  });

  describe("IsString", (): void => {
    it("should return true when given a string", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.STRING);

      for (const value of VALUES) {
        expect(TypeGuard.IsString(value)).to.be.true;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

      for (const value of VALUES) {
        expect(TypeGuard.IsString(value)).to.be.false;
      }
    });
  });

  describe("IsArray", (): void => {
    it("should return true when given an array", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.ARRAY);

      for (const value of VALUES) {
        expect(TypeGuard.IsArray(value)).to.be.true;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

      for (const value of VALUES) {
        expect(TypeGuard.IsArray(value)).to.be.false;
      }
    });

    it("should return true when given an array with a length greater or equal to the minLength constraint", (): void => {
      expect(
        TypeGuard.IsArray([1, 2, 3], {
          minLength: 2,
        }),
      ).to.be.true;

      expect(
        TypeGuard.IsArray([1, 2, 3], {
          minLength: 3,
        }),
      ).to.be.true;
    });

    it("should return false when given an array with a length below the minLength constraint", (): void => {
      expect(
        TypeGuard.IsArray([], {
          minLength: 1,
        }),
      ).to.be.false;

      expect(
        TypeGuard.IsArray([1, 2, 3], {
          minLength: 4,
        }),
      ).to.be.false;
    });

    it("should return true when given an array with all the values passing the itemGuard constraint", (): void => {
      expect(
        TypeGuard.IsArray([], {
          itemGuard: GUARD,
        }),
      ).to.be.true;

      expect(
        TypeGuard.IsArray([1, 2, 3], {
          itemGuard: GUARD,
        }),
      ).to.be.true;
    });

    it("should return false when given an array with some values not passing the itemGuard constraint", (): void => {
      expect(
        // eslint-disable-next-line symbol-description -- required for testing
        TypeGuard.IsArray([1, 2, 3, Symbol()], {
          itemGuard: GUARD,
        }),
      ).to.be.false;
    });
  });

  describe("IsPopulatedArray", (): void => {
    it("should return false when given an empty array", (): void => {
      expect(TypeGuard.IsPopulatedArray([])).to.be.false;
    });

    it("should return false when given a populated array", (): void => {
      expect(TypeGuard.IsPopulatedArray([1, 2, 3])).to.be.true;
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

      for (const value of VALUES) {
        expect(TypeGuard.IsPopulatedArray(value)).to.be.false;
      }
    });

    it("should return true when given an array with a length greater or equal to the minLength constraint", (): void => {
      expect(
        TypeGuard.IsPopulatedArray([1, 2, 3], {
          minLength: 2,
        }),
      ).to.be.true;

      expect(
        TypeGuard.IsPopulatedArray([1, 2, 3], {
          minLength: 3,
        }),
      ).to.be.true;
    });

    it("should return false when given an array with a length below the minLength constraint", (): void => {
      expect(
        TypeGuard.IsPopulatedArray([1, 2, 3], {
          minLength: 4,
        }),
      ).to.be.false;
    });

    it("should return true when given an array with all the values passing the itemGuard constraint", (): void => {
      expect(
        TypeGuard.IsPopulatedArray([1, 2, 3], {
          itemGuard: GUARD,
        }),
      ).to.be.true;
    });

    it("should return false when given an array with some values not passing the itemGuard constraint", (): void => {
      expect(
        // eslint-disable-next-line symbol-description -- required for testing
        TypeGuard.IsPopulatedArray([1, 2, 3, Symbol()], {
          itemGuard: GUARD,
        }),
      ).to.be.false;
    });
  });

  describe("IsFunction", (): void => {
    it("should return true when given a function (arrow, regular, or constructor)", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.FUNCTION_CLASS);

      for (const value of VALUES) {
        expect(TypeGuard.IsFunction(value)).to.be.true;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS);

      for (const value of VALUES) {
        expect(TypeGuard.IsFunction(value)).to.be.false;
      }
    });
  });

  describe("IsCallable", (): void => {
    it("should return true when given an arrow function", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.CALLABLE);

      for (const value of VALUES) {
        expect(TypeGuard.IsCallable(value)).to.be.true;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.CALLABLE);

      for (const value of VALUES) {
        expect(TypeGuard.IsCallable(value)).to.be.false;
      }
    });
  });

  describe("IsRecord", (): void => {
    it("should return true when given a record object", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.RECORD);

      for (const value of VALUES) {
        expect(TypeGuard.IsRecord(value)).to.be.true;
      }
    });

    it("should return false when given an instantiated class", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.ARRAY, BaseType.INSTANTIATED);

      for (const value of VALUES) {
        expect(TypeGuard.IsRecord(value)).to.be.false;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

      for (const value of VALUES) {
        expect(TypeGuard.IsRecord(value)).to.be.false;
      }
    });
  });

  describe("IsObject", (): void => {
    it("should return true when given an object", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

      for (const value of VALUES) {
        expect(TypeGuard.IsObject(value)).to.be.true;
      }
    });

    it("should return false when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

      for (const value of VALUES) {
        expect(TypeGuard.IsRecord(value)).to.be.false;
      }
    });
  });

  describe("HasNullableProperty", (): void => {
    it("should return false when given an object without the property", (): void => {
      expect(TypeGuard.HasNullableProperty({}, "answer")).to.be.false;
    });

    it("should return true when given an object with the property", (): void => {
      expect(
        TypeGuard.HasNullableProperty(
          {
            answer: undefined,
          },
          "answer",
        ),
      ).to.be.true;
    });
  });

  describe("HasProperty", (): void => {
    it("should return false when given an object without the property", (): void => {
      expect(TypeGuard.HasProperty({}, "answer")).to.be.false;
    });

    it("should return false when given an object with the property, but the value is nullish", (): void => {
      expect(
        TypeGuard.HasProperty(
          {
            answer: undefined,
          },
          "answer",
        ),
      ).to.be.false;
    });

    it("should return true when given an object with the property and the value is not nullish", (): void => {
      expect(
        TypeGuard.HasProperty(
          {
            answer: 42,
          },
          "answer",
        ),
      ).to.be.true;
    });
  });
});

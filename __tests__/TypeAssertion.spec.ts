import { expect } from "chai";

import { TypeAssertion } from "../src/TypeAssertion.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "./utils/Utils.js";

const GUARD: (value: unknown) => value is number = (value: unknown): value is number => {
  return Number.isSafeInteger(value);
};

describe("TypeAssertion", (): void => {
  describe("IsDefined", (): void => {
    it("should throw when given undefined, null, or NaN", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.NULLISH);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsDefined(value);
        }).to.throw(/^value /);
      }
    });

    it("should return when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.NULLISH);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsDefined(value);
        }).to.not.throw();
      }
    });
  });

  describe("IsBoolean", (): void => {
    it("should return when given a boolean", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsBoolean(value);
        }).to.not.throw();
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.BOOLEAN);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsBoolean(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsNumber", (): void => {
    it("should return when given a number", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsNumber(value);
        }).to.not.throw();
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsNumber(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsFiniteNumber", (): void => {
    it("should return when given a real number", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.FINITE);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsFiniteNumber(value);
        }).to.not.throw();
      }
    });

    it("should throw when given +/-Infinity", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.INFINITY);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsFiniteNumber(value);
        }).to.throw(/^value /);
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsFiniteNumber(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsInteger", (): void => {
    it("should return when given a safe integer", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.INTEGER);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsInteger(value);
        }).to.not.throw();
      }
    });

    it("should throw when given any other number", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.REAL, BaseType.INFINITY);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsInteger(value);
        }).to.throw(/^value /);
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsInteger(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsString", (): void => {
    it("should return when given a string", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.STRING);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsString(value);
        }).to.not.throw();
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsString(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsArray", (): void => {
    it("should return when given an array", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.ARRAY);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsArray(value);
        }).to.not.throw();
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsArray(value);
        }).to.throw(/^value /);
      }
    });

    it("should return when given an array with a length greater or equal to the minLength constraint", (): void => {
      expect((): void => {
        TypeAssertion.IsArray([1, 2, 3], {
          minLength: 2,
        });
      }).to.not.throw();

      expect((): void => {
        TypeAssertion.IsArray([1, 2, 3], {
          minLength: 3,
        });
      }).to.not.throw();
    });

    it("should throw when given an array with a length below the minLength constraint", (): void => {
      expect((): void => {
        TypeAssertion.IsArray([], {
          minLength: 1,
        });
      }).to.throw(/^value /);

      expect((): void => {
        TypeAssertion.IsArray([1, 2, 3], {
          minLength: 4,
        });
      }).to.throw(/^value /);
    });

    it("should return when given an array with all the values passing the itemGuard constraint", (): void => {
      expect((): void => {
        TypeAssertion.IsArray([], {
          itemGuard: GUARD,
        });
      }).to.not.throw();

      expect((): void => {
        TypeAssertion.IsArray([1, 2, 3], {
          itemGuard: GUARD,
        });
      }).to.not.throw();
    });

    it("should throw when given an array with some values not passing the itemGuard constraint", (): void => {
      expect((): void => {
        // eslint-disable-next-line symbol-description -- required for testing
        TypeAssertion.IsArray([1, 2, 3, Symbol()], {
          itemGuard: GUARD,
        });
      }).to.throw(/^value /);
    });
  });

  describe("IsPopulatedArray", (): void => {
    it("should throw when given an empty array", (): void => {
      expect((): void => {
        TypeAssertion.IsPopulatedArray([]);
      }).to.throw(/^value /);
    });

    it("should throw when given a populated array", (): void => {
      expect((): void => {
        TypeAssertion.IsPopulatedArray([1, 2, 3]);
      }).to.not.throw();
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsPopulatedArray(value);
        }).to.throw(/^value /);
      }
    });

    it("should return when given an array with a length greater or equal to the minLength constraint", (): void => {
      expect((): void => {
        TypeAssertion.IsPopulatedArray([1, 2, 3], {
          minLength: 2,
        });
      }).to.not.throw();

      expect((): void => {
        TypeAssertion.IsPopulatedArray([1, 2, 3], {
          minLength: 3,
        });
      }).to.not.throw();
    });

    it("should throw when given an array with a length below the minLength constraint", (): void => {
      expect((): void => {
        TypeAssertion.IsPopulatedArray([1, 2, 3], {
          minLength: 4,
        });
      }).to.throw(/^value /);
    });

    it("should return when given an array with all the values passing the itemGuard constraint", (): void => {
      expect((): void => {
        TypeAssertion.IsPopulatedArray([1, 2, 3], {
          itemGuard: GUARD,
        });
      }).to.not.throw();
    });

    it("should throw when given an array with some values not passing the itemGuard constraint", (): void => {
      expect((): void => {
        // eslint-disable-next-line symbol-description -- required for testing
        TypeAssertion.IsPopulatedArray([1, 2, 3, Symbol()], {
          itemGuard: GUARD,
        });
      }).to.throw(/^value /);
    });
  });

  describe("IsFunction", (): void => {
    it("should return when given a function (arrow, regular, or constructor)", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.FUNCTION_CLASS);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsFunction(value);
        }).to.not.throw();
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsFunction(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsCallable", (): void => {
    it("should return when given an arrow function", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.CALLABLE);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsCallable(value);
        }).to.not.throw();
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.CALLABLE);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsCallable(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsRecord", (): void => {
    it("should return when given a record object", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.RECORD);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsRecord(value);
        }).to.not.throw();
      }
    });

    it("should throw when given an instantiated class", (): void => {
      const VALUES: Array<unknown> = getValues(BaseType.ARRAY, BaseType.INSTANTIATED);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsRecord(value);
        }).to.throw(/^value /);
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsRecord(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("IsObject", (): void => {
    it("should return when given an object", (): void => {
      const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsObject(value);
        }).to.not.throw();
      }
    });

    it("should throw when given anything else", (): void => {
      const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

      for (const value of VALUES) {
        expect((): void => {
          TypeAssertion.IsObject(value);
        }).to.throw(/^value /);
      }
    });
  });

  describe("HasNullableProperty", (): void => {
    it("should throw when given an object without the property", (): void => {
      expect((): void => {
        TypeAssertion.HasNullableProperty({}, "answer");
      }).to.throw(/^value /);
    });

    it("should return when given an object with the property", (): void => {
      expect((): void => {
        TypeAssertion.HasNullableProperty(
          {
            answer: undefined,
          },
          "answer",
        );
      }).to.not.throw();
    });
  });

  describe("HasProperty", (): void => {
    it("should throw when given an object without the property", (): void => {
      expect((): void => {
        TypeAssertion.HasProperty({}, "answer");
      }).to.throw(/^value /);
    });

    it("should throw when given an object with the property, but the value is nullish", (): void => {
      expect((): void => {
        TypeAssertion.HasProperty(
          {
            answer: undefined,
          },
          "answer",
        );
      }).to.throw(/^value /);
    });

    it("should return when given an object with the property and the value is not nullish", (): void => {
      expect((): void => {
        TypeAssertion.HasProperty(
          {
            answer: 42,
          },
          "answer",
        );
      }).to.not.throw();
    });
  });
});

import { expect } from "chai";

import { ValueGuard } from "../src/ValueGuard.js";

import { BaseType, DummyClass, GroupType, getInvertedValues } from "./utils/Utils.js";

describe("ValueGuard", (): void => {
  describe("IsSimilar", (): void => {
    it(`should return true when given the same value twice`, (): void => {
      const VALUES: Array<unknown> = getInvertedValues(/* All values */);

      for (const value of VALUES) {
        expect(ValueGuard.IsSimilar(value, value)).to.be.true;
      }
    });

    it(`should return true when given similar primitives or similar records`, (): void => {
      const VALUES_LEFT: Array<unknown> = getInvertedValues(
        BaseType.SYMBOL,
        BaseType.INSTANTIATED,
        GroupType.FUNCTION_CLASS,
      );

      const VALUES_RIGHT: Array<unknown> = getInvertedValues(
        BaseType.SYMBOL,
        BaseType.INSTANTIATED,
        GroupType.FUNCTION_CLASS,
      );

      for (const [index, element] of VALUES_LEFT.entries()) {
        expect(ValueGuard.IsSimilar(element, VALUES_RIGHT[index])).to.be.true;
      }

      expect(ValueGuard.IsSimilar(0, -0)).to.be.true;
      expect(ValueGuard.IsSimilar(-0, 0)).to.be.true;
    });

    it(`should return false when given different primitives`, (): void => {
      const VALUES: Array<unknown> = getInvertedValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

      for (let index: number = 1; index < VALUES.length; ++index) {
        for (let index_: number = 0; index_ < index; ++index_) {
          // Ignore -0 === 0 case
          if (VALUES[index] !== 0 || VALUES[index_] !== 0) {
            expect(ValueGuard.IsSimilar(VALUES[index], VALUES[index_])).to.be.false;
            expect(ValueGuard.IsSimilar(VALUES[index_], VALUES[index])).to.be.false;
          }
        }
      }
    });

    it(`should return false when given different arrays or records`, (): void => {
      expect(
        ValueGuard.IsSimilar(
          {},
          {
            answer: 42,
          },
        ),
      ).to.be.false;

      expect(
        ValueGuard.IsSimilar(
          {
            answer: 42,
          },
          {},
        ),
      ).to.be.false;

      expect(
        ValueGuard.IsSimilar(
          {
            answer: 0,
          },
          {
            answer: 42,
          },
        ),
      ).to.be.false;

      expect(
        ValueGuard.IsSimilar(
          {
            answer: 42,
          },
          {
            answer: 0,
          },
        ),
      ).to.be.false;

      expect(ValueGuard.IsSimilar([0], [1])).to.be.false;
      expect(ValueGuard.IsSimilar([1], [0])).to.be.false;
    });

    it(`should return false when given symbols, or interchangeable functions, classes, or objects`, (): void => {
      /* eslint-disable-next-line symbol-description, @typescript-eslint/no-empty-function -- required for testing */
      const VALUES_LEFT: Array<unknown> = [Symbol(), new DummyClass(), (): void => {}, class {}];

      /* eslint-disable-next-line symbol-description, @typescript-eslint/no-empty-function -- required for testing */
      const VALUES_RIGHT: Array<unknown> = [Symbol(), new DummyClass(), (): void => {}, class {}];

      for (const [index, element] of VALUES_LEFT.entries()) {
        expect(ValueGuard.IsSimilar(element, VALUES_RIGHT[index])).to.be.false;
      }
    });
  });
});

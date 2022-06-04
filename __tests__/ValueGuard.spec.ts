import { expect } from "chai";
import { BaseType, GroupType, getInvertedValues, DummyClass } from "./_Utils.js";
import { ValueGuard } from "../src/ValueGuard.js";

describe(
	"ValueGuard",
	() =>
	{
		describe(
			"IsSimilar",
			() =>
			{
				it(
					`should return true when given the same value twice`,
					() =>
					{
						const VALUES = getInvertedValues(/* All values */);

						for (const value of VALUES)
						{
							expect(ValueGuard.IsSimilar(value, value)).to.be.true;
						}
					}
				);

				it(
					`should return true when given similar primitives or similar records`,
					() =>
					{
						const VALUES_LEFT = getInvertedValues(
							BaseType.SYMBOL,
							BaseType.INSTANTIATED,
							GroupType.FUNCTION_CLASS,
						);

						const VALUES_RIGHT = getInvertedValues(
							BaseType.SYMBOL,
							BaseType.INSTANTIATED,
							GroupType.FUNCTION_CLASS,
						);

						for (let i = 0; i < VALUES_LEFT.length; ++i)
						{
							expect(ValueGuard.IsSimilar(VALUES_LEFT[i], VALUES_RIGHT[i])).to.be.true;
						}

						expect(ValueGuard.IsSimilar(0, -0)).to.be.true;
						expect(ValueGuard.IsSimilar(-0, 0)).to.be.true;
					}
				);

				it(
					`should return false when given different primitives`,
					() =>
					{
						const VALUES = getInvertedValues(
							BaseType.SYMBOL,
							GroupType.OBJECT,
							GroupType.FUNCTION_CLASS,
						);

						for (let i = 1; i < VALUES.length; ++i)
						{
							for (let j = 0; j < i; ++j)
							{
								// Ignore -0 === 0 case
								if (VALUES[i] !== 0 || VALUES[j] !== 0)
								{
									expect(ValueGuard.IsSimilar(VALUES[i], VALUES[j])).to.be.false;
									expect(ValueGuard.IsSimilar(VALUES[j], VALUES[i])).to.be.false;
								}
							}
						}
					}
				);

				it(
					`should return false when given different arrays or records`,
					() =>
					{
						expect(ValueGuard.IsSimilar({}, { answer: 42 })).to.be.false;
						expect(ValueGuard.IsSimilar({ answer: 42 }, {})).to.be.false;

						expect(ValueGuard.IsSimilar({ answer: 0 }, { answer: 42 })).to.be.false;
						expect(ValueGuard.IsSimilar({ answer: 42 }, { answer: 0 })).to.be.false;

						expect(ValueGuard.IsSimilar([0], [1])).to.be.false;
						expect(ValueGuard.IsSimilar([1], [0])).to.be.false;
					}
				);

				it(
					`should return false when given symbols, or interchangeable functions, classes, or objects`,
					() =>
					{
						const VALUES_LEFT = [
							Symbol(),
							new DummyClass(),
							() => {},
							class {},
						];

						const VALUES_RIGHT = [
							Symbol(),
							new DummyClass(),
							() => {},
							class {},
						];

						for (let i = 0; i < VALUES_LEFT.length; ++i)
						{
							expect(ValueGuard.IsSimilar(VALUES_LEFT[i], VALUES_RIGHT[i])).to.be.false;
						}
					}
				);
			}
		);
	}
);

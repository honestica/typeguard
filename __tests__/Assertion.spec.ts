import { expect } from "chai";
import { BaseType, CompositeType, getValues, getInvertedValues } from "./_Utils.js";
import { Assertion } from "../src/Assertion.js";

describe(
	"Assertion",
	() =>
	{
		describe(
			"IsDefined",
			() =>
			{
				it(
					"should throw when given undefined, null, or NaN",
					() =>
					{
						const VALUES = getValues(BaseType.NULLISH);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsDefined(value); }).to.throw();
						}
					}
				);

				it(
					"should return when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.NULLISH);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsDefined(value); }).to.not.throw();
						}
					}
				);
			}
		);

		describe(
			"IsBoolean",
			() =>
			{
				it(
					"should return when given a boolean",
					() =>
					{
						const VALUES = getValues(BaseType.BOOLEAN);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsBoolean(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.BOOLEAN);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsBoolean(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsNumber",
			() =>
			{
				it(
					"should return when given a number",
					() =>
					{
						const VALUES = getValues(CompositeType.NUMBER);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsNumber(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(CompositeType.NUMBER);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsNumber(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsFiniteNumber",
			() =>
			{
				it(
					"should return when given a real number",
					() =>
					{
						const VALUES = getValues(CompositeType.FINITE);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsFiniteNumber(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given +/-Infinity",
					() =>
					{
						const VALUES = getValues(BaseType.INFINITY);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsFiniteNumber(value); }).to.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(CompositeType.NUMBER);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsFiniteNumber(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsInteger",
			() =>
			{
				it(
					"should return when given a safe integer",
					() =>
					{
						const VALUES = getValues(BaseType.INTEGER);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsInteger(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given any other number",
					() =>
					{
						const VALUES = getValues(BaseType.REAL, BaseType.INFINITY);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsInteger(value); }).to.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(CompositeType.NUMBER);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsInteger(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsString",
			() =>
			{
				it(
					"should return when given a string",
					() =>
					{
						const VALUES = getValues(BaseType.STRING);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsString(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.STRING);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsString(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsArray",
			() =>
			{
				it(
					"should return when given an array",
					() =>
					{
						const VALUES = getValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsArray(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsArray(value); }).to.throw();
						}
					}
				);

				it(
					"should return when given an array with a length greater or equal to the minLength constraint",
					() =>
					{
						expect(() => { Assertion.IsArray([1, 2, 3], { minLength: 2 }); }).to.not.throw();
						expect(() => { Assertion.IsArray([1, 2, 3], { minLength: 3 }); }).to.not.throw();
					}
				);

				it(
					"should throw when given an array with a length below the minLength constraint",
					() =>
					{
						expect(() => { Assertion.IsArray([], { minLength: 1 }); }).to.throw();
						expect(() => { Assertion.IsArray([1, 2, 3], { minLength: 4 }); }).to.throw();
					}
				);

				it(
					"should return when given an array with all the values passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(() => { Assertion.IsArray([], { itemGuard: GUARD }); }).to.not.throw();
						expect(() => { Assertion.IsArray([1, 2, 3], { itemGuard: GUARD }); }).to.not.throw();
					}
				);

				it(
					"should throw when given an array with some values not passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(() => { Assertion.IsArray([1, 2, 3, Symbol()], { itemGuard: GUARD }); }).to.throw();
					}
				);
			}
		);

		describe(
			"IsPopulatedArray",
			() =>
			{
				it(
					"should throw when given an empty array",
					() =>
					{
						expect(() => { Assertion.IsPopulatedArray([]); }).to.throw();
					}
				);

				it(
					"should throw when given a populated array",
					() =>
					{
						expect(() => { Assertion.IsPopulatedArray([1, 2, 3]); }).to.not.throw();
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsPopulatedArray(value); }).to.throw();
						}
					}
				);

				it(
					"should return when given an array with a length greater or equal to the minLength constraint",
					() =>
					{
						expect(() => { Assertion.IsPopulatedArray([1, 2, 3], { minLength: 2 }); }).to.not.throw();
						expect(() => { Assertion.IsPopulatedArray([1, 2, 3], { minLength: 3 }); }).to.not.throw();
					}
				);

				it(
					"should throw when given an array with a length below the minLength constraint",
					() =>
					{
						expect(() => { Assertion.IsPopulatedArray([1, 2, 3], { minLength: 4 }); }).to.throw();
					}
				);

				it(
					"should return when given an array with all the values passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(() => { Assertion.IsPopulatedArray([1, 2, 3], { itemGuard: GUARD }); }).to.not.throw();
					}
				);

				it(
					"should throw when given an array with some values not passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(() => { Assertion.IsPopulatedArray([1, 2, 3, Symbol()], { itemGuard: GUARD }); }).to.throw();
					}
				);
			}
		);

		describe(
			"IsFunction",
			() =>
			{
				it(
					"should return when given a function (arrow, regular, or constructor)",
					() =>
					{
						const VALUES = getValues(CompositeType.FUNCTION_CLASS);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsFunction(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(CompositeType.FUNCTION_CLASS);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsFunction(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsCallable",
			() =>
			{
				it(
					"should return when given an arrow function",
					() =>
					{
						const VALUES = getValues(BaseType.CALLABLE);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsCallable(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.CALLABLE);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsCallable(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsRecord",
			() =>
			{
				it(
					"should return when given a record object",
					() =>
					{
						const VALUES = getValues(BaseType.RECORD);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsRecord(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given an instantiated class",
					() =>
					{
						const VALUES = getValues(BaseType.ARRAY, BaseType.INSTANTIATED);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsRecord(value); }).to.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(CompositeType.OBJECT);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsRecord(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"IsObject",
			() =>
			{
				it(
					"should return when given an object",
					() =>
					{
						const VALUES = getValues(CompositeType.OBJECT);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsObject(value); }).to.not.throw();
						}
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(CompositeType.OBJECT);

						for (const value of VALUES)
						{
							expect(() => { Assertion.IsRecord(value); }).to.throw();
						}
					}
				);
			}
		);

		describe(
			"HasNullableProperty",
			() =>
			{
				it(
					"should throw when given an object without the property",
					() =>
					{
						expect(() => { Assertion.HasNullableProperty({}, "answer"); }).to.throw();
					}
				);

				it(
					"should return when given an object with the property",
					() =>
					{
						expect(() => { Assertion.HasNullableProperty({ answer: undefined }, "answer"); }).to.not.throw();
					}
				);
			}
		);

		describe(
			"HasProperty",
			() =>
			{
				it(
					"should throw when given an object without the property",
					() =>
					{
						expect(() => { Assertion.HasProperty({}, "answer"); }).to.throw();
					}
				);

				it(
					"should throw when given an object with the property, but the value is nullish",
					() =>
					{
						expect(() => { Assertion.HasProperty({ answer: undefined }, "answer"); }).to.throw();
					}
				);

				it(
					"should return when given an object with the property and the value is not nullish",
					() =>
					{
						expect(() => { Assertion.HasProperty({ answer: 42 }, "answer"); }).to.not.throw();
					}
				);
			}
		);

	}
);

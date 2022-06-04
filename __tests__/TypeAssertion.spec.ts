import { expect } from "chai";
import { BaseType, CompositeType, getValues, getInvertedValues } from "./_Utils.js";
import { TypeAssertion } from "../src/TypeAssertion.js";

describe(
	"TypeAssertion",
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
							expect(() => { TypeAssertion.IsDefined(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsDefined(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsBoolean(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsBoolean(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsNumber(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsNumber(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsFiniteNumber(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsFiniteNumber(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsFiniteNumber(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsInteger(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsInteger(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsInteger(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsString(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsString(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsArray(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsArray(value); }).to.throw(/^value /);
						}
					}
				);

				it(
					"should return when given an array with a length greater or equal to the minLength constraint",
					() =>
					{
						expect(() => { TypeAssertion.IsArray([1, 2, 3], { minLength: 2 }); }).to.not.throw();
						expect(() => { TypeAssertion.IsArray([1, 2, 3], { minLength: 3 }); }).to.not.throw();
					}
				);

				it(
					"should throw when given an array with a length below the minLength constraint",
					() =>
					{
						expect(() => { TypeAssertion.IsArray([], { minLength: 1 }); }).to.throw(/^value /);
						expect(() => { TypeAssertion.IsArray([1, 2, 3], { minLength: 4 }); }).to.throw(/^value /);
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
						expect(() => { TypeAssertion.IsArray([], { itemGuard: GUARD }); }).to.not.throw();
						expect(() => { TypeAssertion.IsArray([1, 2, 3], { itemGuard: GUARD }); }).to.not.throw();
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
						expect(() => { TypeAssertion.IsArray([1, 2, 3, Symbol()], { itemGuard: GUARD }); }).to.throw(/^value /);
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
						expect(() => { TypeAssertion.IsPopulatedArray([]); }).to.throw(/^value /);
					}
				);

				it(
					"should throw when given a populated array",
					() =>
					{
						expect(() => { TypeAssertion.IsPopulatedArray([1, 2, 3]); }).to.not.throw();
					}
				);

				it(
					"should throw when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(() => { TypeAssertion.IsPopulatedArray(value); }).to.throw(/^value /);
						}
					}
				);

				it(
					"should return when given an array with a length greater or equal to the minLength constraint",
					() =>
					{
						expect(() => { TypeAssertion.IsPopulatedArray([1, 2, 3], { minLength: 2 }); }).to.not.throw();
						expect(() => { TypeAssertion.IsPopulatedArray([1, 2, 3], { minLength: 3 }); }).to.not.throw();
					}
				);

				it(
					"should throw when given an array with a length below the minLength constraint",
					() =>
					{
						expect(() => { TypeAssertion.IsPopulatedArray([1, 2, 3], { minLength: 4 }); }).to.throw(/^value /);
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
						expect(() => { TypeAssertion.IsPopulatedArray([1, 2, 3], { itemGuard: GUARD }); }).to.not.throw();
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
						expect(() => { TypeAssertion.IsPopulatedArray([1, 2, 3, Symbol()], { itemGuard: GUARD }); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsFunction(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsFunction(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsCallable(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsCallable(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsRecord(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsRecord(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsRecord(value); }).to.throw(/^value /);
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
							expect(() => { TypeAssertion.IsObject(value); }).to.not.throw();
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
							expect(() => { TypeAssertion.IsObject(value); }).to.throw(/^value /);
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
						expect(() => { TypeAssertion.HasNullableProperty({}, "answer"); }).to.throw(/^value /);
					}
				);

				it(
					"should return when given an object with the property",
					() =>
					{
						expect(() => { TypeAssertion.HasNullableProperty({ answer: undefined }, "answer"); }).to.not.throw();
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
						expect(() => { TypeAssertion.HasProperty({}, "answer"); }).to.throw(/^value /);
					}
				);

				it(
					"should throw when given an object with the property, but the value is nullish",
					() =>
					{
						expect(() => { TypeAssertion.HasProperty({ answer: undefined }, "answer"); }).to.throw(/^value /);
					}
				);

				it(
					"should return when given an object with the property and the value is not nullish",
					() =>
					{
						expect(() => { TypeAssertion.HasProperty({ answer: 42 }, "answer"); }).to.not.throw();
					}
				);
			}
		);
	}
);

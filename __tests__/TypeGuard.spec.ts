import { expect } from "chai";
import { BaseType, GroupType, getValues, getInvertedValues } from "./_Utils.js";
import { TypeGuard } from "../src/TypeGuard.js";

describe(
	"TypeGuard",
	() =>
	{
		describe(
			"IsPrimitive",
			() =>
			{
				it(
					"should return true when given a primitive value",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsPrimitive(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given a composite value",
					() =>
					{
						const VALUES = getValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsPrimitive(value)).to.be.false;
						}
					}
				);
			}
		);

		describe(
			"IsDefined",
			() =>
			{
				it(
					"should return false when given undefined, null, or NaN",
					() =>
					{
						const VALUES = getValues(BaseType.NULLISH);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsDefined(value)).to.be.false;
						}
					}
				);

				it(
					"should return true when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.NULLISH);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsDefined(value)).to.be.true;
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
					"should return true when given a boolean",
					() =>
					{
						const VALUES = getValues(BaseType.BOOLEAN);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsBoolean(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.BOOLEAN);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsBoolean(value)).to.be.false;
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
					"should return true when given a number",
					() =>
					{
						const VALUES = getValues(GroupType.NUMBER);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsNumber(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(GroupType.NUMBER);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsNumber(value)).to.be.false;
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
					"should return true when given a real number",
					() =>
					{
						const VALUES = getValues(GroupType.FINITE);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsFiniteNumber(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given +/-Infinity",
					() =>
					{
						const VALUES = getValues(BaseType.INFINITY);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsFiniteNumber(value)).to.be.false;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(GroupType.NUMBER);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsFiniteNumber(value)).to.be.false;
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
					"should return true when given a safe integer",
					() =>
					{
						const VALUES = getValues(BaseType.INTEGER);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsInteger(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given any other number",
					() =>
					{
						const VALUES = getValues(BaseType.REAL, BaseType.INFINITY);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsInteger(value)).to.be.false;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(GroupType.NUMBER);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsInteger(value)).to.be.false;
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
					"should return true when given a string",
					() =>
					{
						const VALUES = getValues(BaseType.STRING);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsString(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.STRING);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsString(value)).to.be.false;
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
					"should return true when given an array",
					() =>
					{
						const VALUES = getValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsArray(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsArray(value)).to.be.false;
						}
					}
				);

				it(
					"should return true when given an array with a length greater or equal to the minLength constraint",
					() =>
					{
						expect(TypeGuard.IsArray([1, 2, 3], { minLength: 2 })).to.be.true;
						expect(TypeGuard.IsArray([1, 2, 3], { minLength: 3 })).to.be.true;
					}
				);

				it(
					"should return false when given an array with a length below the minLength constraint",
					() =>
					{
						expect(TypeGuard.IsArray([], { minLength: 1 })).to.be.false;
						expect(TypeGuard.IsArray([1, 2, 3], { minLength: 4 })).to.be.false;
					}
				);

				it(
					"should return true when given an array with all the values passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(TypeGuard.IsArray([], { itemGuard: GUARD })).to.be.true;
						expect(TypeGuard.IsArray([1, 2, 3], { itemGuard: GUARD })).to.be.true;
					}
				);

				it(
					"should return false when given an array with some values not passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(TypeGuard.IsArray([1, 2, 3, Symbol()], { itemGuard: GUARD })).to.be.false;
					}
				);
			}
		);

		describe(
			"IsPopulatedArray",
			() =>
			{
				it(
					"should return false when given an empty array",
					() =>
					{
						expect(TypeGuard.IsPopulatedArray([])).to.be.false;
					}
				);

				it(
					"should return false when given a populated array",
					() =>
					{
						expect(TypeGuard.IsPopulatedArray([1, 2, 3])).to.be.true;
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.ARRAY);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsPopulatedArray(value)).to.be.false;
						}
					}
				);

				it(
					"should return true when given an array with a length greater or equal to the minLength constraint",
					() =>
					{
						expect(TypeGuard.IsPopulatedArray([1, 2, 3], { minLength: 2 })).to.be.true;
						expect(TypeGuard.IsPopulatedArray([1, 2, 3], { minLength: 3 })).to.be.true;
					}
				);

				it(
					"should return false when given an array with a length below the minLength constraint",
					() =>
					{
						expect(TypeGuard.IsPopulatedArray([1, 2, 3], { minLength: 4 })).to.be.false;
					}
				);

				it(
					"should return true when given an array with all the values passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(TypeGuard.IsPopulatedArray([1, 2, 3], { itemGuard: GUARD })).to.be.true;
					}
				);

				it(
					"should return false when given an array with some values not passing the itemGuard constraint",
					() =>
					{
						const GUARD = (value: unknown): value is number =>
						{
							return Number.isSafeInteger(value);
						};
						expect(TypeGuard.IsPopulatedArray([1, 2, 3, Symbol()], { itemGuard: GUARD })).to.be.false;
					}
				);
			}
		);

		describe(
			"IsFunction",
			() =>
			{
				it(
					"should return true when given a function (arrow, regular, or constructor)",
					() =>
					{
						const VALUES = getValues(GroupType.FUNCTION_CLASS);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsFunction(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(GroupType.FUNCTION_CLASS);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsFunction(value)).to.be.false;
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
					"should return true when given an arrow function",
					() =>
					{
						const VALUES = getValues(BaseType.CALLABLE);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsCallable(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(BaseType.CALLABLE);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsCallable(value)).to.be.false;
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
					"should return true when given a record object",
					() =>
					{
						const VALUES = getValues(BaseType.RECORD);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsRecord(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given an instantiated class",
					() =>
					{
						const VALUES = getValues(BaseType.ARRAY, BaseType.INSTANTIATED);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsRecord(value)).to.be.false;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(GroupType.OBJECT);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsRecord(value)).to.be.false;
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
					"should return true when given an object",
					() =>
					{
						const VALUES = getValues(GroupType.OBJECT);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsObject(value)).to.be.true;
						}
					}
				);

				it(
					"should return false when given anything else",
					() =>
					{
						const VALUES = getInvertedValues(GroupType.OBJECT);

						for (const value of VALUES)
						{
							expect(TypeGuard.IsRecord(value)).to.be.false;
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
					"should return false when given an object without the property",
					() =>
					{
						expect(TypeGuard.HasNullableProperty({}, "answer")).to.be.false;
					}
				);

				it(
					"should return true when given an object with the property",
					() =>
					{
						expect(TypeGuard.HasNullableProperty({ answer: undefined }, "answer")).to.be.true;
					}
				);
			}
		);

		describe(
			"HasProperty",
			() =>
			{
				it(
					"should return false when given an object without the property",
					() =>
					{
						expect(TypeGuard.HasProperty({}, "answer")).to.be.false;
					}
				);

				it(
					"should return false when given an object with the property, but the value is nullish",
					() =>
					{
						expect(TypeGuard.HasProperty({ answer: undefined }, "answer")).to.be.false;
					}
				);

				it(
					"should return true when given an object with the property and the value is not nullish",
					() =>
					{
						expect(TypeGuard.HasProperty({ answer: 42 }, "answer")).to.be.true;
					}
				);
			}
		);

	}
);

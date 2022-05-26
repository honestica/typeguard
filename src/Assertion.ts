import type {
	ObjectWithNullableProperty,
	ObjectWithProperty,
	PopulatedArray,
	ArrayConstraints
} from "./Types.js";

import { TypeGuard } from "./TypeGuard.js";

class Assertion
{
	public static IsDefined<Type>(value: Type): asserts value is NonNullable<Type>
	{
		if (!TypeGuard.IsDefined(value))
		{
			throw new Error("value is undefined, null, or NaN");
		}
	}

	public static IsBoolean(value: unknown): asserts value is boolean
	{
		if (!TypeGuard.IsBoolean(value))
		{
			throw new Error("value is not a boolean");
		}
	}

	public static IsNumber(value: unknown): asserts value is number
	{
		if (!TypeGuard.IsNumber(value))
		{
			throw new Error("value is not a number");
		}
	}

	public static IsInteger(value: unknown): asserts value is number
	{
		Assertion.IsNumber(value);

		if (!TypeGuard.IsInteger(value))
		{
			throw new Error("value is not an integer");
		}
	}

	public static IsFiniteNumber(value: unknown): asserts value is number
	{
		Assertion.IsNumber(value);

		if (!TypeGuard.IsFiniteNumber(value))
		{
			throw new Error("value is not a finite number");
		}
	}

	public static IsString(value: unknown): asserts value is string
	{
		if (!TypeGuard.IsString(value))
		{
			throw new Error("value is not a string");
		}
	}

	public static IsArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): asserts value is Array<Type>
	{
		if (!TypeGuard.IsArray(value))
		{
			throw new Error("value is not an array");
		}

		if (constraints === undefined)
		{
			return;
		}

		if (
			constraints.minLength !== undefined
			&&
			value.length < constraints.minLength
		)
		{
			throw new Error("value is an array, but it doesn't have enough items");
		}

		if (
			constraints.itemGuard !== undefined
			&&
			!value.every(constraints.itemGuard)
		)
		{
			throw new Error("value is an array, but some items are invalid");
		}
	}

	public static IsPopulatedArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): asserts value is PopulatedArray<Type>
	{
		if (constraints === undefined)
		{
			Assertion.IsArray(value, { minLength: 1 });
			return;
		}

		Assertion.IsArray(value, { minLength: 1, ...constraints });
	}

	public static IsRecord<KeyType extends number|string|symbol = string>(value: unknown): asserts value is Record<KeyType, unknown>
	{
		if (!TypeGuard.IsRecord<KeyType>(value))
		{
			throw new Error("value is not a record");
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static IsObject(value: unknown): asserts value is object
	{
		if (!TypeGuard.IsObject(value))
		{
			throw new Error("value is not an object");
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static IsFunction(value: unknown): asserts value is Function
	{
		if (!TypeGuard.IsFunction(value))
		{
			throw new Error("value is not a function");
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static IsCallable(value: unknown): asserts value is Function
	{
		if (!TypeGuard.IsCallable(value))
		{
			throw new Error("value is not a callable");
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-shadow
	public static HasNullableProperty<O extends object, K extends string>(value: O, property: K): asserts value is ObjectWithNullableProperty<O, K>
	{
		if (!TypeGuard.HasNullableProperty<O, K>(value, property))
		{
			throw new Error(`value does not have a property named "${property}"`);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-shadow
	public static HasProperty<O extends object, K extends string>(value: O, property: K): asserts value is ObjectWithProperty<O, K>
	{
		Assertion.HasNullableProperty<O, K>(value, property);

		if (!TypeGuard.IsDefined(value[property]))
		{
			throw new Error(`value has a property named "${property}", but it is undefined or null`);
		}
	}
}

export { Assertion };

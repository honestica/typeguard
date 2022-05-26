import type {
	ObjectWithNullableProperty,
	ObjectWithProperty,
	PopulatedArray,
	ArrayConstraints
} from "./Types.js";

class TypeGuard
{
	public static IsDefined<Type>(value: Type): value is NonNullable<Type>
	{
		return (value !== undefined) && (value !== null) && !Number.isNaN(value);
	}

	public static IsBoolean(value: unknown): value is boolean
	{
		return (typeof value === "boolean");
	}

	public static IsNumber(value: unknown): value is number
	{
		return typeof value === "number" && !Number.isNaN(value);
	}

	public static IsInteger(value: unknown): value is number
	{
		return Number.isSafeInteger(value);
	}

	public static IsFiniteNumber(value: unknown): value is number
	{
		return Number.isFinite(value);
	}

	public static IsString(value: unknown): value is string
	{
		return (typeof value === "string");
	}

	public static IsArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): value is Array<Type>
	{
		if (!Array.isArray(value))
		{
			return false;
		}

		if (constraints === undefined)
		{
			return true;
		}

		if (
			constraints.minLength !== undefined
			&&
			value.length < constraints.minLength
		)
		{
			return false;
		}

		if (
			constraints.itemGuard !== undefined
			&&
			!value.every(constraints.itemGuard)
		)
		{
			return false;
		}

		return true;
	}

	public static IsPopulatedArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): value is PopulatedArray<Type>
	{
		if (constraints === undefined)
		{
			return TypeGuard.IsArray(value, { minLength: 1 });
		}

		return TypeGuard.IsArray(value, { minLength: 1, ...constraints });
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static IsFunction(value: unknown): value is Function
	{
		return typeof value === "function";
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static IsCallable(value: unknown): value is Function
	{
		return (typeof value === "function") && (value.prototype === undefined);
	}

	public static IsRecord<KeyType extends number|string|symbol = string>(value: unknown): value is Record<KeyType, unknown>
	{
		if (!TypeGuard.IsObject(value))
		{
			return false;
		}

		const PROTO = Object.getPrototypeOf(value);

		return (PROTO === null || PROTO === Object.prototype);
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static IsObject(value: unknown): value is object
	{
		return (typeof value === "object") && (value !== null);
	}

	// eslint-disable-next-line @typescript-eslint/no-shadow
	public static HasNullableProperty<O extends object, K extends string>(value: O, property: K): value is ObjectWithNullableProperty<O, K>
	{
		return property in value;
	}

	// eslint-disable-next-line @typescript-eslint/no-shadow
	public static HasProperty<O extends object, K extends string>(value: O, property: K): value is ObjectWithProperty<O, K>
	{
		return TypeGuard.HasNullableProperty(value, property) && TypeGuard.IsDefined(value[property]);
	}
}

export { TypeGuard };

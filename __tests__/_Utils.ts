const enum BaseType
{
	NULLISH = "nullish",
	BOOLEAN = "boolean",
	INTEGER = "integer",
	REAL = "real",
	INFINITY = "infinity",
	STRING = "string",
	SYMBOL = "symbol",
	ARRAY = "array",
	RECORD = "record",
	INSTANTIATED = "instantiated",
	CALLABLE = "callable",
	CONSTRUCTIBLE = "constructible",
}

const enum CompositeType
{
	FUNCTION_CLASS = "function-class",
	NUMBER = "number",
	FINITE = "finite",
	OBJECT = "object",
}

function expandTypes(types: Array<BaseType|CompositeType>): Array<BaseType>
{
	const TYPES: Array<BaseType> = [];

	for (const TYPE of types)
	{
		switch (TYPE)
		{
			case CompositeType.NUMBER:

				TYPES.push(BaseType.INTEGER, BaseType.REAL, BaseType.INFINITY);

			break;

			case CompositeType.FINITE:

				TYPES.push(BaseType.INTEGER, BaseType.REAL);

			break;

			case CompositeType.OBJECT:

				TYPES.push(BaseType.ARRAY, BaseType.RECORD, BaseType.INSTANTIATED);

			break;

			case CompositeType.FUNCTION_CLASS:

				TYPES.push(BaseType.CALLABLE, BaseType.CONSTRUCTIBLE);

			break;

			default:

				TYPES.push(TYPE);
		}
	}

	return TYPES;
}

function getValuesForType(type: BaseType): Array<any>
{
	switch (type)
	{
		case BaseType.NULLISH:

			return [undefined, null, Number.NaN];

		case BaseType.BOOLEAN:

			return [false, true];

		case BaseType.INTEGER:

			return [
				0,
				-0,
				1,
				-1,
				Number.MIN_SAFE_INTEGER + 4,
				Number.MAX_SAFE_INTEGER - 4,
			];

		case BaseType.REAL:

			return [
				Number.MIN_SAFE_INTEGER - 4,
				Number.MAX_SAFE_INTEGER + 4,
				Number.MIN_VALUE,
				-Number.MIN_VALUE,
				Number.MAX_VALUE,
				-Number.MAX_VALUE,
			];

		case BaseType.INFINITY:

			return [
				Number.POSITIVE_INFINITY,
				Number.NEGATIVE_INFINITY,
			];

		case BaseType.STRING:

			return [
				"",
				"42",
				"Hello, World!",
			];

		case BaseType.SYMBOL:

			return [Symbol()];

		case BaseType.ARRAY:

			return [
				[],
				[1, 2, 3],
			];

		case BaseType.RECORD:

			return [
				Object.create(null),
				{},
				{ answer: 42 },
			];

		case BaseType.INSTANTIATED:

			return [
				new Date(),
			];

		case BaseType.CALLABLE:

			return [
				() => {},
			];

		case BaseType.CONSTRUCTIBLE:

			return [
				function () {},
				Date,
			];
	}
}

function getValues(...included_types: Array<BaseType|CompositeType>): Array<any>
{
	return expandTypes(included_types).flatMap(getValuesForType);
}

function getInvertedValues(...excluded_types: Array<BaseType|CompositeType>): Array<any>
{
	const ALL_TYPES: Array<BaseType> = [
		BaseType.NULLISH,
		BaseType.BOOLEAN,
		BaseType.INTEGER,
		BaseType.REAL,
		BaseType.INFINITY,
		BaseType.STRING,
		BaseType.SYMBOL,
		BaseType.ARRAY,
		BaseType.RECORD,
		BaseType.INSTANTIATED,
		BaseType.CALLABLE,
		BaseType.CONSTRUCTIBLE,
	];

	const EXCLUDED_TYPES: Array<BaseType> = expandTypes(excluded_types);

	const INCLUDED_TYPES: Array<BaseType> = ALL_TYPES.filter(
		(type) =>
		{
			return !EXCLUDED_TYPES.includes(type);
		}
	);

	return getValues(...INCLUDED_TYPES);
}

export { BaseType, CompositeType, getValues, getInvertedValues };

const enum BaseType
// eslint-disable-next-line @typescript-eslint/indent -- Buggy
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

const enum GroupType
// eslint-disable-next-line @typescript-eslint/indent -- Buggy
{
	FUNCTION_CLASS = "function-class",
	NUMBER = "number",
	FINITE = "finite",
	OBJECT = "object",
}

class DummyClass
{
	public static Method(): void {}

	public static async AsyncMethod(): Promise<void> {}

	public method(): void {}

	public async asyncMethod(): Promise<void> {}
}

interface OldClassStyle
{
	// eslint-disable-next-line @typescript-eslint/naming-convention -- Old class notation
	Method: () => void;
	// eslint-disable-next-line @typescript-eslint/naming-convention -- Old class notation
	AsyncMethod: () => Promise<void>;
	new(): typeof OldDummyClass;
}

// @ts-expect-error: old style class
// eslint-disable-next-line @typescript-eslint/naming-convention -- Old class notation
const OldDummyClass: OldClassStyle = function OldDummyClass() {};

OldDummyClass.Method = function (): void {};

OldDummyClass.AsyncMethod = async function (): Promise<void> {};

OldDummyClass.prototype.method = function (): void {};

OldDummyClass.prototype.asyncMethod = async function (): Promise<void> {};

const DUMMY = new DummyClass();
const OLD_DUMMY = new OldDummyClass();

function expandTypes(types: Array<BaseType | GroupType>): Array<BaseType>
{
	const TYPES: Array<BaseType> = [];

	for (const TYPE of types)
	{
		switch (TYPE)
		{
			case GroupType.NUMBER:

				TYPES.push(BaseType.INTEGER, BaseType.REAL, BaseType.INFINITY);

				break;

			case GroupType.FINITE:

				TYPES.push(BaseType.INTEGER, BaseType.REAL);

				break;

			case GroupType.OBJECT:

				TYPES.push(BaseType.ARRAY, BaseType.RECORD, BaseType.INSTANTIATED);

				break;

			case GroupType.FUNCTION_CLASS:

				TYPES.push(BaseType.CALLABLE, BaseType.CONSTRUCTIBLE);

				break;

			default:

				TYPES.push(TYPE);
		}
	}

	return TYPES;
}

function getValuesForType(type: BaseType): Array<unknown>
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

			return [
				Symbol(),
				Symbol(42),
				Symbol("local"),
				Symbol.for("global"),
				Symbol.iterator,
			];

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
				DUMMY,
				OLD_DUMMY,
				new (class {})(),
			];

		case BaseType.CALLABLE:

			return [
				() => {},
				async function () {},
				DummyClass.Method,
				DummyClass.AsyncMethod,
				DUMMY.method,
				DUMMY.asyncMethod,
				OldDummyClass.AsyncMethod,
				// @ts-expect-error: old class style
				OLD_DUMMY.asyncMethod,
			];

		case BaseType.CONSTRUCTIBLE:

			return [
				class {},
				function () {},
				DummyClass,
				OldDummyClass,
				OldDummyClass.Method,
				// @ts-expect-error: old class notation
				OLD_DUMMY.method,
			];
	}
}

function getValues(...included_types: Array<BaseType | GroupType>): Array<unknown>
{
	return expandTypes(included_types).flatMap(getValuesForType);
}

function getInvertedValues(...excluded_types: Array<BaseType | GroupType>): Array<unknown>
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

export {
	BaseType,
	GroupType,
	getValues,
	getInvertedValues,
	DummyClass,
	OldDummyClass,
};

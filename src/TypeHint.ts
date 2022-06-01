class TypeHint
{
	public static GetBaseType(value: unknown): string
	{
		if (typeof value === "function")
		{
			if (value.prototype === undefined)
			{
				return "function";
			}

			const CODE: string = value.toString();

			if (CODE.startsWith("class "))
			{
				return "class";
			}

			if (/^function +[A-Z]/.test(CODE))
			{
				return "class";
			}

			if (/function *\*/.test(CODE))
			{
				return "generator";
			}

			return "function";
		}

		if (typeof value === "object")
		{
			if (value === null)
			{
				return "null";
			}

			if (Array.isArray(value))
			{
				return "array";
			}

			return "object";
		}

		if (Number.isNaN(value))
		{
			return "NaN";
		}

		return typeof value;
	}

	public static GetDetailedType(value: unknown): string
	{
		if (typeof value === "function")
		{
			if (value.name === "")
			{
				if (value.prototype === undefined)
				{
					return "anonymous function";
				}

				const CODE: string = value.toString();

				if (CODE.startsWith("class "))
				{
					return "anonymous class";
				}

				if (/function *\*/.test(CODE))
				{
					return "anonymous generator";
				}

				return "anonymous function";
			}

			const CODE: string = value.toString();

			if (CODE.startsWith("class "))
			{
				return `class ${value.name}`;
			}

			if (/function *\*/.test(CODE))
			{
				return `generator ${value.name}`;
			}

			if (/^function +[A-Z]/.test(CODE))
			{
				return `class ${value.name}`;
			}

			if (/^(async +)?\w+\(/.test(CODE))
			{
				return `method ${value.name}`;
			}

			return `function ${value.name}`;
		}

		if (typeof value === "object")
		{
			if (value === null)
			{
				return "null";
			}

			if (Array.isArray(value))
			{
				return `array (${value.length} items)`;
			}

			const PROTO = Object.getPrototypeOf(value);

			if (PROTO === null || PROTO.constructor === Object)
			{
				return "anonymous object";
			}

			if (PROTO.constructor.name === "")
			{
				return "object anonymous class";
			}

			return `object ${PROTO.constructor.name}`;
		}

		if (Number.isNaN(value))
		{
			return "NaN";
		}

		if (typeof value === "boolean")
		{
			if (value === true)
			{
				return "boolean (true)";
			}

			return "boolean (false)";
		}

		if (typeof value === "string")
		{
			return `string (${value.length} characters)`;
		}

		if (typeof value === "symbol")
		{
			return "symbol " + value.toString().slice(6);
		}

		return typeof value;
	}
}

export { TypeHint };

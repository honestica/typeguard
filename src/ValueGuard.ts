import { TypeGuard } from "./TypeGuard.js";

/**
* ValueGuard
*
* @class
*/
class ValueGuard
{
	/**
	* IsSimilar
	*
	* @description check if two value are similar (same key and values)
	* @public
	* @static
	* @param {unknown} a first argument
	* @param {unknown} b second argument
	* @return {boolean} a boolean
	*/
	public static IsSimilar(a: unknown, b: unknown): boolean
	{
		if (a === b)
		{
			return true;
		}

		if (Number.isNaN(a) && Number.isNaN(b))
		{
			return true;
		}

		if (TypeGuard.IsRecord(a) && TypeGuard.IsRecord(b))
		{
			const KEYS_A: Array<string> = Object.keys(a);
			const KEYS_B: Array<string> = Object.keys(b);

			if (!ValueGuard.IsSimilar(KEYS_A, KEYS_B))
			{
				return false;
			}

			return KEYS_A.every(
				(key: string): boolean =>
				{
					return ValueGuard.IsSimilar(a[key], b[key]);
				}
			);
		}

		if (Array.isArray(a) && Array.isArray(b) && a.length === b.length)
		{
			// Stryker disable next-line EqualityOperator: Accessing out of bound values on both arrays
			for (let i: number = 0; i < a.length; ++i)
			{
				if (!ValueGuard.IsSimilar(a[i], b[i]))
				{
					return false;
				}
			}

			return true;
		}

		return false;
	}
}

export { ValueGuard };

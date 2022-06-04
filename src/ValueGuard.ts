import { TypeGuard } from "./TypeGuard.js";

class ValueGuard
{
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
			const KEYS_A = Object.keys(a);
			const KEYS_B = Object.keys(b);

			if (!ValueGuard.IsSimilar(KEYS_A, KEYS_B))
			{
				return false;
			}

			for (const key of KEYS_A)
			{
				if (!ValueGuard.IsSimilar(a[key], b[key]))
				{
					return false;
				}
			}

			return true;
		}

		if (Array.isArray(a) && Array.isArray(b) && a.length === b.length)
		{
			// Stryker disable next-line EqualityOperator: Accessing out of bound values on both arrays
			for (let i = 0; i < a.length; ++i)
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

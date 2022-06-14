/**
* ObjectWithNullableProperty type
*/
type ObjectWithNullableProperty<O extends object, K extends string> = O & {
	[property in K]: K extends keyof O ? O[K] : unknown;
};

/**
* ObjectWithProperty type
*/
type ObjectWithProperty<O extends object, K extends string> = O & {
	[property in K]: K extends keyof O ? NonNullable<O[K]> : unknown;
};

/**
* PopulatedArray type
*/
type PopulatedArray<Type> = [Type, ...Array<Type>];

/**
* ArrayConstraints interface
*/
interface ArrayConstraints<Type>
{
	/**
	* minLength
	*/
	minLength?: number;
	/**
	* itemGuard
	*/
	itemGuard?: (item: unknown) => item is Type;
}

export type { ArrayConstraints, ObjectWithNullableProperty, ObjectWithProperty, PopulatedArray };

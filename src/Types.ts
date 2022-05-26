type ObjectWithNullableProperty<O extends object, K extends string> = O & { [property in K]: K extends keyof O ? O[K] : unknown };

type ObjectWithProperty<O extends object, K extends string> = O & { [property in K]: K extends keyof O ? NonNullable<O[K]> : unknown };

type PopulatedArray<Type> = [Type, ...Array<Type>];

interface ArrayConstraints<Type>
{
	minLength?: number;
	itemGuard?: (item: unknown) => item is Type;
}

export type {
	ObjectWithNullableProperty,
	ObjectWithProperty,
	PopulatedArray,
	ArrayConstraints
};

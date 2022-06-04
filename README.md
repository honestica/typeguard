# Documentation

- [TypeAssertion](#typeassertion)
- [TypeGuard](#typeguard)
- [TypeHint](#typehint)
- [ValueGuard](#valueguard)

## TypeAssertion

#### `static IsDefined(value: unknown): void`

Asserts that the value is not nullable, nor NaN.

#### `static IsBoolean(value: unknown): void`

Asserts that the value is a boolean.

#### `static IsNumber(value: unknown): void`

Asserts that the value is a number, but not NaN.

#### `static IsInteger(value: unknown): void`

Asserts that the value is a safe integer.

#### `static IsFiniteNumber(value: unknown): void`

Asserts that the value is a number, but not NaN nor +/-Infinity.

#### `static IsString(value: unknown): void`

Asserts that the value is a string.

#### `static IsArray(value: unknown, constraints?: ArrayConstraints): void`

Asserts that the value is an array.

The optional parameter `constraints` accept an object described by the following interface.
```
interface ArrayConstraints<T>
{
	minLength?: number;
	itemGuard: (item: unknown) => item is T;
}
```

If `minLength` is provided, it'll asserts that the value has at least that many items.<br />
If `itemGuard` is provided, it'll asserts that the predicate hold true for every item.

#### `static IsPopulatedArray(value: unknown, constraints?: ArrayConstraints): void`

Like `IsArray`, but asserts that the array is never empty too.

#### `static IsRecord(value: unknown): void`

Asserts that the value is a record: an object with no prototype, or directly using Object prototype.

#### `static IsObject(value: unknown): void`

Asserts that the value is an object.

#### `static IsFunction(value: unknown): void`

Asserts that the value is a function, generator function, method, or class.

#### `static IsCallable(value: unknown): void`

Asserts that the value is not constructible.

#### `static HasNullableProperty(value: object, property: string): void`

Asserts that the value is an object with the property defined, though it may be nullish or NaN.
#### `static HasProperty(value: object, property: string): void`

Asserts that the value is an object with the property defined.

## TypeGuard

#### `static IsPrimitive(value: unknown): boolean`

Narrow down the value to being nullish, NaN, a boolean, a number, or a string.

#### `static IsDefined(value: unknown): boolean`

Narrow down the value to being not nullable, nor NaN.

#### `static IsBoolean(value: unknown): boolean`

Narrow down the value to being a boolean.

#### `static IsNumber(value: unknown): boolean`

Narrow down the value to being a number, but not NaN.

#### `static IsInteger(value: unknown): boolean`

Narrow down the value to being a safe integer.

#### `static IsFiniteNumber(value: unknown): boolean`

Narrow down the value to being a number, but not NaN nor +/-Infinity.

#### `static IsString(value: unknown): boolean`

Narrow down the value to being a string.

#### `static IsArray(value: unknown, constraints?: ArrayConstraints): boolean`

Narrow down the value to being an array.

The optional parameter `constraints` accept an object described by the following interface.
```
interface ArrayConstraints<T>
{
	minLength?: number;
	itemGuard: (item: unknown) => item is T;
}
```

If `minLength` is provided, it'll confirm that the value has at least that many items.<br />
If `itemGuard` is provided, it'll confirm that the predicate hold true for every item.

#### `static IsPopulatedArray(value: unknown, constraints?: ArrayConstraints): boolean`

Like `IsArray`, but asserts that the array is never empty too.

#### `static IsRecord(value: unknown): boolean`

Narrow down the value to being a record: an object with no prototype, or directly using Object prototype.

#### `static IsObject(value: unknown): boolean`

Narrow down the value to being an object.

#### `static IsFunction(value: unknown): boolean`

Narrow down the value to being a function, generator function, method, or class.

#### `static IsCallable(value: unknown): boolean`

Narrow down the value to being not constructible.

#### `static HasNullableProperty(value: object, property: string): boolean`

Narrow down the value to being an object with the property defined, though it may be nullish or NaN.
#### `static HasProperty(value: object, property: string): boolean`

Narrow down the value to being an object with the property defined.

## TypeHint
#### `static GetBaseType(value: any): string`

Return a string depending on the type of the given value.

Possible values:
- undefined
- null
- NaN
- boolean
- number
- string
- array
- object
- function
- generator
- class

Note: generator refers to a generator function.

#### `static GetDetailedType(value: any): string`

Return a string depending on the type of the given value.<br />
Provide more details than `GetBaseType`.

Possible values:
- undefined
- null
- NaN
- boolean (true or false)
- number (N)
- string (N characters)
- array (N items)
- anonymous object
- object anonymous class
- object ClassName
- anonymous function
- function name
- anonymous generator
- generator name
- anonymous class
- class Name

Note: generator refers to a generator function.

#### `static GetName(value: any): string|undefined`

If given a function, generator function, method, or class, return its name.<br />
If given an object, return its constructor name.<br />
If the given value doesn't have a name, return an empty string.<br />
For any other value, return undefined.


## ValueGuard

#### `static IsSimilar(a: any, b: any): boolean`

Return true in the following cases :
- The same value has been passed as both arguments.
- Similar primitive values have been passed as arguments.
- Similar records have been passed as arguments.

Otherwise, return false.

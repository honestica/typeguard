# Documentation

- [TypeAssertion](#typeassertion)
- [TypeGuard](#typeguard)
- [TypeHint](#typehint)
- [ValueGuard](#valueguard)

## TypeAssertion

### IsDefined

```ts
static IsDefined(value: unknown): void
```

Asserts that the value is not nullable, nor NaN.

### IsBoolean

```ts
static IsBoolean(value: unknown): void
```

Asserts that the value is a boolean.

### IsNumber

```ts
static IsNumber(value: unknown): void
```

Asserts that the value is a number, but not NaN.

### IsInteger

```ts
static IsInteger(value: unknown): void
```

Asserts that the value is a safe integer.

### IsFiniteNumber

```ts
static IsFiniteNumber(value: unknown): void
```

Asserts that the value is a number, but not NaN nor +/-Infinity.

### IsString

```ts
static IsString(value: unknown): void
```

Asserts that the value is a string.

### IsArray

```ts
static IsArray(value: unknown, constraints?: ArrayConstraints): void
```

Asserts that the value is an array.

The optional parameter `constraints` accept an object described by the following interface.

```ts
interface ArrayConstraints<T>
{
	minLength?: number;
	itemGuard?: (item: unknown) => item is T;
}
```

If `minLength` is provided, it'll asserts that the value has at least that many items.<br />
If `itemGuard` is provided, it'll asserts that the predicate hold true for every item.

### IsPopulatedArray

```ts
static IsPopulatedArray(value: unknown, constraints?: ArrayConstraints): void
```

Like `IsArray`, but asserts that the array is never empty too.

### IsRecord

```ts
static IsRecord(value: unknown): void
```

Asserts that the value is a record: an object with no prototype, or directly using Object prototype.

### IsObject

```ts
static IsObject(value: unknown): void
```

Asserts that the value is an object.

### IsFunction

```ts
static IsFunction(value: unknown): void
```

Asserts that the value is a function, generator function, method, or class.

### IsCallable

```ts
static IsCallable(value: unknown): void
```

Asserts that the value is not constructible.

### HasNullableProperty

```ts
static HasNullableProperty(value: object, property: string): void
```

Asserts that the value is an object with the property defined, though it may be nullish or NaN.
### HasProperty

```ts
static HasProperty(value: object, property: string): void
```

Asserts that the value is an object with the property defined.

## TypeGuard

### IsPrimitive

```ts
static IsPrimitive(value: unknown): boolean
```

Narrow down the value to being nullish, NaN, a boolean, a number, or a string.

### IsDefined

```ts
static IsDefined(value: unknown): boolean
```

Narrow down the value to being not nullable, nor NaN.

### IsBoolean

```ts
static IsBoolean(value: unknown): boolean
```

Narrow down the value to being a boolean.

### IsNumber

```ts
static IsNumber(value: unknown): boolean
```

Narrow down the value to being a number, but not NaN.

### IsInteger

```ts
static IsInteger(value: unknown): boolean
```

Narrow down the value to being a safe integer.

### IsFiniteNumber

```ts
static IsFiniteNumber(value: unknown): boolean
```

Narrow down the value to being a number, but not NaN nor +/-Infinity.

### IsString

```ts
static IsString(value: unknown): boolean
```

Narrow down the value to being a string.

### IsArray

```ts
static IsArray(value: unknown, constraints?: ArrayConstraints): boolean
```

Narrow down the value to being an array.

The optional parameter `constraints` accept an object described by the following interface.

```ts
interface ArrayConstraints<T>
{
	minLength?: number;
	itemGuard?: (item: unknown) => item is T;
}
```

If `minLength` is provided, it'll confirm that the value has at least that many items.<br />
If `itemGuard` is provided, it'll confirm that the predicate hold true for every item.

### IsPopulatedArray

```ts
static IsPopulatedArray(value: unknown, constraints?: ArrayConstraints): boolean
```

Like `IsArray`, but narrow it to being a populated array.

### IsRecord

```ts
static IsRecord(value: unknown): boolean
```

Narrow down the value to being a record: an object with no prototype, or directly using Object prototype.

### IsObject

```ts
static IsObject(value: unknown): boolean
```

Narrow down the value to being an object.

### IsFunction

```ts
static IsFunction(value: unknown): boolean
```

Narrow down the value to being a function, generator function, method, or class.

### IsCallable

```ts
static IsCallable(value: unknown): boolean
```

Narrow down the value to being not constructible.

### HasNullableProperty

```ts
static HasNullableProperty(value: object, property: string): boolean
```

Narrow down the value to being an object with the property defined, though it may be nullish or NaN.
### HasProperty

```ts
static HasProperty(value: object, property: string): boolean
```

Narrow down the value to being an object with the property defined.

## TypeHint

### GetBaseType

```ts
static GetBaseType(value: any): string
```

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

### GetDetailedType

```ts
static GetDetailedType(value: any): string
```

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

### GetName

```ts
static GetName(value: any): string|undefined
```

If given a function, generator function, method, or class, return its name.<br />
If given an object, return its constructor name.<br />
If the given value doesn't have a name, return an empty string.<br />
For any other value, return undefined.

## ValueGuard

### IsSimilar

```ts
static IsSimilar(a: any, b: any): boolean
```

Return true in the following cases :
- The same value has been passed as both arguments.
- Similar primitive values have been passed as arguments.
- Deeply similar arrays or records have been passed as arguments.

Otherwise, return false.

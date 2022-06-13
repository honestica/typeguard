import type { ArrayConstraints, ObjectWithNullableProperty, ObjectWithProperty, PopulatedArray } from "./Types.js";

/**
 * TypeGuard
 *
 * @class
 */
class TypeGuard {
  /**
   * IsPrimitive
   *
   * @description Predicate that check if a value is primitive. JS primitive values are boolean | number | string | null | undefined.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsPrimitive(value: unknown): value is boolean | number | string | null | undefined {
    if (value === null) {
      return true;
    }
    if (typeof value === "object" || typeof value === "function" || typeof value === "symbol") {
      return false;
    }

    return true;
  }

  /**
   * IsDefined
   *
   * @description Predicate that check if a value is defined. A value defined is not undefined | null | NaN.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsDefined<Type>(value: Type): value is NonNullable<Type> {
    return value !== undefined && value !== null && !Number.isNaN(value);
  }

  /**
   * IsBoolean
   *
   * @description Predicate that check if a value is a boolean.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
  }

  /**
   * IsNumber
   *
   * @description Predicate that check if a value is a number.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsNumber(value: unknown): value is number {
    return typeof value === "number" && !Number.isNaN(value);
  }

  /**
   * IsInteger
   *
   * @description Predicate that check if a value is an integer.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsInteger(value: unknown): value is number {
    return Number.isSafeInteger(value);
  }

  /**
   * IsFiniteNumber
   *
   * @description Predicate that check if a value is a finite number.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsFiniteNumber(value: unknown): value is number {
    return Number.isFinite(value);
  }

  /**
   * IsString
   *
   * @description Predicate that check if a value is a string.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsString(value: unknown): value is string {
    return typeof value === "string";
  }

  /**
   * IsString
   *
   * @description Predicate that check if a value is a string.
   * @public
   * @static
   * @param {unknown} value the value
   * @param {object} [constraints] some additional check
   * @param {number} [constraints.minLength] minimal length
   * @param {void} [constraints.itemGuard] another predicate
   * @return {boolean} a boolean
   */
  public static IsArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): value is Array<Type> {
    if (!Array.isArray(value)) {
      return false;
    }
    if (constraints === undefined) {
      return true;
    }
    if (constraints.minLength !== undefined && value.length < constraints.minLength) {
      return false;
    }
    // eslint-disable-next-line unicorn/no-array-callback-reference -- please replace
    if (constraints.itemGuard !== undefined && !value.every(constraints.itemGuard)) {
      return false;
    }

    return true;
  }

  /**
   * IsPopulatedArray
   *
   * @description Predicate that check if a value is a non empty array.
   * @public
   * @static
   * @param {unknown} value the value
   * @param {object} [constraints] some additional check
   * @param {number} [constraints.minLength] minimal length
   * @param {void} [constraints.itemGuard] another predicate
   * @return {boolean} a boolean
   */
  public static IsPopulatedArray<Type>(
    value: unknown,
    constraints?: ArrayConstraints<Type>,
  ): value is PopulatedArray<Type> {
    return TypeGuard.IsArray(value, {
      /**
       *
       */
      minLength: 1,
      ...constraints,
    });
  }

  /**
   * IsFunction
   *
   * @description Predicate that check if a value is a function.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsFunction(value: unknown): value is (argument: unknown) => void {
    return typeof value === "function";
  }

  /**
   * IsFunction
   *
   * @description Predicate that check if a value is callable.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsCallable(value: unknown): value is (argument: unknown) => void {
    return typeof value === "function" && value.prototype === undefined;
  }

  /**
   * IsRecord
   *
   * @description Predicate that check if a value is a record.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsRecord<KeyType extends number | string | symbol = string>(
    value: unknown,
  ): value is Record<KeyType, unknown> {
    if (!TypeGuard.IsObject(value)) {
      return false;
    }

    const PROTO: unknown = Object.getPrototypeOf(value);

    return PROTO === null || PROTO === Object.prototype;
  }

  /**
   * IsObject
   *
   * @description Predicate that check if a value is an object.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {boolean} a boolean
   */
  public static IsObject(value: unknown): value is object {
    return typeof value === "object" && value !== null;
  }

  /**
   * HasNullableProperty
   *
   * @description Predicate that check if an object has a nullable property.
   * @public
   * @static
   * @param {object} value the object
   * @param {string} property the property
   * @return {boolean} a boolean
   */
  public static HasNullableProperty<O extends object, K extends string>(
    value: O,
    property: K,
  ): value is ObjectWithNullableProperty<O, K> {
    return property in value;
  }

  /**
   * HasProperty
   *
   * @description Predicate that check if an object has a defined property.
   * @public
   * @static
   * @param {object} value the object
   * @param {string} property the property
   * @return {boolean} a boolean
   */
  public static HasProperty<O extends object, K extends string>(
    value: O,
    property: K,
  ): value is ObjectWithProperty<O, K> {
    return TypeGuard.HasNullableProperty(value, property) && TypeGuard.IsDefined(value[property]);
  }
}

export { TypeGuard };

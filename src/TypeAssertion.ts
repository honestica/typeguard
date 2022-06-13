import { TypeGuard } from "./TypeGuard.js";

import type { ArrayConstraints, ObjectWithNullableProperty, ObjectWithProperty, PopulatedArray } from "./Types.js";

/**
 * TypeAssertion
 *
 * @class
 */
class TypeAssertion {
  /**
   * IsDefined
   *
   * @description Assertion that check if a value is defined.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is undefined, null or NaN
   * @return {void} nothing
   */
  public static IsDefined<Type>(value: Type): asserts value is NonNullable<Type> {
    if (!TypeGuard.IsDefined(value)) {
      throw new Error("value is undefined, null, or NaN");
    }
  }

  /**
   * IsBoolean
   *
   * @description Assertion that check if a value is a boolean.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not a boolean
   * @return {void} nothing
   */
  public static IsBoolean(value: unknown): asserts value is boolean {
    if (!TypeGuard.IsBoolean(value)) {
      throw new Error("value is not a boolean");
    }
  }

  /**
   * IsNumber
   *
   * @description Assertion that check if a value is a number.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not a number
   * @return {void} nothing
   */
  public static IsNumber(value: unknown): asserts value is number {
    if (!TypeGuard.IsNumber(value)) {
      throw new Error("value is not a number");
    }
  }

  /**
   * IsInteger
   *
   * @description Assertion that check if a value is an integer.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not an integer
   * @return {void} nothing
   */
  public static IsInteger(value: unknown): asserts value is number {
    TypeAssertion.IsNumber(value);

    if (!TypeGuard.IsInteger(value)) {
      throw new Error("value is not an integer");
    }
  }

  /**
   * IsFiniteNumber
   *
   * @description Assertion that check if a value is a finite number.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not a finite number
   * @return {void} nothing
   */
  public static IsFiniteNumber(value: unknown): asserts value is number {
    TypeAssertion.IsNumber(value);

    if (!TypeGuard.IsFiniteNumber(value)) {
      throw new Error("value is not a finite number");
    }
  }

  /**
   * IsString
   *
   * @description Assertion that check if a value is a string.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not a string
   * @return {void} nothing
   */
  public static IsString(value: unknown): asserts value is string {
    if (!TypeGuard.IsString(value)) {
      throw new Error("value is not a string");
    }
  }

  /**
   * IsArray
   *
   * @description Assertion that check if a value is an array.
   * @public
   * @static
   * @param {unknown} value the value
   * @param {object} [constraints] some additional check
   * @param {number} [constraints.minLength] minimal length
   * @param {void} [constraints.itemGuard] another predicate
   * @throws {Error} if the value is not an array
   * @throws {Error} if the array does not have enough items {@link constraints.minLength}
   * @throws {Error} if the array has some item which does not comply the {@link constraints.itemGuard} predicate
   * @return {void} nothing
   */
  public static IsArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): asserts value is Array<Type> {
    if (!TypeGuard.IsArray(value)) {
      throw new Error("value is not an array");
    }
    if (constraints === undefined) {
      return;
    }
    if (constraints.minLength !== undefined && value.length < constraints.minLength) {
      throw new Error("value is an array, but it doesn't have enough items");
    }
    // eslint-disable-next-line unicorn/no-array-callback-reference -- useless
    if (constraints.itemGuard !== undefined && !value.every(constraints.itemGuard)) {
      throw new Error("value is an array, but some items are invalid");
    }
  }

  /**
   * IsPopulatedArray
   *
   * @description Assertion that check if a value is an array with at least one item.
   * @public
   * @static
   * @param {unknown} value the value
   * @param {object} [constraints] some additional check
   * @param {number} [constraints.minLength] minimal length
   * @param {void} [constraints.itemGuard] another predicate
   * @throws {Error} if the value is not an array
   * @throws {Error} if the array does not have enough items {@link constraints.minLength}
   * @throws {Error} if the array has some item which does not comply the {@link constraints.itemGuard} predicate
   * @return {void} nothing
   */
  public static IsPopulatedArray<Type>(
    value: unknown,
    constraints?: ArrayConstraints<Type>,
  ): asserts value is PopulatedArray<Type> {
    TypeAssertion.IsArray(value, {
      /**
       *
       */
      minLength: 1,
      ...constraints,
    });
  }

  /**
   * IsRecord
   *
   * @description Assertion that check if a value is a record.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not a record
   * @return {void} nothing
   */
  public static IsRecord<KeyType extends number | string | symbol = string>(
    value: unknown,
  ): asserts value is Record<KeyType, unknown> {
    if (!TypeGuard.IsRecord<KeyType>(value)) {
      throw new Error("value is not a record");
    }
  }

  /**
   * IsObject
   *
   * @description Assertion that check if a value is an object.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not an object
   * @return {void} nothing
   */
  public static IsObject(value: unknown): asserts value is object {
    if (!TypeGuard.IsObject(value)) {
      throw new Error("value is not an object");
    }
  }

  /**
   * IsFunction
   *
   * @description Assertion that check if a value is a function.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not a function
   * @return {void} nothing
   */
  public static IsFunction(value: unknown): asserts value is (argument: unknown) => void {
    if (!TypeGuard.IsFunction(value)) {
      throw new Error("value is not a function");
    }
  }

  /**
   * IsCallable
   *
   * @description Assertion that check if a value is callable.
   * @public
   * @static
   * @param {unknown} value the value
   * @throws {Error} if the value is not callable
   * @return {void} nothing
   */
  public static IsCallable(value: unknown): asserts value is (argument: unknown) => void {
    if (!TypeGuard.IsCallable(value)) {
      throw new Error("value is not a callable");
    }
  }

  /**
   * HasNullableProperty
   *
   * @description Predicate that check if an object as a nullable property.
   * @public
   * @static
   * @param {object} value the object
   * @param {string} property the property
   * @throws {Error} if the value does not have a property named {@link property}
   * @return {void} nothing
   */
  public static HasNullableProperty<O extends object, K extends string>(
    value: O,
    property: K,
  ): asserts value is ObjectWithNullableProperty<O, K> {
    if (!TypeGuard.HasNullableProperty<O, K>(value, property)) {
      throw new Error(`value does not have a property named "${property}"`);
    }
  }

  /**
   * HasProperty
   *
   * @description Predicate that check if an object as a property.
   * @public
   * @static
   * @param {object} value the object
   * @param {string} property the property
   * @throws {Error} if the value does not have a property named {@link property}
   * @throws {Error} if the {@link property} is undefined, null or NaN
   * @return {void} nothing
   */
  public static HasProperty<O extends object, K extends string>(
    value: O,
    property: K,
  ): asserts value is ObjectWithProperty<O, K> {
    TypeAssertion.HasNullableProperty<O, K>(value, property);

    if (!TypeGuard.IsDefined(value[property])) {
      throw new Error(`value has a property named "${property}", but it is undefined, null, or NaN`);
    }
  }
}

export { TypeAssertion };

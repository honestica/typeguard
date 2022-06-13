/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-template-expressions -- please fix */
/**
 * TypeHint
 *
 * @class
 */
class TypeHint {
  /**
   * GetBaseType
   *
   * @description get the base type of a value.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {string} string
   */
  public static GetBaseType(value: unknown): string {
    if (typeof value === "function") {
      // This is purely an optimization, so mutation testing is disabled.
      // Stryker disable next-line ConditionalExpression
      if (value.prototype === undefined) {
        // Stryker disable next-line BlockStatement
        return "function";
      }

      const stringifiedValue: string = value.toString();

      if (stringifiedValue.startsWith("class ") || /^function [A-Z]/.test(stringifiedValue)) {
        return "class";
      }
      if (/^function ?\*/.test(stringifiedValue)) {
        return "generator";
      }

      return "function";
    }
    if (typeof value === "object") {
      if (value === null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return "array";
      }

      return "object";
    }
    if (Number.isNaN(value)) {
      return "NaN";
    }

    return typeof value;
  }

  /**
   * GetDetailedType
   *
   * @description get the detailed type of a value.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {string} string
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity -- useless
  public static GetDetailedType(value: unknown): string {
    if (typeof value === "function") {
      if (value.name === "") {
        // This is purely an optimization, so mutation testing is disabled.
        // Stryker disable next-line ConditionalExpression
        if (value.prototype === undefined) {
          // Stryker disable next-line BlockStatement
          return "anonymous function";
        }

        const stringifiedValue: string = value.toString();

        if (stringifiedValue.startsWith("class ")) {
          return "anonymous class";
        }
        if (/^function ?\*/.test(stringifiedValue)) {
          return "anonymous generator";
        }

        return "anonymous function";
      }

      const CODE: string = value.toString();

      if (CODE.startsWith("class ") || /^function [A-Z]/.test(CODE)) {
        return `class ${value.name}`;
      }
      if (/^function ?\*/.test(CODE)) {
        return `generator ${value.name}`;
      }
      if (/^(?:async )?\w+\(/.test(CODE)) {
        return `method ${value.name}`;
      }

      return `function ${value.name}`;
    }
    if (typeof value === "object") {
      if (value === null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return `array (${value.length.toString()} items)`;
      }

      const PROTO: unknown = Object.getPrototypeOf(value);

      if (PROTO === null || PROTO === Object.prototype) {
        return "anonymous object";
      }
      // @ts-expect-error please fix
      if (PROTO.constructor.name === "") {
        return "object anonymous class";
      }

      // @ts-expect-error please fix
      return `object ${PROTO.constructor.name}`;
    }
    if (Number.isNaN(value)) {
      return "NaN";
    }
    if (typeof value === "boolean") {
      if (value) {
        return "boolean (true)";
      }

      return "boolean (false)";
    }
    if (typeof value === "number") {
      return `number (${value.toString()})`;
    }
    if (typeof value === "string") {
      return `string (${value.length.toString()} characters)`;
    }
    if (typeof value === "symbol") {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- useless
      return `symbol ${value.toString().slice(6)}`;
    }

    return typeof value;
  }

  /**
   * GetName
   *
   * @description Get the name of a value.
   * @public
   * @static
   * @param {unknown} value the value
   * @return {string|undefined} a string or nothing
   */
  public static GetName(value: unknown): string | undefined {
    if (typeof value === "function") {
      return value.name;
    } else if (typeof value === "object" && value !== null) {
      const PROTO: unknown = Object.getPrototypeOf(value);

      if (PROTO === null) {
        return "";
      }

      // @ts-expect-error please fix
      return PROTO.constructor.name;
    }

    return undefined;
  }
}

export { TypeHint };

/* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-template-expressions -- please fix */

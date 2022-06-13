import { TypeGuard } from "./TypeGuard.js";

/**
 * ValueGuard
 *
 * @class
 */
class ValueGuard {
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
  // eslint-disable-next-line sonarjs/cognitive-complexity -- useless
  public static IsSimilar(a: unknown, b: unknown): boolean {
    if (a === b) {
      return true;
    }
    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true;
    }
    if (TypeGuard.IsRecord(a) && TypeGuard.IsRecord(b)) {
      const KEYS_A: Array<string> = Object.keys(a);
      const KEYS_B: Array<string> = Object.keys(b);

      if (!ValueGuard.IsSimilar(KEYS_A, KEYS_B)) {
        return false;
      }
      for (const key of KEYS_A) {
        if (!ValueGuard.IsSimilar(a[key], b[key])) {
          return false;
        }
      }

      return true;
    }
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
      // Stryker disable next-line EqualityOperator: Accessing out of bound values on both arrays
      for (const [index, element] of a.entries()) {
        if (!ValueGuard.IsSimilar(element, b[index])) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}

export { ValueGuard };

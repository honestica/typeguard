class TypeGuard {
  public static IsDefined<Type = unknown>(value: Type): value is NonNullable<Type> {
    return value !== undefined && value !== null;
  }

  public static IsBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  public static IsString(value: unknown): value is string {
    return typeof value === 'string';
  }

  public static IsNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  public static IsArray<Type = unknown>(value: unknown): value is Array<Type> {
    return Array.isArray(value);
  }

  /**
   * IsArrayString
   */
  public static IsArrayString(value: unknown): value is Array<string> {
    if (!TypeGuard.IsArray(value)) {
      return false;
    }

    for (const element of value) {
      if (!TypeGuard.IsString(element)) {
        return false;
      }
    }

    return true;
  }

  public static IsRecord<KeyType extends string | number | symbol = string>(
    value: unknown,
  ): value is Record<KeyType, unknown> {
    return typeof value === 'object' && value !== null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static IsObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static HasProperty<KeyName extends string>(
    value: object,
    property: KeyName,
  ): value is { [property in KeyName]: unknown } {
    return property in value;
  }

  /**
   * GetRealType
   */
  public static GetRealType(value: unknown): string {
    if (value === undefined) {
      return 'undefined';
    }

    if (value === null) {
      return 'null';
    }

    if (TypeGuard.IsObject(value) && TypeGuard.HasProperty(value, '__proto__') && TypeGuard.IsObject(value.__proto__) && TypeGuard.HasProperty(value.__proto__, 'constructor') && TypeGuard.IsObject(value.__proto__.constructor) && TypeGuard.HasProperty(value.__proto__.constructor, 'name') && TypeGuard.IsString(value.__proto__.constructor.name)) {
      return value.__proto__.constructor.name;
    }

    return 'unknown';
  }

  /**
   * HasDefinedProperty
   */
  public static HasDefinedProperty<O extends object, K extends string>(value: O, property: K): value is O & { [property in K]: K extends keyof O ? NonNullable<O>[K] : unknown } {
    // @ts-expect-error
    return property in value && TypeGuard.IsDefined(value[property]);    
  }
}

export { TypeGuard };

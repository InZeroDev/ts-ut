/**
 * A type that represents values that can be converted to strings.
 */
export type Stringable = string | number | boolean | bigint | null | undefined;

/**
 * Generates a type that suggests a pre-defined list of choices while accepting any other string.
 *
 * @example
 * type Fruit = Suggest<"Apple" | "Orange">;
 *
 * const f1: Fruit = "Apple"; // Valid + Auto-completion
 * const f2: Fruit = "Banana"; // Valid
 */
export type Suggest<T extends string> = T | (string & {});

/**
 * Converts a {@linkcode Stringable} to its string representation.
 *
 * @example
 * type R1 = Stringify<123>; // "123"
 * type R2 = Stringify<{ a: 1 }>; // never
 */
export type Stringify<T> = T extends Stringable ? `${T}` : never;

/**
 * Concatenates two strings with an optional separator.
 */
export type Concat<A extends string, B extends string, S extends string = ""> = `${A}${S}${B}`;

import type { Not } from "./utils";

/**
 * Checks if a type is `unknown`.
 */
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

/**
 * Checks if a type is `any`.
 */
export type IsAny<T> = ":)" extends ":(" & T ? true : false;

/**
 * Checks if a type is `never`.
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * An alias for `T extends U ? true : false`.
 *
 * - Used to chain multiple checks together.
 * - Useful to reduce nesting level for complex types.
 * - Can require some thinking before using it correctly.
 * - See the last comment in the example below.
 * - This type is mostly for personal use :)
 *
 * @example
 * // Instead of
 * type Example<A, B> = A extends Dict ? B extends Dict ? "Do something" : never : never;
 *
 * // You can do
 * type Version2<A, B> = IsSubtype<A, Dict> | IsSubtype<B, Dict> extends true ? "Do something" : never;
 *
 * // Note that TypeScript doesn't know about these checks, which will likely cause errors saying A and B are not objects inside the "Do Something" branch.
 */
export type IsSubtype<T, U> = T extends U ? true : false;

/**
 * A negated version of {@linkcode IsSubtype}.
 */
export type IsNotSubtype<T, U> = Not<IsSubtype<T, U>>;

/**
 * Checks whether a union contains a specific type.
 *
 * @example
 * type R1 = HasType<"foo" | "bar", "foo">; // true
 * type R2 = HasType<"foo" | "bar", "baz">; // false
 */
export type HasType<U, T> = (U extends T ? true : false) extends infer R
	? IsSubtype<R, true> | IsSubtype<[boolean], [R]> extends false
		? false
		: true
	: never;

/**
 * A negated version of {@linkcode HasType}.
 */
export type LacksType<U, T> = Not<HasType<U, T>>;

/**
 * Checks if two types are equal. Not just that they extend each other,
 * but are exactly the same (at least until a bug proves otherwise).
 */
export type AreEqual<A, B> =
	(<T>() => T extends A ? ":)" : ":(") extends <T>() => T extends B ? ":)" : ":(" ? true : false;

/**
 * A negated version of {@linkcode AreEqual}.
 */
export type AreNotEqual<A, B> = Not<AreEqual<A, B>>;

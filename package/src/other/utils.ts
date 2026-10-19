import type { IsPrimitive } from "../_internal";
import type { Dict, Valueof } from "../dict";
import type { AreEqual, IsAny, IsNever, IsSubtype, IsUnknown } from "./validation";

/**
 * An alias for `any`.
 */
export type Valid = any;

/**
 * @example
 * // Suppose you have a type like this
 * type Token = "+" | "-" | "*" | "/";
 *
 * // And you want to give each member an alias:
 * const tk = {
 * 	plus: "+",
 * 	minus: "-",
 * 	times: "*",
 * 	divide: "/",
 * } satisfies Dict<string, Token>;
 *
 * // To make sure that all tokens have an alias, you can use something like this:
 * {
 *   type Check = Assert<AreEqual<Valueof<typeof tk>, Token>>;
 * }
 * // You'll see an error if there's a missing/extra token
 * // Note: AreEqual and Valueof are other utils provided by this package
 */
export type Assert<T extends E, E = true> = T;

/**
 * Negates a boolean.
 */
export type Not<T extends boolean> = T extends true ? false : true;

/**
 * Similar to the built-in {@linkcode Extract Extract<T, U>}, except it return `Extract<U, T>` (or simply `U`)
 * when `T` is `unknown`, `any` or a **primitive type** (string, number, boolean).
 */
export type SmartExtract<T, U> = T extends T
	? IsUnknown<T> | IsAny<T> | IsPrimitive<T> extends false
		? Extract<T, U>
		: Extract<U, T>
	: never;


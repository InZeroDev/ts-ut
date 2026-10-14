import type { Not } from "./utils";

export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

export type IsAny<T> = ":)" extends ":(" & T ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsSubtype<T, U> = T extends U ? true : false;

export type IsNotSubtype<T, U> = Not<IsSubtype<T, U>>;

export type HasType<U, T> = (U extends T ? true : false) extends infer R
	? IsSubtype<R, true> | IsSubtype<[boolean], [R]> extends false
		? false
		: true
	: never;

export type LacksType<U, T> = Not<HasType<U, T>>;

export type AreEqual<A, B> =
	(<T>() => T extends A ? ":)" : ":(") extends <T>() => T extends B ? ":)" : ":(" ? true : false;

export type AreNotEqual<A, B> = Not<AreEqual<A, B>>;

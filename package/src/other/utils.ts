import type { AreEqual, IsAny, IsNever, IsSubtype, IsUnknown } from "./validation";

export type Valid = any;

export type Assert<T extends E, E = true> = T;

export type Not<T extends boolean> = T extends true ? false : true;

export type SmartExtract<T, U> = T extends T
	? IsUnknown<T> | IsAny<T> | IsPrimitive<T> extends false
		? Extract<T, U>
		: Extract<U, T>
	: never;

// ---Internal---

type IsPrimitive<T> = IsAny<T> | IsUnknown<T> | IsNever<T> extends false
	? _IsPrimitive<_Wrap<T>>
	: false;

type _IsPrimitive<T> = T extends T
	? AreEqual<T, [string]> | AreEqual<T, [number]> | AreEqual<T, [boolean]> extends false
		? false
		: true
	: never;

type _Wrap<T> = (T extends T ? [T] : never) extends infer R
	? IsSubtype<[true], R> | IsSubtype<[false], R> extends true
		? [boolean] | Exclude<R, [boolean]>
		: R
	: never;

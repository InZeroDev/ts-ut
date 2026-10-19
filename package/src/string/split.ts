import type { ROList } from "../list";
import type { Stringable } from "./utils";

export type Split<T extends string, S extends string> = T extends ""
	? []
	: T extends `${infer L}${S}${infer R}`
		? [L, ...Split<R, S>]
		: [T];

export type Join<T extends ROList<string>, S extends string = ""> = T extends readonly [
	infer F extends string,
	...infer R extends ROList<string>,
]
	? R["length"] extends 0
		? F
		: `${F}${S}${Join<R, S>}`
	: "";

export type IsTuple<T> = T extends T
	? Required<T> extends readonly [] | readonly [unknown, ...unknown[]]
		? true
		: false
	: never;

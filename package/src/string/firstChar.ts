export type FirstChar<T extends string> = T extends `${infer U extends string}${string}`
	? U
	: never;

export type LastChar<T extends string> = T extends `${string}${infer U extends string}`
	? U extends ""
		? T
		: LastChar<U>
	: never;

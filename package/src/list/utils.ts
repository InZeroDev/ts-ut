export type List<T = unknown> = T[];

export type ROList<T = unknown> = readonly T[];

export type OrList<T = unknown> = T | List<T>;

export type OrROList<T = unknown> = T | ROList<T>;

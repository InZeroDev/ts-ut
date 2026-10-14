/**
 * An alias for `T[]`.
 */
export type List<T = unknown> = T[];

/**
 * An alias for `readonly T[]`.
 */
export type ROList<T = unknown> = readonly T[];

/**
 * An alias for `T | T[]`.
 */
export type OrList<T = unknown> = T | List<T>;

/**
 * An alias for `T | readonly T[]`.
 */
export type OrROList<T = unknown> = T | ROList<T>;

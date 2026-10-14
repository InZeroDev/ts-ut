import type { ROList } from "../list";
import type { NormalizeIndex } from "../_internal";

/**
 * Creates a function type with the given arguments and return type.
 *
 * @example
 * type F1 = Func; // () => any
 * type F2 = Func<[string]>; // (args_0: string) => any
 * type F3 = Func<[], string>; // () => string
 * type F4 = Func<[name: string], string>; // (name: string) => string
 */
export type Func<A extends ROList = any[], R = any> = (...args: A) => R;

/**
 * An alias for `T | Func<A, T>`.
 *
 * @see {@linkcode Func}
 */
export type OrFunc<T, A extends ROList = []> = T | Func<A, T>;

/**
 * An alias for `() => void`.
 */
export type VoidFn = Func<[], void>;

/**
 * An alias for {@linkcode Parameters<F>}.
 */
export type Params<F extends Func> = Parameters<F>;

/**
 * Gets the parameter at the given index. Negative indices are supported.
 *
 * @example
 * type Fn = (a: string, b: number) => void;
 * type R1 = Param<Fn, 0>; // string
 * type R2 = Param<Fn, -1>; // number
 */
export type Param<F extends Func, I extends number> = Params<F>[NormalizeIndex<I, Params<F>>];

/**
 * An alias for {@linkcode ReturnType<F>}.
 */
export type RT<F extends Func> = ReturnType<F>;

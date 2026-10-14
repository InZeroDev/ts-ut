import type { ROList } from "../list";
import type { NormalizeIndex } from "../tuple/utils";

export type Func<A extends ROList = [], R = any> = (...args: A) => R;

export type OrFunc<T, A extends ROList = []> = T | Func<A, T>;

export type VoidFn = Func<[], void>;

export type Params<F extends Func> = Parameters<F>;

export type Param<F extends Func, I extends number> = Params<F>[NormalizeIndex<I, Params<F>>];

export type RT<F extends Func> = ReturnType<F>;

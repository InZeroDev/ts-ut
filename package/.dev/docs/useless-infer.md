In `HasType` utility, you will see what looks like a useless infer:

```ts

```

To understand why we did that, let's use the clean version:

```ts
type HasType<U, T> = (U extends T ? true : false) extends false ? false : true;
```

Now if we use it in a way similar to this, you'll get an error:

```ts
function isString<T>(
	value: HasType<T, string> extends true ? T : never,
): value is Extract<T, string> {
	// 🡑________🡑 A type predicate's type must be assignable to its parameter's type.
	return typeof value === "string";
}
```

Update the HasType to infer the result first, and the error is gone:

```ts
type HasType<U, T> = (U extends T ? true : false) extends infer R
	? R extends false
		? false
		: true
	: never;
```

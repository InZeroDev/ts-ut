# ts-ut

A TypeScript utility types library.

## Quick Examples

```ts
import { Param } from "ts-ut";
import { GetDeep } from "ts-ut/dict"; // Or category-specific imports

type Handler = (foo: string, bar: number) => boolean;
type LastParam = Param<Handler, -1>; // number [!code highlight]

type Config = { a: 1; b: { c: 4 } };
type Target = GetDeep<Config, "b.c">; // 4 [!code highlight]
```

## Installation

```npm
npm install -D ts-ut
```

## Docs

Visit: https://ts-ut.vercel.app

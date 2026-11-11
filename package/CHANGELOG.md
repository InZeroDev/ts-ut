# Changelog

## [0.3.0] 2026-11-10

This update focuses on:

- Loosening types: Allowing more flexible inputs.
- separation of concern: Drop support for tuples in dict utils.
- Bug fixes: Fixing various bugs and inconsistencies.

### Removed

- Removed dict keyof utils: `Keyof<T>`, `Valueof<T>`, `EntryOf<T>`, `KeyofDeep<T>`, `KeyofType<T, U>`, `KeyofTypeDeep<T, U>`.
- Removed `As<U, T>` internal utility.

### Added

- Added dict extract utils: `ExtractByValue<T, M>` and `ExtractByExactValue<T, M>`.
- Added dict keyof utils: `Keys<T>`, `Values<T>`, `Entries<T>`, `KeysDeep<T>`, `KeysDeep<T>`, `KeysOfType<T, U>`, `KeysWithType<T, U>`, `KeysWithExactType<T, U>`, `KeysOfTypeDeep<T, U>`, `KeysWithTypeDeep<T, U>`, `KeysWithExactType<T, U>`.
- Added dict merge utils: `MergeUnionDeep<A, B, P>`, `MergeIntDeep<A, B, P>`, `MergePatchDeep<A, B, P>`, `MergeDiffDeep<A, B>`, `MergeSymDiffDeep<A, B>`.
- Added dict `Set<T, K, V>` and `SetDeep<T, K, V>`.
- Added `Range`, `NonNullish<T>`, `Nullish<T>`, `Self<T>` other utils.
- Added `IsNumber<T>` internal utility.

### Changed

- Drop support for tuples in `PrettifyDeep<T>`.
- Loosen up `Known<T>` and drop support for tuples.
- Loosen up existing dict `Merge` utils.
- Rename merge method `"symDiff"` to `"sym-diff"` in `Merge<A, B, M>`.
- Loosen up `RequiredKey<T, K>`, `PartialKey<T, K>`, `ReadonlyKey<T, K>`, `PartialKey<T, K>`.
- Loosen up `LoosePick<T, K>`, `StrictPick<T, K>`, `LooseOmit<T, K>`, `StrictOmit<T, K>`.
- Loosen up dict prefix utils and drop support for prefixing with numbers.
- Loosen up `RenameKey<T, K, N>` and `RenameKeys<T, M>`.
- Loosen up `Get<T, K>` and `GetDeep<T, K, O>` and drop support for tuples, and add `O` template to choose whether to preserve `undefined` if one of the parents is optional..
- Loosen up `Suggest<T>`.

### Fixed

- Loosen up `RequiredDeep<T>`, `PartialDeep<T>`, `ReadonlyDeep<T>`, `MutableDeep<T>` so the recursion doesn't break on unions.
- Fixed `LoosePick<T, K>` and `StrictPick<T, K>` not picking keys when `T` has an index signature.

## [0.2.0] 2026-10-19

### Added

- Expose internal types through `@inzero/ts-ut/_internal`

## [0.1.2] 2026-10-19

### Fixed

- Re-export `Split` and `Join` from the `string` group.

## [0.1.1] 2026-10-19

### Fixed

- Re-export `Split` and `Join` from the `string` group.

## [0.1.0] 2026-10-19

### Added

- Added `Split<T, S>` and `Join<T, S>` string utility types.

## [0.0.1] 2026-10-15

First release.

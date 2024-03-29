# Sudoo-Optional

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-Optional/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-Optional/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Optional/branch/main/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Optional)
[![npm version](https://badge.fury.io/js/%40sudoo%2Foptional.svg)](https://badge.fury.io/js/%40sudoo%2Foptional)
[![downloads](https://img.shields.io/npm/dm/@sudoo/optional.svg)](https://www.npmjs.com/package/@sudoo/optional)

Optional makes life better

## Install

```sh
yarn add @sudoo/optional
yarn add @sudoo/symbol # Peer Dependency
# Or
npm install @sudoo/optional --save
npm install @sudoo/symbol --save # Peer Dependency
```

## Usage

```ts
import { Optional } from "@sudoo/optional";

const foo: Optional = Optional.ofAny("bar");
foo.exists; // true
foo.value; // "bar"

const bar: Optional = Optional.ofUndefinable();
bar.exists; // false
bar.value; // undefined
bar.getOrThrow(); // Throw Error A
bar.getOrThrow(new Error("B")); // Throw Error B
bar.getOrDefault("baz"); // "baz"
```

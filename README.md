# Memoizor

Memoization implementation for `TypeScript`

## Installation

```bash
npm i --save memoizor
```

---

## Usage

### Inline Functions

You can use `memoize` method for inline functions:

```ts
import { memoize } from "memoizor";

const fact = (n: number): number => {
    if (n > 1) {
        return n * fact(n - 1);
    }

    return 1;
};

const memoizedFact = memoize(fact);

console.log(memoizedFact(10));
```

---

### Class Methods

Also you can use it for `class` methods:

```ts
import { memoize } from "memoizor";

class Fact {
    @memoize()
    fact(n: number): number {
        if (n > 1) {
            return n * this.fact(n - 1);
        }

        return 1;
    }
}

let fact = new Fact();

console.log(fact.fact(10));
```

---

### Async Functions

You can memoize async function using an `option` named `type`:

```ts
import { memoize } from "memoizor";

class MyClass {
    @memoize({
        type: "async"
    })
    async myFn(args: any[]): any {
        ...
    }
}

let my = new MyClass();

console.log(await my.myFn(10));
```

---

### Generic Hash Function

You can use your own cache key generator method using an `option` named `hasher`:

```ts
import { memoize } from "memoizor";

class Fact {
    @memoize({
        hasher: (...args: any[]): any => {
            return String(args[0]);
        }
    })
    fact(n: number): number {
        if (n > 1) {
            return n * this.fact(n - 1);
        }

        return 1;
    }
}

let fact = new Fact();

console.log(fact.fact(10));
```

---

## Contributions

-   [KoLiBer](http://github.com/koliberr136a1)

## License

MIT

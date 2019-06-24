import { memoize } from "../src";

class Fac {
    fact(n: number): number {
        if (n > 1) {
            return n * this.fact(n - 1);
        }

        return 1;
    }

    @memoize()
    memoizedFact(n: number): number {
        if (n > 1) {
            return n * this.fact(n - 1);
        }

        return 1;
    }
}

test("memoize(fn, options) function test", () => {
    const fact = (n: number): number => {
        if (n > 1) {
            return n * fact(n - 1);
        }

        return 1;
    };
    const memoizedFact = memoize(fact);
    const deepInlineMemoizedFact = memoize(
        (n: number): number => {
            if (n > 1) {
                return n * deepInlineMemoizedFact(n - 1);
            }

            return 1;
        }
    );
    let begin1, end1, begin2, end2;

    /** Check timing for not memoized factorial function */
    begin1 = Date.now();
    for (let i = 0; i < 1000000; i++) {
        fact(500);
    }
    end1 = Date.now();

    /** Check timing for memoized factorial function */
    begin2 = Date.now();
    for (let i = 0; i < 1000000; i++) {
        deepInlineMemoizedFact(500);
    }
    end2 = Date.now();

    expect(end2 - begin2).toBeLessThan(end1 - begin1);
    expect(fact(10)).toBe(memoizedFact(10));
    expect(fact(10)).toBe(deepInlineMemoizedFact(10));
});

test("memoize(options) decorator test", () => {
    let fac = new Fac();
    let begin1, end1, begin2, end2;

    /** Check timing for not memoized factorial function */
    begin1 = Date.now();
    for (let i = 0; i < 1000000; i++) {
        fac.fact(500);
    }
    end1 = Date.now();

    /** Check timing for memoized factorial function */
    begin2 = Date.now();
    for (let i = 0; i < 1000000; i++) {
        fac.memoizedFact(500);
    }
    end2 = Date.now();

    expect(end2 - begin2).toBeLessThan(end1 - begin1);
    expect(fac.fact(10)).toBe(fac.memoizedFact(10));
});

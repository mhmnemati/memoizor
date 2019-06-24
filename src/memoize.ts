export interface MemoizeOptions {
    type?: "async";
    hasher?: (...args: any[]) => any;
}

/** Overload memoize function */
export function memoize(options?: MemoizeOptions): MethodDecorator;
export function memoize<Fn extends Function>(
    fn: Fn,
    options?: MemoizeOptions
): Fn;

/** Implement memoize function */
export function memoize(
    fn?: Function | MemoizeOptions,
    options?: MemoizeOptions
): any {
    if (typeof fn === "function") {
        return memoizeFunction(fn, undefined, options);
    } else {
        return memoizeDecorator(fn);
    }
}

export default memoize;

/** memoizeDecorator: memoize decorated function */
function memoizeDecorator(options?: MemoizeOptions): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        descriptor.value = memoizeFunction(
            descriptor.value.bind(target),
            target,
            options
        );
        return descriptor;
    };
}

/** memoizeFunction: memoize input function */
function memoizeFunction<Fn extends Function>(
    fn: Fn,
    thisObject?: any,
    options?: MemoizeOptions
): Fn {
    let cache: any = {};

    if (options && options.type === "async") {
        return (async (...args: any[]) => {
            /** Use generic hasher method if exists in options */
            let key = hashKey(args, options);

            if (!cache[key]) {
                cache[key] = await fn.apply(thisObject, args);
            }

            return cache[key];
        }) as any;
    } else {
        return ((...args: any[]) => {
            /** Use generic hasher method if exists in options */
            let key = hashKey(args, options);

            if (!cache[key]) {
                cache[key] = fn.apply(thisObject, args);
            }

            return cache[key];
        }) as any;
    }
}

function hashKey(args: any[], options?: MemoizeOptions): any {
    if (options && options.hasher) {
        return options.hasher(args);
    } else {
        return args.toString();
    }
}

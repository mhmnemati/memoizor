export interface MemoizeOptions {
    type?: "async";
    ttl?: number;
    hasher?: (...args: any[]) => string;
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
            let key = args.toString();

            if (!cache[key]) {
                cache[key] = await fn.apply(thisObject, args);
            }

            return cache[key];
        }) as any;
    } else {
        return ((...args: any[]) => {
            let key = args.toString();

            if (!cache[key]) {
                cache[key] = fn.apply(thisObject, args);
            }

            return cache[key];
        }) as any;
    }
}

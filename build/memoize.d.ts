export interface MemoizeOptions {
    type?: "async";
    hasher?: (...args: any[]) => any;
}
/** Overload memoize function */
export declare function memoize(options?: MemoizeOptions): MethodDecorator;
export declare function memoize<Fn extends Function>(fn: Fn, options?: MemoizeOptions): Fn;
export default memoize;

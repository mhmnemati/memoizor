export interface MemoizeConfig {
}
export declare function memoize(config?: MemoizeConfig): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    value: (...args: any[]) => Promise<any>;
};

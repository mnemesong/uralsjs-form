export declare class Attribute<N extends string, T> {
    private name;
    private val;
    private validFunc;
    constructor(name: N, validFunc: (val: unknown) => T, val?: T | null);
    getName(): N;
    getValidValue(): T;
    getValueOrNull(): T | null;
    setValue(val: T): void;
    setValidFunction(validFunc: (val: unknown) => T): void;
    loadAndValidate(data: unknown): void;
}

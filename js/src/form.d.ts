import { Attribute } from "./attribute";
type Errors = string[];
export declare class Form {
    private attributes;
    private validFunc;
    private printErrFunc;
    constructor(attributes: Attribute<string, unknown>[], validFunc: (attrs: Attribute<string, unknown>[]) => Errors, printErrFunc?: (errs: Errors) => string);
    load(data: undefined): void;
    setValidFunc(func: (attrs: Attribute<string, unknown>[]) => Errors): void;
    getValidFunction(): (attrs: Attribute<string, unknown>[]) => Errors;
    getData(): unknown;
    validate(): Errors;
    validateStrictly(): void;
    withAttribute<N extends string, T>(name: N, validFunc: (val: unknown) => T, val?: T | null): Form;
}
export {};

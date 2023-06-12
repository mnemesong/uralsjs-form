import { Attribute } from "./attribute";
export type Errors = string[];
export type ValidFunc = (attrs: Attribute<string, unknown>[]) => Errors;
export type PrintErrFunc = (errs: Errors) => string;
export declare class Form {
    private attributes;
    private validFunc;
    private printErrFunc;
    constructor(attributes?: Attribute<string, unknown>[], validFunc?: ValidFunc, printErrFunc?: PrintErrFunc);
    load(data: any): void;
    setValidFunc(func: ValidFunc): void;
    setPrintErrFunc(func: PrintErrFunc): void;
    getValidFunction(): ValidFunc;
    getAnyData(): unknown;
    getValidData(): unknown;
    validate(): Errors;
    validateStrictly(): void;
    addAttribute<N extends string, T>(name: N, validFunc: (val: unknown) => T, val?: T | null): void;
}

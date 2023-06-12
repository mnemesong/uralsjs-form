import { Attribute } from "./attribute";

export type Errors = string[];

export type ValidFunc = (attrs: Attribute<string, unknown>[]) => Errors;

export type PrintErrFunc = (errs: Errors) => string;

const defValidFunction = (attrs: Attribute<string, unknown>[]) => [];

const defPrintErrFunc = (errs: Errors) => 'Validation errors: ' + errs.join('. ');

export class Form
{
    private attributes: Attribute<string, unknown>[] = [];
    private validFunc: ValidFunc = defValidFunction;
    private printErrFunc: PrintErrFunc;
    
    public constructor(
        attributes: Attribute<string, unknown>[] = [],
        validFunc: ValidFunc = defValidFunction,
        printErrFunc: PrintErrFunc = defPrintErrFunc
    ) {
        this.attributes = attributes;
        this.validFunc = validFunc;
        this.printErrFunc = printErrFunc;
    }

    public load(data: any): void
    {
        this.attributes.forEach(a => a.loadAndValidate(data));
    }

    public setValidFunc(func: (attrs: Attribute<string, unknown>[]) => Errors): void
    {
        this.validFunc = func;
    }

    public getValidFunction() {
        return this.validFunc;
    }

    public getAnyData(): unknown {
        const data = {};
        this.attributes.forEach(a => data[a.getName()] = a.getValueOrNull());
        return data;
    }

    public getValidData(): unknown {
        const data = {};
        this.attributes.forEach(a => data[a.getName()] = a.getValidValue());
        return data;
    }

    public validate(): Errors {
        return this.validFunc(this.attributes);
    }

    public validateStrictly(): void {
        const errors = this.validate();
        if(errors.length > 0) {
            throw new Error(this.printErrFunc(errors));
        }
    }

    public addAttribute<N extends string, T>(
        name: N, 
        validFunc: (val: unknown) => T,
        val: T|null = null
    ): void {
        this.attributes = this.attributes.concat([
            new Attribute<N, T>(name, validFunc, val)
        ]);
    }
}
import { Attribute } from "./attribute";

type Errors = string[];

export class Form
{
    private attributes: Attribute<string, unknown>[] = [];
    private validFunc: (attrs: Attribute<string, unknown>[]) => Errors;
    private printErrFunc: (errs: Errors) => string;
    
    public constructor(
        attributes: Attribute<string, unknown>[] = [],
        validFunc: (attrs: Attribute<string, unknown>[]) => Errors,
        printErrFunc: (errs: Errors) => string 
            = (errs) => 'Validation errors: ' +errs.join('. ')
    ) {
        this.attributes = attributes;
        this.validFunc = validFunc;
        this.printErrFunc = printErrFunc;
    }

    public load(data: undefined): void
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

    public getData(): unknown {
        const data = this.attributes.forEach(a => data[a.getName()] = a.getValueOrNull());
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

    public withAttribute<N extends string, T>(
        name: N, 
        validFunc: (val: unknown) => T,
        val: T|null = null
    ): Form {
        return new Form(
            this.attributes.concat([
                new Attribute<N, T>(name, validFunc, val)
            ]),
            this.validFunc,
            this.printErrFunc
        )
    }
}
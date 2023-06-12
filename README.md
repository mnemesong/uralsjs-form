# uralsjs-form
Form factory, loader and validator

## Example of usage
```typescript
const loginPassValidFunc = (val) => {
    if ((typeof val === 'string') && val.length > 6) {
        return val;
    }
    throw new Error('Invalid login or password');
};
const form = new Form();
form.addAttribute('login', loginPassValidFunc);
form.addAttribute('pass', loginPassValidFunc);
const data = {
    login: 'asd9ad9jasd',
    pass: '0fkjajasd'
}; //data to load
form.load(data); //In try to load invalid data will throw error
assert.deepStrictEqual(form.getAnyData(), dat) //ok
```

## API
```typescript
/**
 * Class presents attribute in form
 */
export class Attribute<N extends string, T>
{
    public constructor(
        name: N, 
        validFunc: (val: unknown) => T,
        val: T|null = null
    ) {...}   

    public getName(): N {...}

    public getValidValue(): T {...}

    public getValueOrNull(): T|null {...}

    public loadValue(val: T) {...}

    public setValidFunction(validFunc: (val: unknown) => T): void {...}

    public loadAndValidate(data: unknown): void {...}
}

type Errors = string[];

export type ValidFunc = (attrs: Attribute<string, unknown>[]) => Errors;

export type PrintErrFunc = (errs: Errors) => string;

/**
 * Clas presents form
 */
export class Form
{
    public constructor(
        attributes: Attribute<string, unknown>[] = [],
        validFunc: ValidFunc = defValidFunction,
        printErrFunc: PrintErrFunc = defPrintErrFunc
    ) {...}

    public load(data: any): void {...}

    public setValidFunc(
        func: (attrs: Attribute<string, unknown>[]) => Errors
    ): void {...}

    public getValidFunction() {...}

    public getAnyData(): unknown {...}

    public getValidData(): unknown {...}

    public validate(): Errors {...}

    public validateStrictly(): void {...}

    public addAttribute<N extends string, T>(
        name: N, 
        validFunc: (val: unknown) => T,
        val: T|null = null
    ): void {...}

    public getAttribute(
        attr: string
    ): Attribute<typeof attr, unknown>|null{...}

    public getAttributeValOrDef<T>(attr: string, defVal: T): T {...}
}
```

## License
MIT

## Author
Anatoly Starodubtsev
tostar74@mail.ru
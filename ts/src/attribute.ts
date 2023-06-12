export class Attribute<N extends string, T>
{
    private name: N;
    private val: T|null;
    private validFunc: (val: unknown) => T; 

    public constructor(
        name: N, 
        validFunc: (val: unknown) => T,
        val: T|null = null
    ) {
        this.name = name;
        this.validFunc = validFunc;
        this.val = (val === null) ? null : this.validFunc(val);
    }   

    public getName(): N {
        return this.name;
    }

    public getValidValue(): T {
        return this.validFunc(this.val);
    }

    public getValueOrNull(): T|null {
        return this.val;
    }

    public setValue(val: T) {
        this.val = this.validFunc(val);
    }

    public setValidFunction(validFunc: (val: unknown) => T): void {
        this.validFunc = validFunc;
    }

    public loadAndValidate(data: unknown): void
    {
        if(data[this.name]) {
            this.val = this.validFunc(data[this.name]);
        }
    }

}
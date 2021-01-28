class Singleton
{
    constructor(){
        this._foo = 42;
    }

    get foo(){
        return this._foo;
    }

    set foo(value){
        this._foo = value;
    }
}

export const singleton = new Singleton();
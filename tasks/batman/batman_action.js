export class BatmanAction {
    constructor(o/*{B0, C0, C1, M}*/) {
        this.o = o;
    }
}

export class BatmanActionVerySimple {

    constructor(a, time) {
        this._a = a;
        this._time = time;
    }

    get a() {
        return this._a;
    }

    get time() {
        return this._time;
    }
}

export class BatmanActionSimple {
    constructor(B, C, time) {
        this._B = B;
        this._C = C;
        this._time = time;
    }

    get B() {
        return this._B;
    }

    get C() {
        return this._C;
    }

    get time() {
        return this._time;
    }
}
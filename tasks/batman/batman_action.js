export class BatmanAction {
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
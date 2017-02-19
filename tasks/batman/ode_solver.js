export class ODE {

    //y' = f(x, y)
    //---------------------------
    //y1' = f(x, y1, y2)
    //y2' = g(x, y1, y2)
    constructor(...funs) {
        this.funs = funs;
        this._nh = 1000;
        this.n = funs.length;
    }

    set nh(value) {
        this._nh = value;
    }

    solve(x0, x1, ...y0) {
        let ts = new TimeSeries(x0, x1, this._nh);
        let h = ts.h;

        //initial values
        ts.points[0] = Point.create(...y0);

        for (let s = 0; s < ts.length - 1; s++) {
            let y_s = ts.points[s];
            let x_s = ts.x(s);

            let y_tilde_s_plus_1 = new Point(this.n);
            let f_xs_ys = new Point(this.n);
            for (let i = 0; i < this.n; i++) {
                f_xs_ys.vals[i] = this.funs[i](x_s, ...y_s.vals);
                y_tilde_s_plus_1.vals[i] = y_s.vals[i] + h * f_xs_ys.vals[i];
            }

            let y_s_plus_1 = new Point(this.n);
            let x_s_plus_1 = ts.x(s + 1);
            for (let i = 0; i < this.n; i++)
                y_s_plus_1.vals[i] = y_s.vals[i] + h * (f_xs_ys.vals[i] + this.funs[i](x_s_plus_1, ...y_tilde_s_plus_1.vals)) / 2;

            ts.points[s + 1] = y_s_plus_1;
        }

        return ts;
    }
}

export class Point {
    constructor(n) {
        this._vals = new Array(n);
    }

    static create(...vals) {
        let n = vals.length;
        let p = new Point(n);
        for (let i = 0; i < n; i++)
            p._vals[i] = vals[i];
        return p;
    }

    get vals() {
        return this._vals;
    }
}

export class TimeSeries {
    constructor(x0, x1, nh) {
        this.x0 = x0;
        this.x1 = x1;

        //if nh is integer
        if (nh == Math.round(nh)) {
            this.n = nh;
            this._h = (x1 - x0) / nh;
        } else {
            this._h = nh;
            this.n = Math.round((x1 - x0) / nh);
        }

        this._points = new Array(this.n + 1);
    }

    x(i) {
        return this.x0 + i * this.h;
    }

    indexByX(x) {
        //this.x0 + i * this.h == x
        let i = Math.round((x - this.x0) / this.h);
        if (i < 0) i = 0;
        if (i > this.n) i = this.n;

        return i;
    }

    get h() {
        return this._h;
    }

    get points() {
        return this._points;
    }

    get length() {
        return this._points.length; // n + 1
    }
}
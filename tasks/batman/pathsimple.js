import {ODE, TimeSeries, Point} from './ode_solver.js'
import {g, HILL_HEIGHT} from './consts'

/**
 * T = theta
 * dv/dt = -g sin T - C v^2
 * dT/dt = 1/v(B v^2 - g cos T)
 * dx/dt = v cos T
 * dy/dt = v sin T
 *
 * v^2 = -g sinT / C
 * v^2 = g cosT / B
 * B^2 v^4 + C^2 v^4 = g^2
 * v^4 = g^2 / (B^2 + C^2)
 * tgT = -C/B
 */

export class Path {
    constructor({v0, theta0, x0, y0}, {B0, C0, tmax, dt}, actions) {
        let n = Math.round(tmax / dt);
        let t0 = 0;

        this.t_series = new TimeSeries(0, tmax, dt);
        this.actions = actions;

        for (let i = 0; i <= actions.length; i++) {
            let t1 = i == actions.length ? tmax : actions[i].time;
            let ode = this.get_ode(B0, C0, dt);
            let ts = ode.solve(t0, t1, v0, theta0, x0, y0);

            let t0_ind = this.t_series.indexByX(t0);
            let t1_ind = this.t_series.indexByX(t1);

            console.assert(t1_ind - t0_ind + 1 == ts.length);

            //copy from ts to this.t_series
            for (let i = t0_ind; i <= t1_ind; i++)
                this.t_series.points[i] = ts.points[i - t0_ind];

            t0 = t1;
            v0 = this.v(t1_ind);
            theta0 = this.theta(t1_ind);
            x0 = this.x(t1_ind);
            y0 = this.y(t1_ind);

            if (i < actions.length) {
                B0 = actions[i].B;
                C0 = actions[i].C;
            }
        }

        this.landing_time = this._eval_landing_time();
    }

    get_ode(B, C, dt) {
        let dv_dt = (t, v, theta, x, y) => -g * Math.sin(theta) - C * v * v;
        let dtheta_dt = (t, v, theta, x, y) => B * v - g * Math.cos(theta) / v;
        let dx_dt = (t, v, theta, x, y) => v * Math.cos(theta);
        let dy_dt = (t, v, theta, x, y) => v * Math.sin(theta);

        let ode = new ODE(dv_dt, dtheta_dt, dx_dt, dy_dt);
        ode.nh = dt;

        return ode;
    }

    get length() {
        return this.t_series.points.length;
    }

    t(i) {
        return this.t_series.x(i);
    }

    v(i) {
        return this.t_series.points[i].vals[0];
    }

    theta(i) {
        return this.t_series.points[i].vals[1];
    }

    x(i) {
        return this.t_series.points[i].vals[2];
    }

    y(i) {
        return this.t_series.points[i].vals[3];
    }

    indexByTime(time) {
        return this.t_series.indexByX(time);
    }

    _eval_landing_time() {
        for (let i = 0; i < this.length; i++) {
            if (this.y(i) < -HILL_HEIGHT) {
                return this.t(i);
            }
        }
        return 100500;
    }

    result() {
        return {
            landing_time: this.landing_time,
            loops: 1
        }
    }
}
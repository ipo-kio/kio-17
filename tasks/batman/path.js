import {ODE, TimeSeries, Point} from './ode_solver.js'

const g = 9.81;

/**
 * T = theta
 * dv/dt = -g sin T - C v^2
 * dT/dt = 1/v(B v^2 - g cos T)
 * dx/dt = v cos T
 * dy/dt = v sin T
 *
 *
 * or if
 * v1 = sqrt(g / B)
 * t1 = 1 / sqrt(g B)
 * t1 v1 = 1 / B
 *
 * v = v1 u
 * t = t1 tau,  d tau = dt / t1, df/d tau = t1 df/dt
 * xx = B x
 * yy = B y
 *
 * du/d tau = -sin T - A u^2
 * dT/d tau = (u^2 - cos T) / u, where A = C / B
 * dxx/d tau = B t1 dx / dt = B t1 v cos T = B t1 v1 u cos T =  u cos T
 * dyy/d tau = B t1 v sin T = ... = u sin T
 */

export class Path {
    constructor({v0, theta0, B, C, tmax}) {
        //setup ode
        let v1 = Math.sqrt(g / B);
        let t1 = 1 / Math.sqrt(g * B);

        let u0 = v0 / v1;

        let A = C / B;

        let du_dtau = (tau, u, theta, xx, yy) => -Math.sin(theta) - A * u * u;
        let dtheta_dtau = (tau, u, theta, xx, yy) => u - Math.cos(theta) / u;
        let dxx_dtau = (tau, u, theta, xx, yy) => u * Math.cos(theta);
        let dyy_dtau = (tau, u, theta, xx, yy) => u * Math.sin(theta);

        let ode = new ODE(du_dtau, dtheta_dtau, dxx_dtau, dyy_dtau);

        let tau_max = tmax / t1;

        this.t1 = t1;
        this.v1 = v1;
        this.B = B;
        this.tau_series = ode.solve(0, tau_max, u0, theta0, 0, 0);
    }

    get length() {
        return this.tau_series.points.length;
    }

    t(i) {
        return this.tau_series.x(i) * this.t1;
    }

    v(i) {
        return this.tau_series.points[i][0] * this.v1;
    }

    x(i) {
        return this.tau_series.points[i][1] / B;
    }

    y(i) {
        return this.tau_series.points[i][2] / B;
    }

    theta(i) {
        return this.tau_series.points[i][1];
    }

    indexByTime(time) {
        let tau = time / this.t1;
        return this.tau_series.indexByX(tau);
    }
}
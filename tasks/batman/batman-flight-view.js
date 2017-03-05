import {HILL_HEIGHT} from './consts'

export class BatmanFlightView {

    constructor(canvas, kioapi, {canvas_width, canvas_height, x_left, y_top, pixel_size}) {
        this.canvas = canvas;
        canvas.width = canvas_width; //TODO первое слово: Мвурнпу6ысепчиунеупни
        canvas.height = canvas_height;
        this.x_left = x_left;
        this.y_top = y_top;
        this.pixel_size = pixel_size;

        this.kioapi = kioapi;
    }

    redraw(path, time) {
        let ctx = this.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawSky(ctx);
        this.drawGround(ctx);
        this.drawPath(ctx, path);
        this.drawActions(ctx, path);

        let pos = path.indexByTime(time);
        this.drawBatman(ctx, this.local2canvas({
            x: path.x(pos),
            y: path.y(pos)
        }), path.theta(pos));
    }

    drawSky(ctx) {
        ctx.fillStyle = skyGradient(ctx, 0, 0, 0, this.canvas.height);
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGround(ctx) {
        ctx.fillStyle = "#9b512f";
        let {x: zero_x, y: zero_y} = this.local2canvas({x: 0, y: 0});
        let hill_height = this.local_length2canvas(HILL_HEIGHT);
        let a_lot = this.local_length2canvas(1000);
        ctx.fillRect(zero_x - a_lot, zero_y, a_lot, a_lot);
        ctx.fillRect(zero_x, zero_y + hill_height, a_lot, a_lot);
    }

    drawBatman(ctx, {x, y}, phi) {
        let fly1 = this.kioapi.getResource('fly1');
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-phi);
        ctx.drawImage(fly1, -fly1.width / 2, -fly1.height / 2);
        ctx.restore();
    }

    drawPath(ctx, path) {
        ctx.save();

        let {x: zero_x, y: zero_y} = this.local2canvas({x: path.x(0), y: path.y(0)});
        ctx.beginPath();
        ctx.moveTo(zero_x, zero_y);
        let path_n = path.length;
        for (let i = 1; i < path_n; i++) {
            let px = path.x(i);
            let py = path.y(i);
            let {x, y} = this.local2canvas({x: px, y: py});
            ctx.lineTo(x, y);
            if (py < -HILL_HEIGHT)
                break;
        }

        ctx.strokeStyle = "#00fb37";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }

    drawActions(ctx, path) {
        let actions = path.actions;

        ctx.save();
        ctx.fillStyle = '#fffb37';

        for (let action of actions) {
            let time = action.o.next_time;
            let ind = path.indexByTime(time);
            let {x, y} = this.local2canvas({x: path.x(ind), y: path.y(ind)});
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.restore();
    }

    canvas2local({x, y}) {
        return {
            x: this.x_left + this.pixel_size * x,
            y: this.y_top - this.pixel_size * y
        }
    }

    local2canvas({x, y}, round = false) {
        let xx = (x - this.x_left) / this.pixel_size;
        let yy = (this.y_top - y) / this.pixel_size;
        if (round)
            return {x: Math.round(xx), y: Math.round(yy)};
        else
            return {x: xx, y: yy};
    }

    canvas_length2local(length) {
        return length * this.pixel_size;
    }

    local_length2canvas(length, round = false) {
        let result = length / this.pixel_size;
        if (round)
            result = Math.round(result);
        return result;
    }
}

function skyGradient(ctx, x0, y0, x1, y1) {
    let skyGradient = ctx.createLinearGradient(x0, y0, x1, y1);

    skyGradient.addColorStop(0.0000, "rgb(46, 90, 137)");
    skyGradient.addColorStop(0.2478, "rgb(55, 105, 154)");
    skyGradient.addColorStop(0.4958, "rgb(72, 124, 174)");
    skyGradient.addColorStop(0.6296, "rgb(86, 138, 188)");
    skyGradient.addColorStop(0.7522, "rgb(102, 156, 203)");
    skyGradient.addColorStop(0.8774, "rgb(150, 185, 217)");
    skyGradient.addColorStop(1.0000, "rgb(166, 197, 217)");

    return skyGradient;
}
import {BATMAN_SKIP_H, BATMAN_SKIP_W, HILL_HEIGHT} from './consts'

export class BatmanFlightView {

    constructor(canvas, kioapi, {canvas_width, canvas_height, x_left, y_top, pixel_size}) {
        this.canvas = canvas;
        canvas.width = canvas_width; //TODO первое слово: Мвурнпу6ысепчиунеупни
        canvas.height = canvas_height;
        this.x_left = x_left;
        this.y_top = y_top;
        this.pixel_size = pixel_size;

        this.kioapi = kioapi;

        this.fly2 = this.kioapi.getResource('fly2');
        this.fly2w = this.fly2.width;
        this.fly2h = this.fly2.height / 4;

        this.ctx = this.canvas.getContext('2d');
        this.sky_pattern = this.ctx.createPattern(this.kioapi.getResource('bg'), 'repeat-x');
        let grass_img = this.kioapi.getResource('ground');
        this.ground_pattern = this.ctx.createPattern(grass_img, 'repeat');
        this.ground_height = grass_img.height;
        this.roof_img = this.kioapi.getResource('roof');

        $(window).on('resize', () => this.resize());
    }

    redraw(path, time, pose_standing /*boolean*/) {
        this.last_redraw_path = path;
        this.last_redraw_time = time;
        this.last_redraw_pose_standing = pose_standing;

        let pos;
        if (path != null) {
            pos = path.indexByTime(time);
            this.position_camera(path.x(pos), path.y(pos));
        } else
            this.position_camera(0, 0);

        let ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawSky(ctx);
        this.drawGround(ctx);
        if (path != null) {
            this.drawPath(ctx, path);
            this.drawActions(ctx, path);
        }

        if (path != null) {
            let pose = pose_standing ? 4 : path.pose(pos);
            this.drawBatman(ctx, this.local2canvas({
                x: path.x(pos),
                y: path.y(pos)
            }), path.theta(pos), pose);
        } else
            this.drawBatman(ctx, this.local2canvas({x: 0, y: 0}), 0, 4);
    }

    drawSky(ctx) {
        ctx.fillStyle = this.sky_pattern;
        let dx = Math.round(this.x_left / this.pixel_size);
        ctx.save();
        ctx.translate(-dx, 0);
        ctx.fillRect(dx, 0, this.canvas.width, this.canvas.height);
        ctx.restore();
    }

    drawGround(ctx) {
        ctx.fillStyle = this.ground_pattern;
        let {x: zero_x, y: zero_y} = this.local2canvas({x: 0, y: 0}, true);
        let hill_height = this.local_length2canvas(HILL_HEIGHT);
        let a_lot = this.local_length2canvas(1000);

        ctx.drawImage(this.roof_img, zero_x - BATMAN_SKIP_H, zero_y - BATMAN_SKIP_W);

        let dx = Math.round(this.x_left / this.pixel_size);
        ctx.save();
        ctx.translate(-dx, 0);
        ctx.fillRect(dx + zero_x - a_lot, zero_y + hill_height, 2 * a_lot, a_lot);

        ctx.restore();
    }

    drawBatman(ctx, {x, y}, theta, pose) {
        ctx.save();

        if (pose == 4) {
            ctx.translate(Math.round(x), Math.round(y) - this.fly2w / 2 + 2);
            ctx.rotate(-Math.PI / 2);
        } else {
            ctx.translate(x, y);
            ctx.rotate(-theta);
        }

        ctx.drawImage(
            this.fly2,
            0, (pose - 1) * this.fly2h,
            this.fly2w, this.fly2h,
            -this.fly2w / 2, -this.fly2h / 2,
            this.fly2w, this.fly2h
        );

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

        ctx.strokeStyle = "#47fffd";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    drawActions(ctx, path) {
        let actions = path.actions;

        ctx.save();
        ctx.fillStyle = '#fffc00';

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

    resize(preferred_width) {
        this.canvas.width = preferred_width ? preferred_width : $(this.canvas.parentNode).width();
        if (this.last_redraw_path)
            this.redraw(this.last_redraw_path, this.last_redraw_time, this.last_redraw_pose_standing);
    }

    canvas2local({x, y}) {
        return {
            x: this.x_left + this.pixel_size * x,
            y: this.y_top - this.pixel_size * y
        }
    }

    position_camera(local_batman_x, local_batman_y) {
        let w = this.canvas.width * this.pixel_size;
        let h = (this.canvas.height - this.ground_height) * this.pixel_size;
        let x_left = -w / 2 + local_batman_x;
        let y_top = h / 2 /*- 32 * this.pixel_size*/; //grass size/* + local_batman_y */

        let min_gh = BATMAN_SKIP_H * this.pixel_size; //this.roof_img.width * this.pixel_size;
        if (x_left < -min_gh)
            x_left = -min_gh;

        let min_gw = this.ground_height * this.pixel_size;

        //if (y_top + HILL_HEIGHT + min_gw < this.canvas.height * this.pixel_size) //if we allow to go up
        y_top = this.canvas.height * this.pixel_size - HILL_HEIGHT - min_gw;

        this.x_left = x_left;
        this.y_top = y_top;
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
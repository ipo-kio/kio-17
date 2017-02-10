export class BatmanFlightView {
    constructor(canvas, kioapi, x_center, y_center, pixel_size) {
        this.canvas_width = 720;
        this.canvas_height = 600;
        this.x_center = x_center;
        this.y_center = y_center;
        this.pixel_size = pixel_size;

        this.kioapi = kioapi;

        this.canvas = canvas;
        this.canvas.width = this.canvas_width;
        this.canvas.height = this.canvas_height;
    }

    redraw(path, time) {
        let ctx = this.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);

        let img = this.kioapi.get_resource('fly1');

        //draw bg
        //1. draw sky
        // ctx.fillStyle =
    }
}
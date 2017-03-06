export class Slider {
    constructor(outer, min_value, max_value, height, img) {
        this.min_value = min_value;
        this.max_value = max_value;

        this.outer = outer;
        let canvas = document.createElement('canvas');
        let $canvas = $(canvas);
        this.canvas = canvas;
        this.domNode = canvas;
        this.img = img;

        this.canvas.height = height;
        $(window).resize(this.resize.bind(this));

        this.redraw();

        $canvas
            .on('mousedown', this.handleMouseDown.bind(this));

        this.window_move = e => {
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            // get mouse position
            let {x, y} = this.event2point(e);
            // set new thumb & redraw

            this.value = this.position_2_value(x - this.dx);
            this.redraw();
        };

        this.window_up = e => {
            if (e.button == 0)
                this.setup_waiting_mouse_up(false);
        };

        this.value = min_value;
    }

    get value() {
        return this._value;
    }

    set value_no_fire(value) {
        if (value < this.min_value)
            value = this.min_value;
        if (value > this.max_value)
            value = this.max_value;
        if (this._value == value)
            return;
        this._value = value;
        this.redraw();
    }

    set value(value) {
        this.value_no_fire = value;
        if (this.onvaluechange)
            this.onvaluechange({});
    }

    resize(width) {
        this.canvas.width = width ? width : $(this.outer).width();
        this.redraw();
    }

    event2point(e) {
        let rect = this.domNode.getBoundingClientRect();
        return {x: e.clientX - rect.left, y: e.clientY - rect.top};
    }

    redraw() {
        // clear the range control area
        let ctx = this.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // bar
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height / 2);
        ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        ctx.strokeStyle = 'black';
        ctx.stroke();

        //thumb

        let tr = this.thumb_rect;
        ctx.drawImage(this.img, tr.x, tr.y);
    }

    get thumb_rect() {
        let w = this.canvas.width - this.img.width;
        let xx = w * (this.value - this.min_value) / (this.max_value - this.min_value);
        return {
            x: xx,
            y: this.canvas.height / 2 - this.img.height / 2,
            w: this.img.width,
            h: this.img.height
        };
    }

    static point_in_thumb({x, y}, thumb_rect) {
        return x >= thumb_rect.x && x <= thumb_rect.x + thumb_rect.w && y >= thumb_rect.y && y <= thumb_rect.y + thumb_rect.h;
    }

    position_2_value(x) {
        x -= this.img.width / 2;
        let w = this.canvas.width - this.img.width;
        return x * (this.max_value - this.min_value) / w + this.min_value;
        //x = w * (this.value - this.min_value) / (this.max_value - this.min_value);
    }

    setup_waiting_mouse_up(on) {
        if (on)
            $(window)
                .on('mousemove', this.window_move)
                .on('mouseup', this.window_up);
        else
            $(window)
                .off('mousemove', this.window_move)
                .off('mouseup', this.window_up);
    }

    handleMouseDown(e) {
        if (e.button != 0)
            return;

        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // get mouse position
        let {x, y} = this.event2point(e);
        // test for possible start of dragging
        let tr = this.thumb_rect;

        if (Slider.point_in_thumb({x, y}, tr)) {
            this.dx = x - tr.x - this.img.width / 2;
        } else {
            this.value = this.position_2_value(x);
            this.dx = 0;
        }

        this.setup_waiting_mouse_up(true);
    }
}
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
        this.resize();
        $(window).on('resize', this.resize.bind(this));

        this.isDown = false;

        this.redraw();

        $canvas
            .on('mousedown', this.handleMouseDown.bind(this))
            .on('mousemove', this.handleMouseMove.bind(this))
            .on('mouseup', this.handleMouseUpOut.bind(this));
            // .on('mouseout', this.handleMouseUpOut.bind(this));

        this.value = min_value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (value < this.min_value)
            value = this.min_value;
        if (value > this.max_value)
            value = this.max_value;
        if (this._value == value)
            return;
        this._value = value;
        if (this.onvaluechange)
            this.onvaluechange({});
        this.redraw();
    }

    resize() {
        this.canvas.width = $(this.outer).width();
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
        let w = this.canvas.width - this.img.width;
        let xx = w * (this.value - this.min_value) / (this.max_value - this.min_value);

        this.thumb_rect = {
            x: xx,
            y: this.canvas.height / 2 - this.img.height / 2,
            w: this.img.width,
            h: this.img.height
        };

        ctx.drawImage(this.img, this.thumb_rect.x, this.thumb_rect.y);
    }

    handleMouseDown(e) {
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // get mouse position
        let {x, y} = this.event2point(e);
        // test for possible start of dragging
        let tr = this.thumb_rect;

        this.isDown = tr && x > tr.x && x < tr.x + tr.w && y > tr.y && y < tr.y + tr.h;
        this.dx = x - tr.x;
    }

    handleMouseUpOut(e) {
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // stop dragging
        this.isDown = false;
    }

    handleMouseMove(e) {
        if (e.buttons % 2 == 0)
            return;

        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // get mouse position
        let {x, y} = this.event2point(e);
        // set new thumb & redraw

        let w = this.canvas.width - this.img.width;
        this.value = (x - this.dx) * (this.max_value - this.min_value) / w + this.min_value;
        //x - this.dx = w * (this.value - this.min_value) / (this.max_value - this.min_value);
        this.redraw();
    }
}
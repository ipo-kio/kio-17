import './batman.scss'
import {BatmanFlightView} from './batman-flight-view'
import {Path} from './path'
import {BatmanAction} from './batman_action'

export class Batman {

    constructor(settings) {
        this.settings = settings;
    }

    id() {
        return 'batman';
    }

    initialize(domNode, kioapi) {
        this.kioapi = kioapi;
        this.domNode = domNode;

        this.initInterface(domNode);
    }

    preloadManifest() {
        return [
            {id: "fly1", src:"batman-resources/fly1.png"}
        ];
    }

    parameters() {
        function speed_is_ok(speed) {
            return speed < 100 ? 1 : 0;
        }

        return [
            {
                name: "landing_time",
                title: "Приземление за минуту",
                ordering: 'maximize',
                normalize: v => {console.debug('normalizing', v); return v <= 60 ? 1 : 0},
                view(v) {
                    if (v == 0) return "нет"; else return "да"
                }
            },
            /*{
                name: "landing_speed",
                title: "Скорость приземления",
                ordering: 'maximize',
                normalize(v) {
                    return speed_is_ok(v)
                },
                view(v) {
                    let info = '(' + v + 'м/c)';
                    if (speed_is_ok(v))
                        return 'удачно ' + info;
                    else
                        return 'слишком быстро ' + info;
                }
            },*/
            {
                name: "loops",
                title: "Фигур",
                ordering: "maximize"
            },
            {
                name: "landing_time",
                ordering: "minimize",
                title: "Время до приземления",
                view(v) {
                    if (v > 60) return "> 60 сек.";
                    else return v.toFixed(2);
                }
            }
        ];
    }

    solution() {
        return this.current_path.result();
    }

    loadSolution(solution) {
        this.kioapi.submitResult(this.current_path.result());
    }

    //private methods

    initInterface(domNode) {
        this.canvas = document.createElement('canvas');
        domNode.appendChild(this.canvas);
        this.canvas.className = "kio-batman-canvas";

        this.batman_view = new BatmanFlightView(this.canvas, this.kioapi, {
            canvas_width: 720,
            canvas_height: 300,
            x_left: -10,
            y_top: 20,
            pixel_size: 0.1 * 2
        });

        let actions = [
            new BatmanAction(0.12, 0.12 * 2, 0.4),
            new BatmanAction(0.12, 0.12 * 0.04, 6)
        ];

        let pp = new Path({v0: 80, theta0: -Math.PI / 6, x0: 0, y0: 0}, {B0: 0.12, C0: 0.4 * 0.12, tmax: 60, dt: 0.01}, actions);
        this.current_path = pp;

        let time = 0;
        let go = () => {
            requestAnimationFrame(go);

            let newTime = new Date().getTime();
            time += (newTime - prevTime) / 1000;
            prevTime = newTime;

            this.batman_view.redraw(pp, time);
        };
        let prevTime = new Date().getTime();
        requestAnimationFrame(go);
    }
}
//в перескопах увидят войну ...
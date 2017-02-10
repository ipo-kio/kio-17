import './batman.scss'
import {BatmanFlightView} from './batman-flight-view'
import {Path, PositionPath} from './path'

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
                title: "Время до приземления",
                ordering: 'maximize',
                normalize: '',
                view(v) {
                    if (v == 0) return "нет"; else return "да"
                }
            },
            {
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
            },
            {
                name: "loops",
                title: "фигур",
                ordering: "maximize"
            },
            {
                name: "landing_time",
                ordering: "minimize"
            }
        ];
    }

    solution() {

    }

    loadSolution() {

    }

    //private methods

    initInterface(domNode) {
        this.canvas = document.createElement('canvas');
        domNode.appendChild(this.canvas);
        this.batman_view = new BatmanFlightView(this.canvas);

        let pp = new PositionPath(new Path({
            v0: 1,
            theta0: 0,
            B: 1,
            C: 1,
            tmax: 60
        }));


    }
}

//в перескопах увидят войну ...
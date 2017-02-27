import 'file-loader?name=rangeslider.css!./rangeslider.css'
import 'file-loader?name=rangeslider.min.js!./rangeslider.js'

import './batman.scss'
import {BatmanFlightView} from './batman-flight-view'
import {Path} from './path'
import {BatmanAction} from './batman_action'
import {ValuesInput} from './values_input'
import {ListOfElements} from './list_of_elements'

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
            {id: "fly1", src: "batman-resources/fly1.png"}
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
                normalize: v => {
                    return v <= 60 ? 1 : 0
                },
                view(v) {
                    if (v == 0) return "нет"; else return "да"
                }
            },
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
        this.go = () => {
            requestAnimationFrame(this.go);

            let newTime = new Date().getTime();
            this.time += (newTime - this.prevTime) / 1000;
            this.prevTime = newTime;

            this.batman_view.redraw(this.current_path, this.time);
        };

        this.initCanvas(domNode);

        this.initTimeSliderStartAndStop(domNode);

        this.InitParamsSelector(domNode);

        this.initEvalButton(domNode);
    }

    static take_actions_from(elements_list) {
        let actions = [];
        for (let element of elements_list) {
            let val = element.values;
            let action = new BatmanAction(val);
            actions.push(action);
        }

        return actions;
    }

    initCanvas(domNode) {
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
    }

    initTimeSliderStartAndStop(domNode) {
        let $time_controls = $('<div class="kio-batman-time-controls">');

        let $slider = $('<input type="range" min="10" max="1000" step="10" value="300">');
        $time_controls.append($slider);

        let $buttons_container = $('<div class="buttons-container">');

        let playPause = Batman.button('>');
        let toStart = Batman.button('|<');
        $buttons_container.append(toStart, playPause);
        $time_controls.append($buttons_container);

        /*let $span_left = $('<span class="slider-container">');
        let $span_right = $('<span class="buttons-container">');

        $time_controls.append($span_left, $span_right);

        //fill span_right with buttons
        let playPause = Batman.button('>');
        let toStart = Batman.button('|<');
        $span_right.append(toStart, playPause);

        // $slider.change(e => console.debug('slider change', $slider.val()));
        // $slider.on('input', e => console.debug('slider input', $slider.val()));
        $span_left.append($slider);
        */

        domNode.appendChild($time_controls.get(0));

        $slider.rangeslider({
            polyfill: false,

            onSlide(position, value) {
                // console.debug('on slide', position, value);
            },

            onSlideEnd(position, value) {
                // console.debug('on slide end', position, value);
            }
        });
    }

    InitParamsSelector(domNode) {
        this.initial_params = [{
            name: 'v0',
            title: 'v'
        }, {
            name: 'theta0',
            title: 'θ'
        }, {
            name: 'phi0',
            title: 'φ'
        }, {
            name: 'phidt0',
            title: "φ'"
        }];

        this.intermediate_action_params = [{
            name: 'B0',
            title: 'B0'
        }, {
            name: 'C0',
            title: 'C0'
        }, {
            name: 'C1',
            title: 'C1'
        }, {
            name: 'M',
            title: 'M'
        }];

        this.initial_params_values_input = new ValuesInput(
            ...this.initial_params, ...this.intermediate_action_params
        );

        domNode.appendChild(this.initial_params_values_input.domNode);

        this.actions_list_of_elements = new ListOfElements(() => {
            return new ValuesInput({
                name: 't',
                title: 't'
            }, ...this.intermediate_action_params);
        }, []);
        domNode.appendChild(this.actions_list_of_elements.domNode);
    }


    initEvalButton(domNode) {
        let evalButton = Batman.button('Eval');
        $(evalButton).click(e => {
            let actions = Batman.take_actions_from(this.actions_list_of_elements.elements_list);

            this.current_path = new Path({
                ...this.initial_params_values_input.values,
                x0: 0,
                y0: 0
            }, {
                ...this.initial_params_values_input.values,
                tmax: 60,
                dt: 0.01
            }, actions);

            this.moveToTime(0);
        });

        $(evalButton).click();

        domNode.appendChild(evalButton);
    }

    moveToTime(time) {
        this.prevTime = new Date().getTime();
        this.time = time;
        requestAnimationFrame(this.go);
    }

    static button(title) {
        let d = document.createElement('button');

        d.innerText = title;
        d.className = 'kio-base-control-button';

        return d;
    }
}
//в перескопах увидят войну ...
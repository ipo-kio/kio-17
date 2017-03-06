// import 'file-loader?name=rangeslider.css!./rangeslider.css'
// import 'file-loader?name=rangeslider.min.js!./rangeslider.js'

import {Slider} from './slider'
import './batman.scss'
import {BatmanFlightView} from './batman-flight-view'
import {Path} from './path1'
import {BatmanAction} from './batman_action'
import {InitialValuesInput, IntermediateValuesInput} from './values_input'
import {ListOfElements} from './list_of_elements'
import {get_pose} from './consts'

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
        this.kioapi.submitResult(this.current_path.result());
    }

    preloadManifest() {
        return [
            {id: "fly1", src: "batman-resources/fly1.png"},
            {id: "fly2", src: "batman-resources/fly2.png"}
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
                    if (!v) v = 0;
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
        this.animation_paused = true;

        this.go = () => {
            let newTime = new Date().getTime();
            this.time += (newTime - this.prevTime) / 1000;
            this.prevTime = newTime;

            this.time = Math.min(this.current_path.efficient_max_time, this.time);
            if (this.time == this.current_path.efficient_max_time)
                this.setAnimationPause(true);

            this.batman_view.redraw(this.current_path, this.time);

            this.time_input.value_no_fire = this.time;
            this.$time_info.text(this.time.toFixed(1) + ' с');

            if (!this.animation_paused)
                requestAnimationFrame(this.go);
        };

        this.initCanvas(domNode);

        this.initTimeSliderStartAndStop(domNode);

        this.initParamsSelector(domNode);

        this.time_input.resize();
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

        //let $slider_container = $('<div class="range-container">');
        // let $slider = $('<input type="range" min="0" max="60" step="0.1" value="0">');
        // $slider_container.append($slider);
        // $time_controls.append($slider_container);

        let slider = new Slider($time_controls.get(0), 0, 60, 20, this.kioapi.getResource('fly1'));
        $time_controls.append(slider.domNode);

        let $buttons_and_time_container = $('<div class="buttons-and-time-container">');
        let $buttons_container = $('<div class="buttons-container">');

        let $time_info = $('<span class="time-info">...</span>');
        let playPause = Batman.button('>');
        let toStart = Batman.button('|<');
        $buttons_and_time_container.append($buttons_container, $time_info);
        $buttons_container.append(toStart, playPause);
        $time_controls.append($buttons_and_time_container);

        domNode.appendChild($time_controls.get(0));

        this.playPause = playPause;

        let batman = this;

        // $slider.rangeslider({polyfill: false});

        $(playPause).click(e => this.setAnimationPause(!this.animation_paused));

        $(toStart).click(e => this.moveToTime(0));

        this.time_input = slider;
        slider.onvaluechange = e => {
            this.moveToTime(slider.value);
        };

        this.$time_info = $time_info;
    }

    setAnimationPause(value) {
        if (this.animation_paused == value)
            return;

        this.animation_paused = value;
        if (!this.animation_paused) {
            this.prevTime = new Date().getTime();
            requestAnimationFrame(this.go);
        }
        this.playPause.innerText = this.animation_paused ? '>' : '||';
    }

    initParamsSelector(domNode) {
        this.initial_params_values_input = new InitialValuesInput();
        this.initial_params_values_input.values = {
            'initial_theta': 0,
            'initial_v': 20,
            'initial_pos': 1
        };
        this.initial_params_values_input.change_handler = this.userChangedInput.bind(this);

        domNode.appendChild(this.initial_params_values_input.domNode);

        this.actions_list_of_elements = new ListOfElements(() => {
            let ivi = new IntermediateValuesInput();
            ivi.change_handler = this.userChangedInput.bind(this);
            return ivi;
        }, []);
        domNode.appendChild(this.actions_list_of_elements.domNode);

        this.userChangedInput();
    }

    userChangedInput() {
        let actions = Batman.take_actions_from(this.actions_list_of_elements.elements_list);
        let initial_params = this.initial_params_values_input.values;

        this.current_path = new Path({
                v0: initial_params.initial_v,
                theta0: initial_params.initial_theta,
                x0: 0,
                y0: 0
            }, {
                pose0: initial_params.initial_pose,
                tmax: 60,
                dt: 0.01
            },
            actions
        );

        this.moveToTime(0);
        this.kioapi.submitResult(this.current_path.result());
    }

    moveToTime(time) {
        this.prevTime = new Date().getTime();
        this.time = Math.min(time, this.current_path.landing_time);
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
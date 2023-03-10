import {Slider} from './slider'
import './batman.scss'
import {BatmanFlightView} from './batman-flight-view'
import {Path} from './path1'
import {BatmanAction} from './batman_action'
import {InitialValuesInput, IntermediateValuesInput} from './values_input'
import {ListOfElements} from './list_of_elements'
import {delta_t, PIXEL_SIZE} from './consts'

export class Batman {

    constructor(settings) {
        this.settings = settings;
    }

    id() {
        return 'batman';
    }

    initialize(domNode, kioapi, preferred_width) {
        this.kioapi = kioapi;
        this.domNode = domNode;

        this.initInterface(domNode, preferred_width);
        this.kioapi.submitResult(this.current_path.result());
    }

    preloadManifest() {
        return [
            {id: "fly1", src: "batman-resources/fly1.png"},
            {id: "fly1-hover", src: "batman-resources/fly1_hover.png"},
            {id: "fly2", src: "batman-resources/fly2.png"},
            {id: "ground", src: "batman-resources/ground.png"},
            {id: "roof", src: "batman-resources/roof.png"},
            {id: "bg", src: "batman-resources/bg.png"},
            {id: "target", src: "batman-resources/target.png"}
        ];
    }

    parameters() {
        let is_fail = loops => loops < 0 || loops > 1000;

        let params = [];

        params.push({
            name: "landing_time",
            title: "Приземление за минуту",
            ordering: 'maximize',
            normalize: v => {
                return v <= 60 ? 1 : 0;
            },
            view(v) {
                if (v > 60) return "нет"; else return "да"
            }
        }, {
            name: "smooth_landing",
            title: "Мягкая посадка",
            ordering: 'maximize',
            view: v => {
                if (v === 1) return "да"; else return "нет";
            }
        }, {
            name: "loops",
            title: "Фигур",
            ordering: "maximize",
            normalize(v) {
                if (is_fail(v))
                    return -1;
                else
                    return v;
            },
            view(v) {
                if (is_fail(v))
                    return "слишком много";
                else
                    return "" + v;
            }
        });
        if (this.settings.count_windows)
            params.push({
                name: "windows",
                title: "Задето окон",
                ordering: 'maximize'
            });
        params.push(
            {
                name: "landing_time",
                ordering: "minimize",
                title: "Время до приземления",
                view(v) {
                    if (!v) v = 0;
                    if (v > 60) return "> 60 сек.";
                    else return (+v).toFixed(2);
                }
            }
        );

        return params;
    }

    solution() {
        if (this.current_path === null)
            return null;

        let {v0, theta0, pose0} = this.current_path.solution;
        let actions = this.current_path.actions;

        let a = [];
        for (let action of actions)
            a.push({t: action.o.next_time, p: action.o.next_pose});

        return {v0, t0: theta0, p0: pose0, a}
    }

    loadSolution(solution) {
        if (!solution)
            return;

        this.initial_params_values_input.values = {
            'initial_theta': Math.round(solution.t0 * 180 / Math.PI),
            'initial_v': solution.v0,
            'initial_pose': solution.p0
        };

        this.actions_list_of_elements.add_remove_extra_action_suspend = true;
        this.actions_list_of_elements.clear_elements();
        for (let action of solution.a) {
            let ivi = this.createIntermediateValues();
            ivi.values = {next_time: action.t, next_pose: action.p};
            this.actions_list_of_elements.add_element(ivi);
        }
        this.actions_list_of_elements.add_remove_extra_action_suspend = false;

        this.userChangedInput();
    }

    //private methods

    initInterface(domNode, preferred_width) {
        this.animation_paused = true;
        this.time = 0;

        this.go = () => {
            this.last_raf_id = null;

            let newTime = new Date().getTime();

            if (!this.animation_just_started) {
                let delta_time = newTime - this.prevTime;

                if (delta_time < 0.05) { //20fps
                    this.last_raf_id = requestAnimationFrame(this.go);
                    return;
                }

                this.time += delta_time / 1000;

                this.time = Math.min(this.current_path_efficient_max_time(), this.time);
                if (this.time === this.current_path_efficient_max_time())
                    this.setAnimationPause(true);
            }
            this.animation_just_started = false;
            this.prevTime = newTime;

            let should_stand = this.time === 0 || this.time === this.current_path_landing_time() && this.current_path_smooth_landing();
            this.batman_view.redraw(this.current_path, this.time, should_stand);

            this.time_input.value_no_fire = this.time;
            this.$time_info.text(this.time.toFixed(1) + ' с');

            if (!this.animation_paused)
                this.last_raf_id = requestAnimationFrame(this.go); //TODO make this line a method
        };

        this.initWindows();

        this.initCanvas(domNode);

        this.initTimeSliderStartAndStop(domNode);

        this.initParamsSelector(domNode);

        this.full_resize(preferred_width);
    }

    current_path_efficient_max_time() {
        if (this.current_path === null)
            return 0;
        else
            return this.current_path.efficient_max_time;
    }

    current_path_landing_time() {
        if (this.current_path === null)
            return 100500;
        else
            return this.current_path.landing_time;
    }

    current_path_smooth_landing() {
        if (this.current_path === null)
            return 0;
        else
            return this.current_path.smooth_landing();
    }

    static take_actions_from(elements_list) {
        let actions = [];
        for (let element of elements_list) {
            let val = element.values;
            if (val === null)
                return null;
            let action = new BatmanAction(val);
            actions.push(action);
        }

        return actions;
    }

    initWindows() {
        function i(x, y) {
            return {
                x: (x - 2) * PIXEL_SIZE,
                y: (140 - 64 - y) * PIXEL_SIZE,
                w: 29 * PIXEL_SIZE,
                h: 8 * PIXEL_SIZE
            };
        }

        if (this.settings.count_windows)
            this.windows = [
                i(50, 128),
                i(71, 161),
                i(121, 155),
                i(136, 189),
                i(192, 192),
                i(265, 200)
            ];
        else
            this.windows = [];

        /*
        this.windows = [{
            x: 94 * PIXEL_SIZE,
            y: -64 * PIXEL_SIZE,
            w: 29 * PIXEL_SIZE,
            h: 8 * PIXEL_SIZE
        }];
        */
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
            pixel_size: PIXEL_SIZE
        }, this.windows);
    }

    initTimeSliderStartAndStop(domNode) {
        let $time_controls = $('<div class="kio-batman-time-controls">');

        //let $slider_container = $('<div class="range-container">');
        // let $slider = $('<input type="range" min="0" max="60" step="0.1" value="0">');
        // $slider_container.append($slider);
        // $time_controls.append($slider_container);

        let slider = new Slider($time_controls.get(0), 0, 60, 35/*fly1 height*/, this.kioapi.getResource('fly1'), this.kioapi.getResource('fly1-hover'));
        $time_controls.append(slider.domNode);

        let $buttons_and_time_container = $('<div class="buttons-and-time-container">');
        let $buttons_container = $('<div class="buttons-container">');

        let $time_info = $('<span class="time-info">...</span>');
        let playPause = Batman.button('►');
        let toStart = Batman.button('⏪');
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
        if (this.animation_paused === value)
            return;

        this.animation_paused = value;
        if (!this.animation_paused)
            this.startAnimation();
        this.playPause.innerText = this.animation_paused ? '►' : '▮▮';
    }

    initParamsSelector(domNode) {
        this.initial_params_values_input = new InitialValuesInput(this.settings.rounding);
        this.initial_params_values_input.values = {
            'initial_theta': 0,
            'initial_v': 10,
            'initial_pose': 1
        };
        this.initial_params_values_input.change_handler = this.userChangedInput.bind(this);

        domNode.appendChild(this.initial_params_values_input.domNode);

        this.actions_list_of_elements = new ListOfElements(() => this.createIntermediateValues(), [], 'добавить действие', 'удалить действие');
        this.actions_list_of_elements.add_remove_extra_action = () => {
            this.full_resize();
            this.userChangedInput();
        };
        domNode.appendChild(this.actions_list_of_elements.domNode);

        this.userChangedInput();
    }

    createIntermediateValues() {
        let ivi = new IntermediateValuesInput(this.settings.rounding);
        ivi.change_handler = this.userChangedInput.bind(this);
        return ivi;
    }

    full_resize(preferred_width) {
        // if (preferred_width) //TODO get rid of console.log
        //     console.log('resizing to ', preferred_width);
        this.batman_view.resize(preferred_width);
        this.time_input.resize(preferred_width);
    }

    userChangedInput() {
        let actions = Batman.take_actions_from(this.actions_list_of_elements.elements_list);
        let initial_params = this.initial_params_values_input.values;

        if (initial_params === null || actions === null) {
            this.setup_empty_path();
            return;
        }

        let theta0 = initial_params.initial_theta * Math.PI / 180;
        if (theta0 > Math.PI / 3)
            theta0 = Math.PI / 3;
        if (theta0 < -Math.PI / 3)
            theta0 = -Math.PI / 3;

        let v0 = initial_params.initial_v;
        if (v0 < 1) v0 = 1;
        if (v0 > 20) v0 = 20;

        this.current_path = new Path({
                v0,
                theta0,
                x0: 0,
                y0: 0
            }, {
                pose0: initial_params.initial_pose,
                tmax: 60,
                dt: delta_t
            },
            actions,
            this.windows
        );
        this.current_path._eval_windows();

        this.time_input.visible_max_value = this.current_path_landing_time();

        this.moveToTime(0);
        this.kioapi.submitResult(this.current_path.result());
    }

    setup_empty_path() {
        this.current_path = null;
        this.kioapi.submitResult({
            landing_time: 100500,
            smooth_landing: 0,
            loops: 0,
            windows: 0
        });
        this.time_input.visible_max_value = 0;
        this.moveToTime(0);
    }

    moveToTime(time) {
        this.time = Math.min(time, this.current_path_landing_time());
        this.startAnimation();
    }

    startAnimation() {
        this.animation_just_started = true;
        if (!this.last_raf_id)
            this.last_raf_id = requestAnimationFrame(this.go);
    }

    static button(title) {
        let d = document.createElement('button');

        d.innerText = title;
        d.className = 'kio-base-control-button';

        return d;
    }
}
//в перескопах увидят войну ...

//TODO добавить отсчеты на слайдер
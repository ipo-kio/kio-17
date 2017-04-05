var task_fmt_second =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 9:
/* exports provided: TaskFmtSecond */
/* all exports used */
/*!****************************************!*\
  !*** ./src/task_scheme/task_scheme.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["TaskFmtSecond"] = TaskFmtSecond;
/**
 * Задача. Процесс "3x+1" устроен так. Он начинается с натурального числа, если оно четное, его надо поделить на два.
 * Если нечетное, то x -> 3x + 1. Для всех чисел от 1 до 999 этот процесс рано или поздно приводит к 1.
 * Нужно придумать начальное число от 1 до 999 так, чтобы количество шагов было как можно больше, при этом, чтобы
 * максимальное число, полученное в процессе, было как можно меньше. Т.е. участник вводит одно число, а программа
 * считает два параметра. Количество шагов перед приходом к единице и максимальное число, которое при этом получается.
 * Первый параметр должен быть как можно больше, второй — как можно меньше.
 */

/**
 * создаем класс TaskFmtSecond, конструктор может быть пустым, инициализация происходит позже
 * @param settings произвольный объект настроек "манпулятора", в первую очередь, из этого объекта нужно брать
 * информацию об уровне. Можно реализовать это прямолинейно так, что settings = {level : 2}
 * @constructor
 */
function TaskFmtSecond(settings) {
    this.settings = settings;
    this.fmt = qwerty00006.magic();
}

//следующие функции требуется реализовать, это как будто реализация интерфейса

/**
 * строковый идентификатор задачи. В данный момент используется только для того, чтобы сформировать
 * ключ для localStorage для хранения автоматически сохраненных решений.
 */
TaskFmtSecond.prototype.id = function () {
    return "TaskFmtSecond";
};

TaskFmtSecond.prototype.initCounter=0;

/**
 * Функция инициализации, в этой функции можно создавать интерфейс задачи и уже можно пользоваться KioApi
 * @param domNode dom-узел, который нужно наполнять содержимым задачи
 * @param kioapi ссылка на api для совершения всех действий с задачей
 */
TaskFmtSecond.prototype.initialize = function (domNode, kioapi, preferredWidth) {
    //сохраняем данные для будущего использования
    this.kioapi = kioapi;
    TaskFmtSecond.prototype.initCounter++;
    $(domNode).attr('id', 'fmtId'+TaskFmtSecond.prototype.initCounter);
    this.fmt.init(kioapi, 'fmtId'+TaskFmtSecond.prototype.initCounter, preferredWidth, JSON.parse('{"input":"рок", "alphabet":"рок", "outalphabet":"рок-#", "outfsm":true, "height":500, "vertexsize":25}'));

    //settings могут иметь произвольные данные для инициализации, например, уровень
    console.log('problem level is', this.settings.level);

    //инициализируем интерфейс
    //инициализируем содержимое задачи в элементе domNode,
    //initInterface - это наш собственный приватный метод
    var $domNode = $(this.domNode);
    // this.initInterface($domNode);
};

/**
 * Будем считать, что во всех задачах сравнение решений участников происходит с помощью сравнения значений нескольких параметров.
 * Например, в задаче про 3x + 1 сначала будем сравнивать количество шагов, которые приводят к единице, и будем требовать,
 * чтобы количество шагов было как можно больше. Если количество шагов одинаковое, то смотрим на максимальное число,
 * котороке получается при выполнении шагов. Оно должно быть как можно меньше. Соответственно, есть только два параметра
 * для сравнения:
 */
TaskFmtSecond.prototype.parameters = function () {
    return [{
        name: "correct", //название параметра
        title: "Количество верных ответов", //отображение названия для пользователя
        ordering: 'maximize', // 'maximize' - надо как можно больше, 'minimize' - как можно меньше
        view: "%" // отображение значения параметра пользователю. Можно не указывать.
        // Если задана строка, как в этом примере, она означает постфикс, т.е. если значение
        // параметра равно, например, 42, пользователь увидит 42ш.
        // Либо это может быть функция от одного аргумента, значения параметра, она
        // должна возвращать строку для отображения пользователю
    }, {
        name: "elements",
        title: "Количество элементов",
        ordering: 'minimize',
        view: function view(val) {
            return '[' + val + ']';
        }
    }];
};

/**
 * Возвращает текущее решение в виде объекта, он будет сериализован с помощью JSON.stringify для хранения и передачи по сети
 */
TaskFmtSecond.prototype.solution = function () {
    return this.fmt.solution();
};

/**
 * Загрузка решения в задачу. При загрузке решения нужно обновить данные через kioapi.submitResult,
 * в этой примере это делается в обработчике события change()
 * @param solution решение для загрузки
 */
TaskFmtSecond.prototype.loadSolution = function (solution) {
    if (!solution) return;
    this.fmt.load(solution);
};

//далее идут приватные методы

        /**
         *
         * config{
 *   "vertexsize": 5,
 *   "height": 500,
 *   "alphabet": abc,
 *   "input": "aaabbbccc"
 *  }
         *
         *
         * solution{
 *  "input": "aaabbbccc",
 *   states:[
 *    {id: "v1", x: 0, y: 0, start: true, finish: false},
 *    {id: "v2", x: 10, y: 10, start: false, finish: false}
 *   ],
 *   transitions:[
 *    {id: "e1", from: v1, to: v2, symbol: a}
 *   ]
 * }
         *
         *
         * @constructor
         */
        var qwerty00006 = (function () {

            /**
             * @constructor
             */
            function Fsm() {

                this.gui = {
                    stage: {},

                    width: 0,

                    height: 0,

                    vertexMargin: 5,

                    vertexSize: 10,

                    vertexColor: "#5bc0de",

                    vertexColorCurrent: "#f0ad4e",

                    vertexColorDark: "#1b6d85",

                    vertexStrokeColor: "#46b8da",

                    vertexStrokeColorDark: "#000",

                    vertexBorderColor: "#bbbbbb",

                    edgeColor: "#ababab",

                    edgeColorSelected: "#f0ad4e",

                    edgeUnderColor: "#ffffff"

                };

                this.player = {
                    /**
                     * 0 - stop
                     * 1 - play
                     * 2 - pause
                     */
                    state: 0,
                    /**
                     * millisecond
                     */
                    delay: 250,
                    /**
                     * animation is executed
                     */
                    animated: false,

                    /**
                     * have to stop after animation
                     */
                    waitStop: false,

                    /**
                     * Executed steps
                     */
                    steps: 0

                };

                /**
                 * Id of main div
                 * @type {string}
                 */
                this.divId = "";

                /**
                 * initial task config
                 * @type {{}}
                 */
                this.config = {};

                this.states = [];

                this.transitions = [];

                /**
                 * vertex toolbox
                 * @type {{}}
                 */
                this.base = {};

                /**
                 * vertex toolbox
                 * @type {{}}
                 */
                this.baseFinal = {};

                this.firstState = {};

                this.input="";

                this.editInput = false;

                this.pos = 0;

                this.currentState = {};
                
                this.empty = "#";

              this.test=[];

              this.testt=[
                "хх",
                "хо-хо",
                "хо-хох",
                "хохх",
                "ххох",
                "хо-кхох",
                "хо-ррох",
                "хор-кох",
                "хор-ко",
                "хо-рро",
                "хо-кхо",
                "о-о",
                "хо-хо-хо",
                "ох-хо",
                "о-хо-хо",
                "хох",
                "о-ххох",
                "о-ххохх",
                "хххо-хо",
                "хо-о-хо",
                "ххо-хо",
                "ххо-ххо",
                "ор-ко",
                "о-кхо",
                "о-рро",
                "о-ор-ко",
                "о-о-кхо",
                "о-о-рро",
                "о-кхо-хо",
                "ор-ко-хо",
                "о-рро-хо",
                "хо-хо-ххо",
                "хор-ко-хо",
                "хо-кхо-хо",
                "хо-рро-хо",
                "ххо-хох",
                "ххор-ко",
                "ххо-кхо",
                "ххо-рро",
                "ор-кох",
                "о-ррох",
                "о-кхох"
              ];


            }

            //noinspection all
            Fsm.prototype.layout = '<style>#divId .it-task{background-image:url(/assets/stylesheets/../../~plugin/KioOnline/fmt2.png);background-size:100% 100%}#divId .it-input-input,#divId .it-input-output,#divId .it-input-view,#divId .it-log{font-family:monospace}#divId .it-scene{background-color:#fff;border:1px solid #a9a9a9}#divId .top-buffer{margin-top:20px}#divId .bottom-buffer{margin-bottom:20px}#divId .it-player-holder{text-align:center}#divId .it-player-holder .it-player{display:inline-block;padding:5px}#divId .it-trans-selector,#divId .it-warn{position:absolute;z-index:100;top:-60px;display:none}#divId .it-speed{display:inline-block;float:right}#divId .it-speed .it-slider{border-radius:5px;width:100px;height:10px;margin-right:5px;margin-left:5px;display:inline-block}#divId .it-speed .it-thumb{width:10px;height:20px;border-radius:3px;position:relative;left:50px;top:-5px;cursor:pointer}#divId .it-log{max-width:500px;overflow-y:scroll;background-color:#fff;padding:10px;border:1px solid #a9a9a9}#divId .it-log .it-log-strip{letter-spacing:2px;padding-left:10px}#divId .it-log .it-log-cmd{text-align:right}</style><div class="it-task well"><div class="row"><h4>Входная строка <button class="it-input-change btn btn-sm btn-link" type="button" title="Изменить входную строку"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></h4><div class="col-sm-12"><div class="it-input"><div class="it-input-warn it-warn alert alert-danger alert-dismissable">Только символы алфавита</div><div class="it-input-view"></div><div class="it-input-edit input-group"><input class="it-input-input form-control" type="text" class="form-control"> <span class="input-group-btn"><button class="btn btn-default it-input-apply" type="button">Принять</button></span></div></div></div></div><div class="row top-buffer"><div class="col-sm-12"><div class="it-trans-selector"><button class="btn btn-default btn-sm" type="button">a</button> <button class="btn btn-default btn-sm" type="button">b</button> <button class="btn btn-default btn-sm" type="button">c</button></div><canvas class="it-scene"></canvas></div></div><div class="row bottom-buffer"><h4>Выходная строка</h4><div class="col-sm-12"><input class="it-output-input form-control" type="text" class="form-control" disabled="true"></div></div><div class="row it-player-holder"><div class="col-sm-12"><div class="it-player-warn it-warn alert alert-danger alert-dismissable">Нет подходящего перехода</div><div class="it-player-info it-warn alert alert-info alert-dismissable">Остановка автомата, нет подходящего перехода</div><div class="it-player"><button class="it-stop" type="button" class="btn btn-default" title="Перевести автомет в начальное состояние и очистить журнал выполнения"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button> <button class="it-step" type="button" class="btn btn-default" title="Выполнить шаг"><span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span></button> <button class="it-play" type="button" class="btn btn-default" title="Запустить анимацию"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> <button class="it-pause" type="button" class="btn btn-default" title="Пауза"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></button></div><div class="it-speed"><label>скорость:</label><div class="it-slider bg-info"><div class="it-thumb bg-primary"></div></div></div></div></div><div class="row"><h4>Журнал выполнения: <span class="it-log-counter"></span> <button class="it-log-expand btn btn-sm btn-link" type="button" title="Развернуть"><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span></button> <button class="it-log-small btn btn-sm btn-link" type="button" title="Свернуть"><span class="glyphicon glyphicon-resize-small" aria-hidden="true"></span></button></h4><div class="col-lg-12"><div class="it-log"></div></div></div></div>';//###layout

          Fsm.prototype.pushAndReplace = function(input){
            debugger;
            if(input.indexOf("х")>=0){
              var index = input.indexOf("х");
              this.pushAndReplace(input.substr(0,index)+"р"+input.substr(index+1));
              this.pushAndReplace(input.substr(0,index)+"к"+input.substr(index+1));
            }else{
              this.test.push(input);
            }

          };

            Fsm.prototype.init = function (kio, divId, taskWidth, config) {
                this.divId = divId;
                this.config = config;
                this.input = config.input;
                this.kio=kio;

                //#!

              for (var i = 0; i < this.testt.length; i++) {
                var temp = this.testt[i];
                this.pushAndReplace(temp);

              }

                $("#" + divId).html(this.layout.replace(new RegExp("#divId", 'g'), "#" + divId));
                var $scene = $("#" + divId + " .it-scene");
                $scene.attr("id", divId + "-it-scene");
                $scene.attr("width", taskWidth - 40);
                var $task = $("#" + divId + " .it-task");
                $task.css("max-width", taskWidth + "px");
                $task.css("min-width", taskWidth + "px");

                this.gui.width = taskWidth - 40;
                this.gui.height = config.height;
                this.gui.vertexSize = config.vertexsize;
                this.gui.vertexMargin = Math.max(this.gui.vertexMargin, this.gui.vertexSize / 2);

                $scene.attr("height", (config.height + config.vertexsize + this.gui.vertexMargin * 2) + "px");

                this.gui.stage = new createjs.Stage(divId + "-it-scene");
                this.gui.stage.mouseMoveOutside = true;

                this.gui.bg = new createjs.Shape();
                this.gui.bg.graphics.beginFill("white");
                this.gui.bg.graphics.drawRect(0, 0, this.gui.width, this.gui.height);
                this.gui.stage.addChild(this.gui.bg);


                var delimiter = new createjs.Shape();
                delimiter.y = config.height;
                delimiter.graphics.setStrokeStyle(2);
                delimiter.graphics.beginStroke("darkgray");
                delimiter.graphics.moveTo(0, 0);
                delimiter.graphics.lineTo(this.gui.width, 0);
                this.gui.stage.addChild(delimiter);

                this.base = new Base(this, this.gui, this.gui.vertexMargin, this.gui.height + this.gui.vertexMargin, false);
                if(!this.config.outfsm) {
                    this.baseFinal = new Base(this, this.gui, this.gui.vertexMargin * 2 + this.gui.vertexSize, this.gui.height + this.gui.vertexMargin, true);
                    $("#" + divId + " .it-output-input").parent().parent().hide();
                }

                this.gui.stage.enableMouseOver(10);
                this.gui.stage.update();
                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", this.gui.stage);

                var graph = this;
                this.gui.bg.on('mousedown', function (e) {
                    graph.deselectAllVertexes();
                    var $selector = $("#" + graph.divId + " .it-trans-selector");
                    $selector.hide();
                });

                this.firstState = new State(this.gui.width/10, this.gui.height/2, false, this.gui, this, null);
                this.firstState.updateLabel("S0");
                this.firstState.id = "v0";
                this.states.push(this.firstState);
                this.gui.stage.addChild(this.firstState.view);

                this.initInputEdit();
                this.initSpeed();
                this.initPlayer();

                this.currentState = this.firstState;
                this.currentState.update(true);

                this.logger = new Logger(divId, " ");

              this.load(JSON.parse('{"states":[{"id":"v0","x":0.1,"y":0.5,"final":false,"label":"S0","first":true},{"id":"v1","x":0.21894170211696556,"y":0.2505181916899227,"final":false,"label":"S1","first":false},{"id":"v2","x":0.33734658671115997,"y":0.23719349488475472,"final":false,"label":"S2","first":false},{"id":"v3","x":0.45575147130535437,"y":0.17057001085891496,"final":false,"label":"S3","first":false},{"id":"v4","x":0.6478801519676319,"y":0.14725179144987094,"final":false,"label":"S4","first":false},{"id":"v5","x":0.6087841995072849,"y":0.5036874309881137,"final":false,"label":"S5","first":false},{"id":"v6","x":0.7975617985301042,"y":0.08395948162532318,"final":false,"label":"S6","first":false},{"id":"v7","x":0.7975617985301042,"y":0.5036874309881139,"final":false,"label":"S7","first":false}],"transitions":[{"from":"v0","to":"v1","label":"к","outlabel":"к"},{"from":"v1","to":"v2","label":"о","outlabel":"о"},{"from":"v2","to":"v3","label":"#","outlabel":"-"},{"from":"v3","to":"v4","label":"к","outlabel":"к"},{"from":"v3","to":"v5","label":"о","outlabel":"о"},{"from":"v4","to":"v6","label":"о","outlabel":"о"},{"from":"v5","to":"v7","label":"к","outlabel":"к"}],"input":"коко"}'));

            };

          Fsm.prototype.submitResult=function(){
            if(this.loading){
              return;
            }
            
            var rights = 0;

            for (var i = 0; i < this.test.length; i++) {
              var test = this.test[i];
              var input = test.replace(new RegExp("-", 'g'), "");
              if(this.calc(input)==test){
                rights++;
              }
            }

            debugger;
            this.kio.submitResult({
              correct: Math.round((rights/this.test.length)*100*10000000)/10000000,
              elements:  this.states.length
            });
          };

          Fsm.prototype.calc = function(input){
            var curState = this.firstState;
            var out = "";
            while(input.length>0){
              var transitions = this.getTransitions(curState);
              var done = false;
              for (var i = 0; i < transitions.length; i++) {
                var transition = transitions[i];
                if (transition.label == input[0] || transition.label==this.empty) {
                  done=true;
                  curState = transition.v2;
                  if(this.empty!=transition.outlabel){
                    out+=transition.outlabel;
                  }
                }
              }
              if(!done){
                return "-";
              }
              if(transition.label!=this.empty) {
                input = input.substr(1);
              }
            }
            return out;
          };

            /**
             * Executes step if possible, if no, return to pause state
             * If no command has been actually executed, return to stop
             */
            Fsm.prototype.makeStep = function () {
                if(this.input.length > this.pos) {
                    var transitions = this.getTransitions(this.currentState);
                    for (var i = 0; i < transitions.length; i++) {
                        var transition = transitions[i];
                        if (transition.label == this.input[this.pos] || transition.label==this.empty) {
                            this.executeTransition(transition);
                            return;
                        }
                    }
                }

                var $player_warn = $("#" + this.divId + " .it-player-warn");
                var $player_info = $("#" + this.divId + " .it-player-info");

                if (this.player.steps == 0) {
                    this.warning($player_warn, "Нет перехода для состояния <mark><b>" + this.currentState.label+ "</b></mark> и символа <mark><b>" + this.input[this.pos] + "</b></mark>");
                } else {
                    if(this.input.length <= this.pos) {
                        if(this.config.outfsm){
                            this.warning($player_info, "Преобразование закончено");
                        }else {
                            if (this.currentState.final) {
                                this.warning($player_info, "Строка распозналась");
                            } else {
                                this.warning($player_info, "Входная последовательность закончилась, но автомат не перешел в конечное состояние");
                            }
                        }
                    }else {
                        this.warning($player_info, "Нет команды для состояния <mark><b>" + this.currentState.label + "</b></mark> и символа <mark><b>" + this.input[this.pos] + "</b></mark>");
                    }
                }
                this.actualizeGuiState(2);

                //if no command has been executed return to stop state
                if (this.player.steps == 0) {
                    this.actualizeGuiState(0);
                    this.logger.clear();
                }
            };

            /**
             * Executes selected command
             * @param cmd
             */
            Fsm.prototype.executeTransition = function (transition) {
                this.player.steps++;
                this.logger.appendTransition(transition, this.player.steps, this.config.outfsm);
                var $output = $("#" + this.divId + " .it-output-input");
                this.player.animated = true;
                var player = this.player;
                var fsm = this;
                if(this.config.outfsm && this.empty!=transition.outlabel) {
                    $output.val($output.val()+transition.outlabel);
                }

                var fsm = this;

                transition.select();

                function finish() {
                    if(transition.label!=fsm.empty) {
                        fsm.pos++;
                    }
                    fsm.currentState.update(false);
                    fsm.currentState = transition.v2;
                    setTimeout(function() {
                        fsm.currentState.update(true);
                        transition.deselect();
                        fsm.logger.appendStrip(fsm.input, fsm.pos, true);
                        if(fsm.config.outfsm) {
                            fsm.logger.appendStrip($output.val(), $output.val().length - 1);
                        }
                        player.animated = false;
                        if (player.waitStop) {
                            player.waitStop = false;
                            fsm.stop();
                        } else if (player.state == 1) {
                            fsm.makeStep();
                        }
                    }, fsm.player.delay);
                }

                setTimeout(function(){finish()}, this.player.delay);
            };

            /**
             * Stop Fsm return pos to initial states
             */
            Fsm.prototype.stop = function () {
                this.actualizeGuiState(0);
                this.logger.clear();
                $("#" + this.divId + " .it-output-input").val("");
                this.pos = 0;
                this.currentState.update(false);
                this.currentState=this.firstState;
                this.currentState.update(true);
            };

            /**
             * Run play of MT
             */
            Fsm.prototype.play = function () {
                if (!this.player.animated) {
                    this.actualizeGuiState(1);
                    this.makeStep();
                }
            };

            /**
             * Pause MT
             */
            Fsm.prototype.pause = function () {
                this.actualizeGuiState(2);
            };

            /**
             * Make next step of MT
             */
            Fsm.prototype.step = function () {
                if (!this.player.animated && this.player.state != 1) {
                    this.actualizeGuiState(2);
                    this.makeStep();
                }
            };

            /**
             * Change availability of buttons when player state changes
             * @param state
             */
            Fsm.prototype.actualizeGuiState = function (state) {
                if (this.player.state != state) {
                    var lastState = this.player.state;
                    this.player.state = state;
                    var $play = $("#" + this.divId + " .it-play");
                    var $step = $("#" + this.divId + " .it-step");
                    var $pause = $("#" + this.divId + " .it-pause");
                    var $stop = $("#" + this.divId + " .it-stop");
                    var $inputChange = $("#" + this.divId + " .it-input-change");
                    if (this.player.state == 0) {
                        $pause.hide();
                        $play.show();
                        $play.removeAttr("disabled");
                        $step.show();
                        $step.removeAttr("disabled");
                        $stop.attr("disabled", 'true');
                        $inputChange.show();
                    } else if (this.player.state == 1) {
                        $stop.removeAttr("disabled");
                        if (this.editInput) {
                            this.applyInput();
                        }
                        $inputChange.hide();
                        $pause.show();
                        $play.hide();
                        if (lastState == 0) {
                            this.logger.appendStrip(this.input, this.pos, true);
                        }
                    } else if (this.player.state == 2) {
                        $stop.removeAttr("disabled");
                        if (this.editInput) {
                            this.applyInput();
                        }
                        $inputChange.hide();
                        $pause.hide();
                        $play.show();
                        if (lastState == 0) {
                            this.logger.appendStrip(this.input, this.pos, true);
                        }
                    }
                }
            };


            /**
             * Init player button handlers
             */
            Fsm.prototype.initPlayer = function () {
                var player = this.player;
                var fsm = this;
                var divId = this.divId;

                $("#" + divId + " .it-step").click(function () {
                    fsm.step();
                });

                $("#" + divId + " .it-stop").click(function () {
                    if (player.animated) {
                        player.waitStop = true;
                    } else {
                        fsm.stop();
                    }
                });

                $("#" + divId + " .it-play").click(function () {
                    fsm.play();
                });

                $("#" + divId + " .it-pause").click(function () {
                    fsm.pause();
                });
            };

            /**
             * Initialize speed manipulator
             */
            Fsm.prototype.initSpeed = function () {
                var player = this.player;

                var $sliderElem = $("#" + this.divId + " .it-slider");
                var sliderElem = $sliderElem.get(0);
                var $thumbElem = $("#" + this.divId + " .it-thumb");
                var thumbElem = $thumbElem.get(0);

                thumbElem.onmousedown = function (e) {
                    var thumbCoords = GuiUtils.getCoords(thumbElem);
                    var shiftX = e.pageX - thumbCoords.left;
                    var sliderCoords = GuiUtils.getCoords(sliderElem);
                    document.onmousemove = function (e) {
                        var newLeft = e.pageX - shiftX - sliderCoords.left;
                        if (newLeft < 0) {
                            newLeft = 0;
                        }
                        var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
                        if (newLeft > rightEdge) {
                            newLeft = rightEdge;
                        }
                        thumbElem.style.left = newLeft + 'px';
                        var width = $sliderElem.width() - 10;
                        player.delay = 500 * (1 - newLeft / width) + 10;
                    };
                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null;
                    };
                    return false;
                };

                thumbElem.ondragstart = function () {
                    return false;
                };
            };

            /**
             * Initialize input editing
             */
            Fsm.prototype.initInputEdit = function () {
                var fsm = this;

                var $inputView = $("#" + this.divId + " .it-input-view");
                var $inputEdit = $("#" + this.divId + " .it-input-edit");
                var $inputInput = $("#" + this.divId + " .it-input-input");
                $inputView.html(this.config.input);
                $inputEdit.hide();
                $inputInput.val(this.config.input);

                $("#" + this.divId + " .it-input-change").click(function () {
                    fsm.editInput = true;
                    $inputView.hide();
                    $inputEdit.show();
                });

                $("#" + this.divId + " .it-input-apply").click(function () {
                    fsm.applyInput();
                });

                $inputInput.on("input", function () {
                    var text = $(this).val();
                    var escapedAlphabed = GuiUtils.escapeSpecial(fsm.config.alphabet);
                    var regExp = new RegExp("[^" + escapedAlphabed + "]", 'g');
                    if (text.match(regExp)) {
                        text = text.replace(regExp, '');
                        var $stripWarn = $("#" + fsm.divId + " .it-input-warn");
                        fsm.warning($stripWarn,
                            "Допустимы только символы алфавита:  <mark><b>" + (fsm.config.alphabet).split("").join(" ") + "</b></mark> "
                        );
                        $(this).val(text);
                    }
                });
            };

            /**
             * Applies input changes
             */
            Fsm.prototype.applyInput = function (text) {
                var $inputView = $("#" + this.divId + " .it-input-view");
                var $inputEdit = $("#" + this.divId + " .it-input-edit");
                var $inputInput = $("#" + this.divId + " .it-input-input");
                $inputView.show();
                $inputEdit.hide();
                this.editInput = false;
                var enteredText = $inputInput.val();
                if(text) {
                    enteredText = text;
                }
                $inputInput.val(enteredText);
                $inputView.html(enteredText);
                this.input = enteredText;
            };


            Fsm.prototype.addVertex = function (vertex) {
                for (var i = 0; i < 10000; i++) {
                    if (this.getVertex("v" + i) == null) {
                        vertex.id = "v" + i;
                        vertex.updateLabel("S"+i);
                        this.states.push(vertex);
                        this.submitResult();
                        return;
                    }
                }
                console.error("too many states... ")
            };

            Fsm.prototype.getEdge = function (v1, v2) {
                for (var i = 0; i < this.transitions.length; i++) {
                    var edge = this.transitions[i];
                    if(edge.v1==v1 && edge.v2==v2){
                        return edge;
                    }
                }
                return null;
            };


            Fsm.prototype.getTransitions = function (v1) {
                var result = [];
                for (var i = 0; i < this.transitions.length; i++) {
                    var edge = this.transitions[i];
                    if(edge.v1==v1){
                        result.push(edge);
                    }
                }
                return result;
            };

            Fsm.prototype.getEdgeIndexForVertexes = function (e) {
                var count = 0;
                for (var i = 0; i < this.transitions.length; i++) {
                    var edge = this.transitions[i];
                    if(edge==e){
                        return count;
                    }
                    if(edge.v1==e.v1 && edge.v2==e.v2 || edge.v2==e.v1 && edge.v1==e.v2){
                        count++;
                    }
                }
                return null;
            };

            Fsm.prototype.getAvailableTransition = function(v1){
                var labels = this.config.alphabet.split("");
                labels.push(this.empty);
                var cnt = 0;
                for (var i = 0; i < v1.transitions.length; i++) {
                    if(v1.transitions[i].v1==v1) {
                        cnt++;
                        var label = v1.transitions[i].label;
                        if (labels.indexOf(label) >= 0) {
                            labels.splice(labels.indexOf(label), 1);
                        }
                    }
                }
                if(cnt>1){
                    if (labels.indexOf(this.empty) >= 0) {
                        labels.splice(labels.indexOf(this.empty), 1);
                    }
                }
                return labels;
            };

            Fsm.prototype.addEdge = function (v1, v2, label, outlabel) {
                var edge = new Transition(v1, v2, this.gui, this);
                this.transitions.push(edge);
                v1.transitions.push(edge);
                if(v1!=v2) {
                    v2.transitions.push(edge);
                }
                edge.update();
                if(label){
                    edge.updateLabel(label);
                }else{
                    var labels = this.getAvailableTransition(v1);
                    if(labels.length>0){
                        edge.updateLabel(labels[0]);
                    }
                }

                if(this.config.outfsm) {
                    if (outlabel) {
                        edge.updateOutLabel(outlabel);
                    } else {
                        edge.updateOutLabel(this.config.outalphabet.split("")[0]);
                    }
                }
              this.submitResult();
            };

            Fsm.prototype.canAddEdge = function(v1){
                var count = 0;
                for (var i = 0; i < v1.transitions.length; i++) {
                    if(v1.transitions[i].v1==v1) {
                        count++;
                        if(v1.transitions[i].label==this.empty){
                            return false;
                        }
                    }
                }
                return count<this.config.alphabet.split("").length;
            };

            Fsm.prototype.removeVertex = function (vertex) {
                for (var i = vertex.transitions.length-1; i >= 0; i--) {
                    var edge = vertex.transitions[i];
                    this.removeEdge(edge);
                }
                var index = this.states.indexOf(vertex);
                this.states.splice(index, 1);
              this.submitResult();
            };

            Fsm.prototype.removeEdge = function (edge) {
                var edgeIndex = this.transitions.indexOf(edge);
                edge.v1.transitions.splice(edge.v1.transitions.indexOf(edge), 1);
                if(edge.v1!=edge.v2) {
                    edge.v2.transitions.splice(edge.v2.transitions.indexOf(edge), 1);
                }
                this.gui.stage.removeChild(edge.line);
                this.gui.stage.removeChild(edge.backline);
                this.gui.stage.removeChild(edge.text);
                if(this.config.outfsm){
                    this.gui.stage.removeChild(edge.outText);
                }
                this.transitions.splice(edgeIndex, 1);
              this.submitResult();
            };



            Fsm.prototype.getVertex = function (id) {
                for (var i = 0; i < this.states.length; i++) {
                    var vertex = this.states[i];
                    if (vertex.id == id) {
                        return vertex;
                    }
                }
                return null;
            };

            Fsm.prototype.getVertexByCoords = function (x, y) {
                for (var i = 0; i < this.states.length; i++) {
                    var vertex = this.states[i];
                    if (vertex.view.x<x && vertex.view.y<y &&
                        vertex.view.x+this.gui.vertexSize>x &&
                        vertex.view.y+this.gui.vertexSize>y ) {
                        return vertex;
                    }
                }
                return null;
            };

            Fsm.prototype.deselectAllVertexes = function(){
                for (var i = 0; i < this.states.length; i++) {
                    this.states[i].deselect();
                    this.states[i].doubleselected=false;
                }
            };

            Fsm.prototype.hideBordersExcept = function(vertex){
                for (var i = 0; i < this.states.length; i++) {
                    if(this.states[i]!=vertex) {
                        this.states[i].hideBorder();
                    }
                }
            };

            Fsm.prototype.load = function (solution) {
              Fsm.prototype.loading=true;
                this.firstState = null;
              for (var i = this.transitions.length-1; i >= 0; i--) {
                this.removeEdge(this.transitions[i]);
              }
              for (var i = this.states.length-1; i >= 0; i--) {
                this.gui.stage.removeChild(this.states[i].view);
                this.removeVertex(this.states[i]);
              }
                var s0 = null;
                for (var i = 0; i < solution.states.length; i++) {
                    var v = solution.states[i];
                    var vertex = new State(v.x * this.gui.width, v.y * this.gui.height, v.final, this.gui, this, null);
                    if(v.first){
                        this.firstState = vertex;
                    }
                    if(v.label=="S0"){
                        s0=vertex;
                    }
                    vertex.updateLabel(v.label);
                    vertex.id = v.id;
                    this.states.push(vertex);
                    this.gui.stage.addChild(vertex.view);
                }
                if(this.firstState==null && s0!=null){
                    this.firstState=s0;
                }
                for (var j = 0; j < solution.transitions.length; j++) {
                    var e = solution.transitions[j];
                    var vFrom = this.getVertex(e.from);
                    var vTo = this.getVertex(e.to);
                    if(vFrom!=null && vTo!=null) {
                        this.addEdge(vFrom, vTo, e.label, e.outlabel);
                    }
                }
                this.applyInput(solution.input);
                this.currentState = this.firstState;
                this.currentState.update(true);
              Fsm.prototype.loading=false;
              this.submitResult();
            };

            Fsm.prototype.solution = function () {
                var result = {};
                result.states = [];
                result.transitions = [];
                for (var i = 0; i < this.states.length; i++) {
                    var state = this.states[i];
                    result.states.push({id: state.id, x: state.view.x / this.gui.width, y: state.view.y / this.gui.height,
                        final: state.final, label: state.label, first: state==this.firstState});
                }
                for (var j = 0; j < this.transitions.length; j++) {
                    var transition = this.transitions[j];
                    result.transitions.push({from: transition.v1.id, to: transition.v2.id, label: transition.label, outlabel: transition.outlabel});
                }
                result.input = this.input;
                return result;
            };

            function Base(graph, gui, x, y, final) {
                this.gui = gui;
                this.x = x;
                this.y = y;
                this.graph = graph;
                this.final = final;

                var base = this;
                this.vertexBase = new State(x, y, this.final, gui, base.graph, base);
                this.vertexBase.onBase = true;
                gui.stage.addChild(this.vertexBase.view);

                this.recoverVertex();
            }

            /**
             * recover draggable vertex with flag - onBase
             */
            Base.prototype.recoverVertex = function () {
                this.vertexBase = new State(this.x, this.y, this.final, this.gui, this.graph, this);
                this.gui.stage.addChild(this.vertexBase.view);
                this.vertexBase.onBase = true;
            };

            function State(x, y, final, gui, graph, base) {
                this.gui = gui;
                this.view = new createjs.Container();
                this.transitions = [];
                this.label="";
                this.final = final;

                this.border = new createjs.Shape();
                this.border.graphics.beginStroke(gui.vertexBorderColor);
                this.border.graphics.setStrokeDash([10,5], 0);
                this.border.graphics.drawCircle(gui.vertexSize / 2, gui.vertexSize / 2, gui.vertexSize);

                this.circle = new createjs.Shape();
                if(this.final){
                    this.circle.graphics.beginStroke(gui.vertexStrokeColorDark);
                    this.circle.graphics.setStrokeStyle(2);
                }else{
                    this.circle.graphics.beginStroke(gui.vertexStrokeColor);
                }
                this.circle.graphics.beginFill(gui.vertexColor);
                this.circle.graphics.drawCircle(gui.vertexSize / 2, gui.vertexSize / 2, gui.vertexSize / 2);

                this.mover = new createjs.Shape();
                this.mover.graphics.beginFill(gui.vertexBorderColor);
                this.mover.graphics.drawCircle(0, 0, gui.vertexSize/4);
                this.mover.cursor = "pointer";

                this.line = new createjs.Shape();
                this.line.graphics.clear();

                this.view.addChild(this.circle);



                this.view.x = x;
                this.view.y = y;
                this.base = base;
                this.graph = graph;
                this.onBase = false;
                this.selected = false;

                var vertex = this;
                var view = this.view;
                view.cursor = "pointer";

                view.on('mousedown', function (e) {
                    if (vertex.onBase) {
                        vertex.graph.deselectAllVertexes();
                        vertex.onBase = false;
                        vertex.base.recoverVertex();
                    }else{
                        var toDoubleSelected = false;
                        if(vertex.selected){
                            toDoubleSelected=true;
                        }
                        vertex.graph.deselectAllVertexes();
                        vertex.select();
                        if(toDoubleSelected){
                            vertex.doubleselected = true;
                        }
                    }
                    var posX = e.stageX;
                    var posY = e.stageY;
                    view.offset = {x: view.x - posX, y: view.y - posY};
                    gui.stage.setChildIndex(view, gui.stage.numChildren - 1);
                    gui.stage.setChildIndex(mover, gui.stage.numChildren - 1);
                    view.oldX=view.x;
                    view.oldY=view.y;
                    e.stopPropagation ();
                });

                view.on("pressmove", function (evt) {
                    vertex.deselect();
                    view.x = evt.stageX + view.offset.x;
                    view.x = Math.max(0, view.x);
                    view.x = Math.min(vertex.gui.width-vertex.gui.vertexSize, view.x);
                    view.y = evt.stageY + view.offset.y;
                    view.y = Math.max(0, view.y);
                    for (var i = 0; i < vertex.transitions.length; i++) {
                        vertex.transitions[i].update();
                    }
                    if (view.y > gui.height && vertex!=vertex.graph.firstState) {
                        view.alpha=0.3;
                    }else{
                        view.alpha=1;
                    }
                });

                view.on("pressup", function () {
                    if (view.y > gui.height && vertex!=vertex.graph.firstState) {
                        gui.stage.removeChild(vertex.view);
                        vertex.graph.removeVertex(vertex);
                    } else if (vertex.base) {
                        vertex.graph.addVertex(vertex);
                        vertex.base = null;
                    }
                    if(!vertex.graph.config.outfsm && vertex.doubleselected && view.x==view.oldX && view.y==view.oldY) {
                        vertex.final = !vertex.final;
                      vertex.graph.submitResult();
                        vertex.update(vertex==vertex.graph.currentState);
                    }
                });

                var mover = this.mover;

                mover.on('mousedown', function (e) {
                    var posX = e.stageX;
                    var posY = e.stageY;
                    mover.offset = {x: mover.x - posX, y: mover.y - posY};
                    vertex.line.graphics.clear();
                    vertex.gui.stage.addChild(vertex.line);
                    e.stopPropagation ();
                });

                mover.on("pressmove", function (evt) {
                    mover.x = evt.stageX + mover.offset.x;
                    mover.y = evt.stageY + mover.offset.y;
                    vertex.line.graphics.clear();
                    vertex.line.graphics.beginStroke(vertex.gui.vertexBorderColor);
                    vertex.line.graphics.setStrokeDash([10,5], 0);
                    vertex.line.graphics.moveTo(vertex.view.x+vertex.gui.vertexSize/2, vertex.view.y+vertex.gui.vertexSize/2);
                    vertex.line.graphics.lineTo(mover.x, mover.y);
                    vertex.graph.hideBordersExcept(vertex);

                    mover.graphics.clear();
                    mover.graphics.beginFill(vertex.gui.vertexBorderColor);
                    mover.graphics.drawCircle(0, 0, vertex.gui.vertexSize/4);

                    var another = vertex.getMoverExistedVertex();
                    if(another!=null){
                        if(vertex.graph.canAddEdge(vertex, another)) {
                            if(another!=vertex) {
                                another.showBorder();
                            }else{
                                mover.graphics.beginFill(vertex.gui.vertexColorDark);
                                mover.graphics.drawCircle(0, 0, vertex.gui.vertexSize/4);
                            }
                        }
                    }else if(vertex.isMoverOutsideVertex()){
                        if(vertex.graph.canAddEdge(vertex)) {
                            mover.graphics.beginFill(vertex.gui.vertexColor);
                            mover.graphics.drawCircle(0, 0, vertex.gui.vertexSize / 4);
                        }
                    }
                });

                mover.on("pressup", function () {
                    vertex.gui.stage.removeChild(vertex.line);
                    vertex.deselect();
                    mover.graphics.clear();
                    mover.graphics.beginFill(vertex.gui.vertexBorderColor);
                    mover.graphics.drawCircle(0, 0, vertex.gui.vertexSize/4);
                    vertex.graph.hideBordersExcept();
                    var another = vertex.getMoverExistedVertex();
                    if(another!=null){
                        if(vertex.graph.canAddEdge(vertex, another)) {
                            vertex.graph.addEdge(vertex, another);
                        }
                    }else if(vertex.isMoverOutsideVertex()){
                        if(vertex.graph.canAddEdge(vertex)) {
                            var another = new State(mover.x, mover.y, false, vertex.gui, vertex.graph, null);
                            vertex.graph.addVertex(another);
                            vertex.gui.stage.addChild(another.view);
                            vertex.graph.addEdge(vertex, another);
                        }
                    }
                });

            }

            State.prototype.update = function(current){
                this.view.removeChild(this.circle);

                this.circle = new createjs.Shape();
                if(this.final){
                    this.circle.graphics.beginStroke(this.gui.vertexStrokeColorDark);
                    this.circle.graphics.setStrokeStyle(2);
                }else{
                    this.circle.graphics.beginStroke(this.gui.vertexStrokeColor);
                }
                if(current){
                    this.circle.graphics.beginFill(this.gui.vertexColorCurrent);
                }else {
                    this.circle.graphics.beginFill(this.gui.vertexColor);
                }
                this.circle.graphics.drawCircle(this.gui.vertexSize / 2, this.gui.vertexSize / 2, this.gui.vertexSize / 2);

                this.view.addChild(this.circle);

                this.view.setChildIndex(this.circle, 0);
            };

            State.prototype.updateLabel = function(label){
                this.label=label;
                if(this.text){
                    this.view.removeChild(this.text);
                }
                this.text = new createjs.Text(this.label, this.gui.vertexSize * 0.65 + "px Arial", "#111");
                this.text.x = (this.gui.vertexSize - this.text.getBounds().width) / 2;
                this.text.y = this.gui.vertexSize*0.15;
                this.view.addChild(this.text);
            };

            State.prototype.isMoverOutsideVertex = function(){
                var x = this.view.x+this.gui.vertexSize/2;
                var y = this.view.y+this.gui.vertexSize/2;
                var dist = Math.sqrt((x-this.mover.x)*(x-this.mover.x)+(y-this.mover.y)*(y-this.mover.y));
                return dist > this.gui.vertexSize;
            };

            State.prototype.getMoverExistedVertex = function(){
                var another = this.graph.getVertexByCoords(this.mover.x, this.mover.y);
                return another;
            };

            State.prototype.showBorder = function(){
                this.view.addChild(this.border);
            };

            State.prototype.hideBorder = function(){
                this.view.removeChild(this.border);
            };

            State.prototype.select = function(){
                this.selected=true;
                this.view.addChild(this.border);
                this.mover.x=this.gui.vertexSize/2+this.gui.vertexSize/2*Math.sqrt(2)+this.view.x;
                this.mover.y=this.gui.vertexSize/2-this.gui.vertexSize/2*Math.sqrt(2)+this.view.y;
                if(this.graph.canAddEdge(this)) {
                    this.gui.stage.addChild(this.mover);
                }
                this.gui.stage.setChildIndex(this.view, this.gui.stage.numChildren - 1);
                this.gui.stage.setChildIndex(this.mover, this.gui.stage.numChildren - 1);
            };

            State.prototype.deselect = function(){
                this.selected=false;
                this.view.removeChild(this.border);
                this.gui.stage.removeChild(this.mover);
            };


            function Transition(v1, v2, gui, graph) {
                this.v1=v1;
                this.v2=v2;
                this.gui=gui;
                this.graph=graph;
                this.label="";
                this.selected = false;

                var backline = new createjs.Shape();
                var line = new createjs.Shape();

                backline.alpha=0.05;
                this.line=line;
                this.backline=backline;
                this.gui.stage.addChild(backline);
                this.gui.stage.setChildIndex(backline, 1);
                this.gui.stage.addChild(line);
                this.gui.stage.setChildIndex(line, 1);
                backline.cursor="pointer";

                var stage = this.gui.stage;
                var edge = this;

                backline.on("mouseover", function(evt){
                    var cross = new createjs.Shape();
                    cross.graphics.setStrokeStyle(2);
                    cross.graphics.beginStroke("darkred");
                    cross.graphics.moveTo(evt.stageX-5, evt.stageY-5);
                    cross.graphics.lineTo(evt.stageX+5, evt.stageY+5);
                    cross.graphics.moveTo(evt.stageX+5, evt.stageY-5);
                    cross.graphics.lineTo(evt.stageX-5, evt.stageY+5);
                    stage.addChild(cross);
                    edge.cross=cross;
                });

                backline.on("mouseout", function(){
                    stage.removeChild(edge.cross);
                });

                backline.on("click", function(){
                    edge.graph.removeEdge(edge);
                });
            }

            Transition.prototype.updateLabel = function(label){
                this.label=label;
                if(this.text){
                    this.gui.stage.removeChild(this.text);
                    this.gui.stage.removeChild(this.underText);
                }
                this.underText = new createjs.Shape();
                this.underText.graphics.beginFill(this.gui.edgeUnderColor);
                this.underText.graphics.drawCircle(this.gui.vertexSize * 0.65/2, this.gui.vertexSize * 0.65/2,  this.gui.vertexSize * 0.65);
                this.underText.alpha=0.05;

                this.text = new createjs.Text(this.label, this.gui.vertexSize * 0.65 + "px Arial", "#111");

                this.text.x = (this.center.x - this.text.getBounds().width/2);
                if(this.graph.config.outfsm){
                    this.text.x -= this.gui.vertexSize * 0.65;
                }
                this.text.y = this.center.y-this.gui.vertexSize * 0.75;

                this.underText.x =this.text.x;
                this.underText.y =this.text.y;

                this.gui.stage.addChild(this.underText);
                this.gui.stage.addChild(this.text);

                this.underText.cursor="pointer";

                var v1 = this.v1;
                var fsm = this.graph;
                var edge = this;
                this.underText.on("pressup", function (e) {
                    var $selector = $("#" + fsm.divId + " .it-trans-selector");
                    $selector.html("");
                    var labels = fsm.getAvailableTransition(v1);
                    for(var i = 0; i<labels.length; i++){
                        var $item = $('<button class="btn btn-default btn-sm" type="button">'+labels[i]+'</button>');
                        $item.click(function(){
                            edge.updateLabel($(this).html());
                          edge.graph.submitResult();
                            $selector.hide();
                        });
                        $selector.append($item);
                    }
                    $selector.css("top", e.target.y-30);
                    $selector.css("left", e.target.x);
                    $selector.show();
                });
            };


            Transition.prototype.updateOutLabel = function(label){
                this.outlabel=label;
                if(this.outText){
                    this.gui.stage.removeChild(this.outText);
                    this.gui.stage.removeChild(this.underOutText);
                }
                this.underOutText = new createjs.Shape();
                this.underOutText.graphics.beginFill(this.gui.edgeUnderColor);
                this.underOutText.graphics.drawCircle(this.gui.vertexSize * 0.65/2, this.gui.vertexSize * 0.65/2,  this.gui.vertexSize * 0.65);
                this.underOutText.alpha=0.05;

                this.outText = new createjs.Text(this.outlabel, this.gui.vertexSize * 0.65 + "px Arial", "#111");

                this.outText.x = (this.text.getBounds().width+this.text.x+this.gui.vertexSize * 0.65);
                this.outText.y = this.center.y-this.gui.vertexSize * 0.75;

                this.underOutText.x =this.outText.x;
                this.underOutText.y =this.outText.y;

                this.gui.stage.addChild(this.underOutText);
                this.gui.stage.addChild(this.outText);

                this.underOutText.cursor="pointer";

                var fsm = this.graph;
                var edge = this;
                this.underOutText.on("pressup", function (e) {
                    var $selector = $("#" + fsm.divId + " .it-trans-selector");
                    $selector.html("");
                    var labels = fsm.config.outalphabet.split("");
                    for(var i = 0; i<labels.length; i++){
                        var $item = $('<button class="btn btn-default btn-sm" type="button">'+labels[i]+'</button>');
                        $item.click(function(){
                            edge.updateOutLabel($(this).html());
                          edge.graph.submitResult();
                            $selector.hide();
                        });
                        $selector.append($item);
                    }
                    $selector.css("top", e.target.y-30);
                    $selector.css("left", e.target.x);
                    $selector.show();
                });
            };

            Transition.prototype.update = function(){
                var p1 = {
                    x:this.v1.view.x+this.gui.vertexSize/2,
                    y:this.v1.view.y+this.gui.vertexSize/2
                };
                var p2;
                if(this.v1==this.v2){
                    p2=p1;
                }else {
                    p2 = {
                        x: this.v2.view.x + this.gui.vertexSize / 2,
                        y: this.v2.view.y + this.gui.vertexSize / 2
                    };
                }

                var index = this.graph.getEdgeIndexForVertexes(this);

                this.line.graphics.clear();
                this.line.graphics.beginStroke(this.selected?this.gui.edgeColorSelected:this.gui.edgeColor);
                this.line.graphics.setStrokeStyle(1);
                this.drawLine(this.line.graphics, p1, p2, index);

                this.backline.graphics.clear();
                this.backline.graphics.beginStroke("darkgray");
                this.backline.graphics.setStrokeStyle(5);
                this.drawLine(this.backline.graphics, p1, p2, index);

                if(this.text) {
                    this.updateLabel(this.label);
                }
                if(this.outText){
                    this.updateOutLabel(this.outlabel);
                }
            };

            Transition.prototype.select = function(){
                this.selected = true;
                this.update();
            };

            Transition.prototype.deselect = function(){
                this.selected = false;
                this.update();
            };

            Transition.prototype.drawLine = function(g, p1, p2, index){
                var bp1;
                var bp2;
                if(p1==p2){
                    bp1 = {
                        x: p1.x-(2*this.gui.vertexSize+1.5*this.gui.vertexSize*index),
                        y: p1.y-(2*this.gui.vertexSize+1.5*this.gui.vertexSize*index)
                    };
                    bp2 = {
                        x: p1.x+(2*this.gui.vertexSize+1.5*this.gui.vertexSize*index),
                        y: p1.y-(2*this.gui.vertexSize+1.5*this.gui.vertexSize*index)
                    };
                }else {
                    var v = GuiUtils.vector(p1,p2);
                    p1 = GuiUtils.movePoint(p1, v, this.gui.vertexSize/2);
                    p2 = GuiUtils.movePoint(p2, GuiUtils.rotateVector(v, Math.PI), this.gui.vertexSize/2);
                    v = GuiUtils.vector(p1,p2);
                    var v1 = GuiUtils.rotateVector(v, p1.x<p2.x?Math.PI / 2:-Math.PI / 2);
                    var indexShift  = (index%2==1?-1:1)*(Math.floor(index/2)+1)*v.length / 10;
                    bp1 = GuiUtils.movePoint(p1, v, v.length / 4);
                    bp1 = GuiUtils.movePoint(bp1, v1, indexShift);
                    bp2 = GuiUtils.movePoint(p1, v, v.length * 3 / 4);
                    bp2 = GuiUtils.movePoint(bp2, v1, indexShift);
                }
                g.moveTo(p1.x, p1.y);
                g.bezierCurveTo(bp1.x, bp1.y, bp2.x, bp2.y, p2.x, p2.y);

                this.center = GuiUtils.bezierPoint(p1, bp1, bp2, p2, 0.5);

                if(p1!=p2) {
                    var part = 0.75;
                    if(v.length>50&&v.length<=100){
                        part = 0.75 + (v.length-50)*0.002;
                    }else if(v.length>100&&v.length<=300){
                        part = 0.85 + (v.length-100)*0.0005;
                    }else if(v.length>300){
                        part = 0.96;
                    }
                    var arv = GuiUtils.vector(GuiUtils.bezierPoint(p1, bp1, bp2, p2, part), p2);
                    arv = GuiUtils.rotateVector(arv, Math.PI);
                    var arv1 = GuiUtils.rotateVector(arv, Math.PI / 20);
                    var arv2 = GuiUtils.rotateVector(arv, -Math.PI / 20);
                    var arp1 = GuiUtils.movePoint(p2, arv1, this.gui.vertexSize / 2);
                    var arp2 = GuiUtils.movePoint(p2, arv2, this.gui.vertexSize / 2);
                    g.lineTo(arp1.x, arp1.y);
                    g.moveTo(p2.x, p2.y);
                    g.lineTo(arp2.x, arp2.y);
                }
            };



            /**
             * Show warning
             * $warn - warning element
             */
            Fsm.prototype.warning = function ($warn, text, offsetTop, offsetLeft) {
                if ($warn.is(":visible")) {
                    $warn.stop();
                    $warn.css('opacity', 1);
                }

                if (offsetTop) {
                    $warn.css("top", offsetTop);
                }
                if (offsetLeft) {
                    $warn.css("left", offsetLeft);
                }
                $warn.show();
                setTimeout(function () {
                    $warn.fadeOut(2000, function () {
                        $(this).css("opacity", 1);
                        $(this).hide()
                    });
                }, 2000);
                $warn.html(text);
            };


            /**
             * Logger manages writing to log
             * @param divId
             * @param empty
             * @constructor
             */
            function Logger(divId, empty) {

                var $log = $("#" + divId + " .it-log");

                var $logCounter = $("#" + divId + " .it-log-counter");

                var $small = $("#" + divId + " .it-log-small");

                var $expand = $("#" + divId + " .it-log-expand");

                var count = 0;

                var expanded = false;

                $small.hide();

                $expand.hide();

                $log.css({'max-height': '200px'});
                $log.css({'min-height': '200px'});

                $expand.click(function () {
                    $small.show();
                    $expand.hide();
                    $log.css({'max-height': ''});
                    expanded = true;
                });

                $small.click(function () {
                    $expand.show();
                    $small.hide();
                    $log.css({'max-height': '200px'});
                    var objDiv = $log[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                    expanded = false;
                });

                this.appendStrip = function (strip, pos, addcount) {
                    var escapedSpecial = GuiUtils.escapeSpecial(empty);

                    var left = strip.substring(0, pos);
                    var right = strip.substring(pos + 1);

                    left = left.replace(new RegExp("^" + escapedSpecial + "+", "gm"), '');
                    right = right.replace(new RegExp(escapedSpecial + "+$", "gm"), '');

                    //shrink left
                    //max length is 24
                    //if less add star to the start, but no more 5
                    if (left.length > 24) {
                        left = "~" + left.substr(left.length - 23);
                    } else if (left.length > 19) {
                        left = new Array(25 - left.length).join(empty) + left;
                    } else {
                        left = new Array(6).join(empty) + left;
                    }

                    //shrink right
                    var endsLength = (left.length + right.length);
                    if (endsLength > 29) {
                        right = right.substr(0, 28 - left.length) + "~";
                    }

                    endsLength = (left.length + right.length);
                    //add right empty symbols to get 30-length strip
                    if (endsLength < 29) {
                        right = right + new Array(30 - (endsLength)).join(empty);
                    }

                    if(addcount) {
                        strip = left + "<span class='bg-primary'>" + strip.charAt(pos) + "</span>" + right;
                    }else{
                        strip = left +  strip.charAt(pos) + right;
                    }



                    if(addcount) {
                        count++;
                        var strCount = count;
                        if (count < 10) {
                            strCount = "&nbsp;" + count;
                        }
                        $log.append("<div><label>" + strCount + ":</label><span class='it-log-strip'>" + strip + "</span></div>");
                    }else{
                        $log.append("<div><label>&nbsp;>:</label><span class='it-log-strip'>" + strip + "</span></div>");
                    }
                    var objDiv = $log[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                    if (count > 4) {
                        if (expanded) {
                            $small.show();
                        } else {
                            $expand.show();
                        }
                    }
                };

                this.appendTransition = function (transition, count, outfsm) {
                    $log.append("<div class='it-log-cmd'>" + transition.v1.label+" "+transition.label+" -> "+ transition.v2.label + (outfsm? " "+ transition.outlabel:"")+"</div>");
                    var objDiv = $log[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                    if (count) {
                        $logCounter.html(count);
                    }
                };

                this.clear = function () {
                    $log.html("");
                    count = 0;
                    $small.hide();
                    $expand.hide();
                    $logCounter.html("");
                };

            }


            return {
                magic: function () {
                    return new Fsm();
                }
            }


        })
        ();

        var GuiUtils = (function () {

            var special = "\\ . + * ? [ ^ ] $ ( ) { } = ! < > | : - /".split(" ");

            var specialRegular = "\\ . + ? [ ^ ] $ { } = ! < > : - /".split(" ");

            return {

                bezierPoint: function(p1, p2, p3, p4, t){
                    return{
                        x: (1-t)*(1-t)*(1-t)*p1.x+3*(1-t)*(1-t)*t*p2.x+3*(1-t)*t*t*p3.x+t*t*t*p4.x,
                        y: (1-t)*(1-t)*(1-t)*p1.y+3*(1-t)*(1-t)*t*p2.y+3*(1-t)*t*t*p3.y+t*t*t*p4.y
                    };
                },

                vector: function(p1,p2){
                    var x = p2.x-p1.x;
                    var y = p2.y-p1.y;
                    var length = Math.sqrt(x*x+y*y);
                    return {
                        x: x/length,
                        y: y/length,
                        length: length
                    };
                },

                movePoint: function(point, vector, length){
                    return {
                        x: point.x+vector.x*length,
                        y: point.y+vector.y*length
                    };
                },

                rotateVector: function(v, alpha){
                    return{
                        x: v.x*Math.cos(alpha)+v.y*Math.sin(alpha),
                        y: -v.x*Math.sin(alpha)+v.y*Math.cos(alpha),
                        length: v.length
                    }
                },

                getCoords: function (elem) {
                    var box = elem.getBoundingClientRect();
                    return {
                        top: box.top + pageYOffset,
                        left: box.left + pageXOffset
                    };
                },


                beforeSpace: function (str, length) {
                    if (!length || (length && str.length <= length)) {
                        return "&nbsp;" + str;
                    } else {
                        return str;
                    }
                },

                /**
                 * make special characters escaped
                 * @param str
                 * @returns {string}
                 */
                escapeSpecial: function (str) {
                    var symbols = str.split("");
                    var result = "";
                    for (var i = 0; i < symbols.length; i++) {
                        if (~special.indexOf(symbols[i])) {
                            result += "\\" + symbols[i];
                        } else {
                            result += symbols[i];
                        }
                    }
                    return result;
                },

                /**
                 * make special characters escaped
                 * @param str
                 * @returns {string}
                 */
                escapeSpecialRegular: function (str) {
                    var symbols = str.split("");
                    var result = "";
                    for (var i = 0; i < symbols.length; i++) {
                        if (~specialRegular.indexOf(symbols[i])) {
                            result += "\\" + symbols[i];
                        } else {
                            result += symbols[i];
                        }
                    }
                    return result;
                }

            }

        })();



        /***/ })

/******/ });
//# sourceMappingURL=task_scheme.js.map
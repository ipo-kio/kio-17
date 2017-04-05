var task_scheme_first =
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
/* exports provided: TaskSchemeFirst */
/* all exports used */
/*!****************************************!*\
  !*** ./src/task_scheme/task_scheme.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["TaskSchemeFirst"] = TaskSchemeFirst;
/**
 * Задача. Процесс "3x+1" устроен так. Он начинается с натурального числа, если оно четное, его надо поделить на два.
 * Если нечетное, то x -> 3x + 1. Для всех чисел от 1 до 999 этот процесс рано или поздно приводит к 1.
 * Нужно придумать начальное число от 1 до 999 так, чтобы количество шагов было как можно больше, при этом, чтобы
 * максимальное число, полученное в процессе, было как можно меньше. Т.е. участник вводит одно число, а программа
 * считает два параметра. Количество шагов перед приходом к единице и максимальное число, которое при этом получается.
 * Первый параметр должен быть как можно больше, второй — как можно меньше.
 */

/**
 * создаем класс TaskSchemeFirst, конструктор может быть пустым, инициализация происходит позже
 * @param settings произвольный объект настроек "манпулятора", в первую очередь, из этого объекта нужно брать
 * информацию об уровне. Можно реализовать это прямолинейно так, что settings = {level : 2}
 * @constructor
 */
function TaskSchemeFirst(settings) {
    this.settings = settings;
    this.scheme = qwerty00003.magic();
}

//следующие функции требуется реализовать, это как будто реализация интерфейса

/**
 * строковый идентификатор задачи. В данный момент используется только для того, чтобы сформировать
 * ключ для localStorage для хранения автоматически сохраненных решений.
 */
TaskSchemeFirst.prototype.id = function () {
    return "TaskSchemeFirst";
};

TaskSchemeFirst.prototype.initCounter=0;

/**
 * Функция инициализации, в этой функции можно создавать интерфейс задачи и уже можно пользоваться KioApi
 * @param domNode dom-узел, который нужно наполнять содержимым задачи
 * @param kioapi ссылка на api для совершения всех действий с задачей
 */
TaskSchemeFirst.prototype.initialize = function (domNode, kioapi, preferredWidth) {
    //сохраняем данные для будущего использования
    this.kioapi = kioapi;
    TaskSchemeFirst.prototype.initCounter++;
    $(domNode).attr('id', 'schemeId'+TaskSchemeFirst.prototype.initCounter);
    debugger;
    this.scheme.init(kioapi, 'schemeId'+TaskSchemeFirst.prototype.initCounter, preferredWidth, JSON.parse( '{ "type": "boolean", "inputNum": 2, "outputNum": 2, "bases": [{ "id": "75", "inputNum": 4, "outputNum": 1,"name": "0>1", "func": "output[0]=(!input[0]&!input[1]&!input[2]&!input[3])|(input[0]&!input[1]&!input[2]&!input[3])|(!input[0]&input[1]&!input[2]&!input[3])|(!input[0]&!input[1]&input[2]&!input[3])|(!input[0]&!input[1]&!input[2]&input[3])"}]}'));

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
TaskSchemeFirst.prototype.parameters = function () {
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
TaskSchemeFirst.prototype.solution = function () {
    return this.scheme.solution();
};

/**
 * Загрузка решения в задачу. При загрузке решения нужно обновить данные через kioapi.submitResult,
 * в этой примере это делается в обработчике события change()
 * @param solution решение для загрузки
 */
TaskSchemeFirst.prototype.loadSolution = function (solution) {
    if (!solution) return;
    this.scheme.load(solution);
};

//далее идут приватные методы


var qwerty00003 = function () {

    /**
     * Consider global connectors as connectors of big element
     * so, on the left is output and on the right is input (as for normal elements)
     *
     * but in config - inputs are on the left and outputs are on the right
     * @constructor
     */
    function Scheme() {

        this.gui = {
            stage: {},

            width: 0,
            /**
             * space between global connectors
             */
            connectorSpace: 300,
            /**
             * space between element connectors
             */
            elemConnectorSpace: 20,
            /**
             * space between connector and element
             */
            connectorFromElementSpace: 10,
            /**
             * width of element
             */
            elemWidth: 50,
            /**
             * Radius of connectors
             */
            connectorRadius: 5,
            /**
             * Height of active scene without toolbox
             */
            activeHeight: 0,
            /**
             * Height of toolbox with elements
             */
            toolboxHeight: 0,
            /**
             * Use vertical and horizontal lines for connections
             */
            straightConnections: true

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

        /**
         * array of elements
         * @type {Array}
         */
        this.elements = [];

        /**
         * array of connections between connectors
         * @type {Array}
         */
        this.connections = [];

        /**
         * Global input connectors
         * @type {Array}
         */
        this.inputs = [];

        /**
         * Global output connectors
         * @type {Array}
         */
        this.outputs = [];

        /**
         * Arrays of bases elements
         * @type {Array}
         */
        this.bases = [];

        /**
         * Calculation processor
         * @type {{}}
         */
        this.processor = {};

        this.tests = [
            [0,0,0,0],
            [0,1,0,1],
            [1,0,0,1],
            [1,1,1,0]
        ];
    }

    //noinspection all
    Scheme.prototype.layout = '<style>#divId .it-task{background-image:url(/assets/stylesheets/../../~plugin/KioOnline/scheme1.png);background-size:100% 100%} #divId .it-scene{background-image:url(/assets/stylesheets/../../~plugin/KioOnline/scheme0_canvas.png);background-size:100% 100%;border:1px solid #a9a9a9}#divId .top-buffer{margin-top:20px}</style><div class="it-task well"><div class="row"><div class="col-sm-12"><canvas class="it-scene" height="200px"></canvas></div></div><div class="row top-buffer"><div class="col-sm-12"><div class="it-controls"><div class="btn-group" role="group"><button class="it-control-decrease btn btn-default" type="button">Предыдущий входной набор</button> <button class="it-control-increase btn btn-default" type="button">Следующий входной набор</button></div></div></div></div></div>'; //###layout

    Scheme.prototype.init = function (kio, divId, taskWidth, config) {
        this.divId = divId;
        this.config = config;
        this.kio=kio;

        $("#" + divId).html(this.layout.replace(new RegExp("#divId", 'g'), "#" + divId));
        var $scene = $("#" + divId + " .it-scene");
        $scene.attr("id", divId + "-it-scene");
        $scene.attr("width", taskWidth - 40);
        var $task = $("#" + divId + " .it-task");
        $task.css("max-width", taskWidth + "px");
        $task.css("min-width", taskWidth + "px");
        //#!
        this.initHeight();

        $scene.attr("height", this.gui.activeHeight + this.gui.toolboxHeight + "px");

        this.gui.stage = new createjs.Stage(divId + "-it-scene");
        this.gui.stage.mouseMoveOutside = true;
        this.gui.width = taskWidth - 40;

        var delimiter = new createjs.Shape();
        delimiter.y = this.gui.activeHeight;
        delimiter.graphics.setStrokeStyle(2);
        delimiter.graphics.beginStroke("#96f3ff");
        delimiter.graphics.moveTo(0, 0);
        delimiter.graphics.lineTo(this.gui.width, 0);
        // this.gui.stage.addChild(delimiter);

        this.initGlobalConnectors();
        this.initBases();

        this.gui.stage.enableMouseOver(10);
        this.gui.stage.update();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.gui.stage);

        var gui = this.gui;
        var scheme = this;
        $("#" + divId + " .it-control-straight").on("change", function () {
            gui.straightConnections = $(this).is(":checked");
            for (var i = 0; i < scheme.connections.length; i++) {
                var connection = scheme.connections[i];
                connection.deselect();
            }
        });

        if (config.type == "boolean") {
            this.processor = new BooleanProcessor(this);
            this.processor.calc();
        }

        $("#" + divId + " .it-control-increase").click(function () {
            scheme.processor.increase();
        });

        $("#" + divId + " .it-control-decrease").click(function () {
            scheme.processor.decrease();
        });
    };

    /**
     * Calculates height of active zone and toolbox
     * use gui.connectorSpace and gui.elemConnectorSpace
     */
    Scheme.prototype.initHeight = function () {
        var maxGlobalConnectors = Math.max(this.config.inputNum, this.config.outputNum);
        this.gui.activeHeight = maxGlobalConnectors * this.gui.connectorSpace;

        var maxBaseConnectors = 0;
        for (var i = 0; i < this.config.bases.length; i++) {
            var base = this.config.bases[i];
            maxBaseConnectors = Math.max(maxBaseConnectors, Math.max(base.inputNum, base.outputNum));
        }
        this.gui.toolboxHeight = (maxBaseConnectors + 1) * this.gui.elemConnectorSpace;
    };

    /**
     * Creates global connectors and add to stage
     */
    Scheme.prototype.initGlobalConnectors = function () {
        var space = this.gui.activeHeight / this.config.inputNum;
        for (var i = 0; i < this.config.inputNum; i++) {
            var output = new Connector(i, 0, this.gui, this.gui.connectorFromElementSpace, i * space + space / 2, false, null);
            this.outputs.push(output);
            this.gui.stage.addChild(makeConnectorLine(0, i * space + space / 2, this.gui.connectorFromElementSpace));
            this.gui.stage.addChild(output.view);
        }

        space = this.gui.activeHeight / this.config.outputNum;
        for (var j = 0; j < this.config.outputNum; j++) {
            var input = new Connector(j, 0, this.gui, this.gui.width - this.gui.connectorFromElementSpace, j * space + space / 2, true, null);
            this.inputs.push(input);
            this.gui.stage.addChild(makeConnectorLine(this.gui.width - this.gui.connectorFromElementSpace + this.gui.connectorRadius, j * space + space / 2, this.gui.connectorFromElementSpace - this.gui.connectorRadius));
            this.gui.stage.addChild(input.view);
        }
    };

    /**
     * Creates bases
     */
    Scheme.prototype.initBases = function () {
        for (var i = 0; i < this.config.bases.length; i++) {
            var baseJson = this.config.bases[i];
            var base = new Base(baseJson.id, baseJson.inputNum, baseJson.outputNum, baseJson.func, baseJson.name, this.gui, i * (this.gui.elemWidth * 2) + this.gui.elemWidth / 2, this.gui.activeHeight + this.gui.elemConnectorSpace / 2, this);
            this.bases.push(base);
        }
    };

    /**
     * Returns base by id
     * @param id
     * @returns {*}
     */
    Scheme.prototype.getBaseById = function (id) {
        for (var i = 0; i < this.bases.length; i++) {
            var base = this.bases[i];
            if (base.id == id) {
                return base;
            }
        }
        return null;
    };

    /**
     * Returns element by id
     * @param id
     * @returns {*}
     */
    Scheme.prototype.getElementById = function (id) {
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];
            if (element.id == id) {
                return element;
            }
        }
        return null;
    };

    /**
     * Removes element from scheme
     * @param element
     */
    Scheme.prototype.removeElement = function (element) {
        var index = this.elements.indexOf(element);
        this.elements.splice(index, 1);
        this.gui.stage.removeChild(element.view);
        element.removeConnectors();

        for (var i = this.connections.length - 1; i >= 0; i--) {
            var connection = this.connections[i];
            for (var j = 0; j < element.outputs.length; j++) {
                var output = element.outputs[j];
                if (connection.from == output) {
                    this.removeConnection(connection);
                }
            }
            for (var k = 0; k < element.inputs.length; k++) {
                var input = element.inputs[k];
                if (connection.to == input) {
                    this.removeConnection(connection);
                }
            }
        }
        this.processor.submitResult();
    };

    /**
     * Deselects all connectors
     */
    Scheme.prototype.deselectAllConnectors = function (connector) {
        var scheme = this;
        for (var i = 0; i < scheme.elements.length; i++) {
            var element = scheme.elements[i];
            for (var j = 0; j < element.outputs.length; j++) {
                if (!connector || element.outputs[j] != connector) {
                    element.outputs[j].deselect();
                }
            }
            for (var k = 0; k < element.inputs.length; k++) {
                if (!connector || element.inputs[k] != connector) {
                    element.inputs[k].deselect();
                }
            }
        }

        for (var l = 0; l < this.inputs.length; l++) {
            this.inputs[l].deselect();
        }
        for (var m = 0; m < this.outputs.length; m++) {
            this.outputs[m].deselect();
        }
    };

    /**
     * Remove connection and restore connector interactive/visibility
     * @param connection
     */
    Scheme.prototype.removeConnection = function (connection) {
        this.gui.stage.removeChild(connection.selectLine);
        this.gui.stage.removeChild(connection.line);
        this.gui.stage.removeChild(connection.background);
        this.gui.stage.removeChild(connection.cross);
        var index = this.connections.indexOf(connection);
        this.connections.splice(index, 1);
        connection.to.view.visible = true;
        connection.to.linkOutput = null;
        var indexOutput = connection.from.linkInputs.indexOf(connection.to);
        connection.from.linkInputs.splice(indexOutput, 1);
        if (connection.from.linkInputs.length == 0) {
            connection.from.unlock();
        }
        this.processor.submitResult();
        this.processor.calc();
    };

    Scheme.prototype.load = function (solution) {
      Scheme.prototype.loading=true;
        for (var n = 0; n < solution.input.length; n++) {
            this.outputs[n].value = solution[n];
        }
        this.processor.loadInput(solution.input);

        if (solution.straightConnections) {
            this.gui.straightConnections = true;
            $("#" + this.divId + " .it-control-straight").prop('checked', true);
        }

        for (var i = 0; i < this.elements.length; i++) {
            var oldElement = this.elements[i];
            this.gui.stage.removeChild(oldElement.view);
            oldElement.removeConnectors();
        }
        this.elements = [];
      for (var k = this.connections.length-1; k >= 0; k--) {
        this.removeConnection(this.connections[k]);
      }
        this.connections = [];

        for (var j = 0; j < solution.elements.length; j++) {
            var elementJson = solution.elements[j];
            var element = new Element(elementJson.id, this.getBaseById(elementJson.base), elementJson.x * this.gui.width, elementJson.y, this.gui);
            this.elements.push(element);
            this.gui.stage.addChild(element.view);
            element.makeConnectors();
            element.makeConnectorsInteractive();
        }

        for (var b = 0; b < this.bases.length; b++) {
            this.bases[b].updateIds();
        }

        for (var m = 0; m < solution.connections.length; m++) {
            var json = solution.connections[m];
            var from = json.fromelement ? this.getElementById(json.fromelement).outputs[json.from] : this.outputs[json.from];
            var to = json.toelement ? this.getElementById(json.toelement).inputs[json.to] : this.inputs[json.to];
            to.linkOutput = from;
            from.linkInputs.push(to);
            var connection = new Connection(from, to, this.gui, this);
            this.connections.push(connection);
            connection.deselect();
        }

        this.processor.calc();
      Scheme.prototype.loading=false;
        this.processor.submitResult();
    };

    Scheme.prototype.solution = function () {
        var result = {};
        result.elements = [];
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];
            result.elements.push({ id: element.id, base: element.base.id, x: 1.0 * element.view.x / this.gui.width, y: element.view.y });
        }
        result.connections = [];
        for (var j = 0; j < this.connections.length; j++) {
            var connection = this.connections[j];
            var fromElement = connection.from.element ? connection.from.element.id : null;
            var toElement = connection.to.element ? connection.to.element.id : null;
            result.connections.push({
                fromelement: fromElement,
                toelement: toElement,
                from: connection.from.number,
                to: connection.to.number
            });
        }
        result.input = [];
        for (var k = 0; k < this.outputs.length; k++) {
            var output = this.outputs[k];
            result.input.push(output.value);
        }
        result.straightConnections = this.gui.straightConnections;
        return result;
    };

    Scheme.prototype.reset = function () {};

    /**
     * Scheme processor for boolean
     * @param scheme - scheme module
     * @constructor
     */
    function BooleanProcessor(scheme) {

        this.value = 0;

        this.scheme = scheme;

        this.texts = [];

        this.loadInput = function (array) {
            this.value = parseInt(array.join(""), 2);
        };

        this.increase = function () {
            this.value++;
            if (this.value >= Math.pow(2, this.scheme.outputs.length)) {
                this.value = 0;
            }
            this.calc();
        };

        this.decrease = function () {
            this.value--;
            if (this.value < 0) {
                this.value = Math.pow(2, this.scheme.outputs.length) - 1;
            }
            this.calc();
        };

        this.calc = function () {
            this.resetConnectors();

            for (var j = 0; j < this.texts.length; j++) {
                this.scheme.gui.stage.removeChild(this.texts[j]);
            }

            var array = this.value.toString(2).split("");
            while (array.length < this.scheme.outputs.length) {
                array.unshift("0");
            }

            for (var k = 0; k < this.scheme.outputs.length; k++) {
                var output = this.scheme.outputs[k];
                output.value = +array[k];
                var text = new createjs.Text(array[k], this.scheme.gui.connectorRadius * 3 + "px Arial", "#96f3ff");
                text.x = output.view.x - this.scheme.gui.connectorRadius;
                text.y = output.view.y - this.scheme.gui.connectorRadius * 5;
                this.texts.push(text);
                this.scheme.gui.stage.addChild(text);
            }

            this.calcConnectors();

            this.updateConnectionsAndLabels();


        };

        this.submitResult = function(){
            debugger;
          if(this.scheme.loading){
            return;
          }
            var initial = [];
            initial[0] = this.scheme.outputs[0].value;
            initial[1] = this.scheme.outputs[1].value;

            var correct = 0;
            for (var i = 0; i < this.scheme.tests.length; i++) {
                var test = this.scheme.tests[i];
                this.scheme.outputs[0].value = test[0];
                this.scheme.outputs[1].value = test[1];
                this.scheme.inputs[0].value=-1;
                this.scheme.inputs[1].value=-1;

                this.calcConnectors();

                if(this.scheme.inputs[0].value==test[2]){
                    correct++;
                }

                if(this.scheme.inputs[1].value==test[3]){
                    correct++;
                }
            }

            this.scheme.kio.submitResult({
                correct: correct*100/8,
                elements:  this.scheme.elements.length
            });
        };

        this.calcConnectors = function () {
            var outputs = [];
            for (var p = 0; p < this.scheme.outputs.length; p++) {
                outputs.push(this.scheme.outputs[p]);
            }
            for (var n = 0; n < 500 && outputs.length > 0; n++) {
                var inputs = [];
                for (var i = 0; i < outputs.length; i++) {
                    var output = outputs[i];
                    for (var j = 0; j < output.linkInputs.length; j++) {
                        var input = output.linkInputs[j];
                        input.value = output.value;
                        inputs.push(input);
                    }
                }
                outputs = [];
                for (var k = 0; k < inputs.length; k++) {
                    var elemInput = inputs[k];
                    if (elemInput.element != null) {
                        if (elemInput.element.calc()) {
                            for (var m = 0; m < elemInput.element.outputs.length; m++) {
                                outputs.push(elemInput.element.outputs[m]);
                            }
                        }
                    }
                }
            }

            if (n == 500) {
                alert("Произошла ошибка при загрузке решения.");
            }
        };

        this.resetConnectors = function () {
            for (var i = 0; i < this.scheme.inputs.length; i++) {
                this.scheme.inputs[i].value = null;
            }

            for (var n = 0; n < this.scheme.elements.length; n++) {
                var element = this.scheme.elements[n];
                for (var m = 0; m < element.inputs.length; m++) {
                    element.inputs[m].value = null;
                }
                for (var l = 0; l < element.outputs.length; l++) {
                    element.outputs[l].value = null;
                }
            }
        };

        this.updateConnectionsAndLabels = function () {
            for (var i = 0; i < this.scheme.connections.length; i++) {
                var connection = this.scheme.connections[i];
                connection.color = "#96f3ff";
                if (connection.from.value == 1) {
                    connection.color = "#ffb137";
                }
                connection.deselect();
            }

            for (var j = 0; j < this.scheme.inputs.length; j++) {
                var input = this.scheme.inputs[j];
                if (input.value == 0 || input.value == 1) {
                    var text = new createjs.Text(input.value, this.scheme.gui.connectorRadius * 3 + "px Arial", "#96f3ff");
                    text.x = input.view.x - this.scheme.gui.connectorRadius;
                    text.y = input.view.y - this.scheme.gui.connectorRadius * 5;
                    this.texts.push(text);
                    this.scheme.gui.stage.addChild(text);
                }
            }
        };
    }

    /**
     * Basic element
     * Contains recoverable element for drag'n'drop
     * And element just for background
     *
     * @param id - id
     * @param inputNum - amount of inputs
     * @param outputNum - amount of outputs
     * @param func - function
     * @param name - name of element
     * @param gui - global gui
     * @param x - x position on the scene
     * @param y - y position on the scene
     * @param scheme - scheme module
     * @constructor
     */
    function Base(id, inputNum, outputNum, func, name, gui, x, y, scheme) {
        this.id = id;
        this.inputNum = inputNum;
        this.outputNum = outputNum;
        this.func = func;
        this.name = name;
        this.gui = gui;
        this.x = x;
        this.y = y;
        this.scheme = scheme;

        var base = this;
        this.elementBase = new Element(Element.counter + 1, base, x, y, base.gui);
        this.elementBase.makeConnectors();
        this.elementBase.onBase = true;
        gui.stage.addChild(this.elementBase.view);

        this.recoverElement();
    }

    Base.prototype.updateIds = function () {
        this.elementBase.id = ++Element.counter;
        this.element.id = ++Element.counter;
    };

    /**
     * recover draggable element with flag - onBase
     */
    Base.prototype.recoverElement = function () {
        this.element = new Element(Element.counter + 1, this, this.x, this.y, this.gui);
        this.element.makeConnectors();
        this.gui.stage.addChild(this.element.view);
        this.element.onBase = true;
    };

    /**
     * Scheme element
     * @param id - id
     * @param base - base element
     * @param x - x
     * @param y - y
     * @param gui - gui object
     * @constructor
     */
    function Element(id, base, x, y, gui) {
        this.id = id;
        this.onBase = false;
        Element.counter = Math.max(this.id, Element.counter);
        this.base = base;
        this.x = x;
        this.y = y;
        this.inputs = [];
        this.outputs = [];
        this.gui = gui;

        this.view = new createjs.Container();
        var height = Math.max(base.inputNum, base.outputNum) * gui.elemConnectorSpace;
        var shape = new createjs.Shape();
        shape.graphics.beginStroke("#96f3ff");
        shape.graphics.beginFill("#467a95");
        shape.graphics.drawRect(0, 0, gui.elemWidth, height);
        shape.x = gui.connectorFromElementSpace;
        this.view.addChild(shape);

        var text = new createjs.Text(base.name, gui.elemConnectorSpace * 0.75 + "px Arial", "#96f3ff");
        text.x = gui.connectorFromElementSpace + (gui.elemWidth - text.getBounds().width) / 2;
        text.y = (height - gui.elemConnectorSpace * 0.87) / 2;
        this.view.addChild(text);

        this.view.x = x;
        this.view.y = y;

        var elem = this;
        var view = this.view;
        view.cursor = "pointer";

        view.on('mousedown', function (e) {
            if (elem.onBase) {
                elem.onBase = false;
                elem.base.recoverElement();
                elem.makeConnectorsInteractive();
                elem.base.scheme.elements.push(elem);
                elem.base.scheme.processor.submitResult();
            }
            var posX = e.stageX;
            var posY = e.stageY;
            view.offset = { x: view.x - posX, y: view.y - posY };
            gui.stage.setChildIndex(view, gui.stage.numChildren - 1);
            elem.makeConnectorsInFront();
        });

        view.on("pressmove", function (evt) {
            view.x = evt.stageX + view.offset.x;
            view.y = evt.stageY + view.offset.y;
            var connection;
            for (var i = 0; i < elem.inputs.length; i++) {
                var input = elem.inputs[i];
                input.view.x = input.relativeX + view.x;
                input.view.y = input.relativeY + view.y;
                for (var k = 0; k < base.scheme.connections.length; k++) {
                    connection = base.scheme.connections[k];
                    if (connection.to == input) {
                        connection.deselect();
                    }
                }
            }
            for (var j = 0; j < elem.outputs.length; j++) {
                var output = elem.outputs[j];
                output.view.x = output.relativeX + view.x;
                output.view.y = output.relativeY + view.y;
                for (var l = 0; l < base.scheme.connections.length; l++) {
                    connection = base.scheme.connections[l];
                    if (connection.from == output) {
                        connection.deselect();
                    }
                }
            }
        });

        view.on("pressup", function () {
            if (view.y > gui.activeHeight) {
                base.scheme.removeElement(elem);
            }
        });
    }

    /**
     * Try calc and set value to outputs
     */
    Element.prototype.calc = function () {
        var input = [];
        var output = [];
        for (var i = 0; i < this.inputs.length; i++) {
            var elementInput = this.inputs[i];
            if (elementInput.value == null) {
                return false;
            } else {
                input.push(elementInput.value);
            }
        }
        eval(this.base.func);
        for (var j = 0; j < this.outputs.length; j++) {
            this.outputs[j].value = output[j];
        }
        return true;
    };

    /**
     * Make connectors and add to the stage
     */
    Element.prototype.makeConnectors = function () {
        var height = Math.max(this.base.inputNum, this.base.outputNum) * this.gui.elemConnectorSpace;

        var space = height / this.base.inputNum;
        for (var i = 0; i < this.base.inputNum; i++) {
            var input = new Connector(i, 0, this.gui, this.view.x, i * space + space / 2 + this.view.y, true, this);
            input.relativeX = 0;
            input.relativeY = i * space + space / 2;
            this.gui.stage.addChild(input.view);
            this.view.addChild(makeConnectorLine(this.gui.connectorRadius, i * space + space / 2, this.gui.connectorFromElementSpace - this.gui.connectorRadius));
            this.inputs.push(input);
        }

        space = height / this.base.outputNum;
        for (var j = 0; j < this.base.outputNum; j++) {
            var output = new Connector(j, 0, this.gui, this.gui.connectorFromElementSpace * 2 + this.gui.elemWidth + this.view.x, j * space + space / 2 + this.view.y, false, this);
            output.relativeX = this.gui.connectorFromElementSpace * 2 + this.gui.elemWidth;
            output.relativeY = j * space + space / 2;
            this.gui.stage.addChild(output.view);
            this.view.addChild(makeConnectorLine(this.gui.connectorFromElementSpace + this.gui.elemWidth, j * space + space / 2, this.gui.connectorFromElementSpace - this.gui.connectorRadius));
            this.outputs.push(output);
        }
    };

    /**
     * Removes connectors from the stage
     */
    Element.prototype.removeConnectors = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            this.gui.stage.removeChild(input.view);
        }
        for (var j = 0; j < this.outputs.length; j++) {
            var output = this.outputs[j];
            this.gui.stage.removeChild(output.view);
        }
    };

    /**
     * Make all connectors interactive
     */
    Element.prototype.makeConnectorsInteractive = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            input.makeInteractive();
        }
        for (var j = 0; j < this.outputs.length; j++) {
            var output = this.outputs[j];
            output.makeInteractive();
        }
    };

    /**
     * Move connectors in front of stage
     */
    Element.prototype.makeConnectorsInFront = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            this.gui.stage.setChildIndex(input.view, this.gui.stage.numChildren - 1);
        }
        for (var j = 0; j < this.outputs.length; j++) {
            var output = this.outputs[j];
            this.gui.stage.setChildIndex(output.view, this.gui.stage.numChildren - 1);
        }
    };

    Element.counter = 0;

    /**
     * Connector
     * Can be global or element
     * @param number
     * @param value
     * @param gui
     * @param x
     * @param y
     * @param input
     * @param element
     * @constructor
     */
    function Connector(number, value, gui, x, y, input, element) {
        this.number = number;
        this.value = value;
        this.view = new createjs.Container();
        this.view.x = x;
        this.view.y = y;
        this.input = input;
        this.element = element;
        this.gui = gui;
        this.locked = false;
        //positions from element
        this.relativeX = 0;
        this.relativeY = 0;
        //positions before drag
        this.initialX = 0;
        this.initialY = 0;
        //line while dragging
        this.line = null;

        // link to connected connectors
        this.linkOutput = null;
        this.linkInputs = [];

        this.deselect();
    }

    Connector.prototype.select = function () {
        if (this.shape) {
            this.view.removeChild(this.shape);
        }
        var shape = new createjs.Shape();
        if (this.input) {
            shape.graphics.beginStroke("#337ab7");
            shape.graphics.beginFill("#467a95");
        } else {
            shape.graphics.beginFill("#337ab7");
        }
        shape.graphics.drawCircle(0, 0, this.gui.connectorRadius * 1.25);
        this.view.addChild(shape);
        this.shape = shape;
    };

    Connector.prototype.deselect = function () {
        if (this.shape) {
            this.view.removeChild(this.shape);
        }
        var shape = new createjs.Shape();
        if (this.input) {
            shape.graphics.beginStroke("#96f3ff");
            shape.graphics.beginFill("#467a95");
        } else {
            shape.graphics.beginFill("#96f3ff");
        }
        shape.graphics.drawCircle(0, 0, this.gui.connectorRadius);
        this.view.addChild(shape);
        this.shape = shape;
    };

    /**
     * Make connector interactive
     */
    Connector.prototype.makeInteractive = function () {
        var view = this.view;
        view.cursor = 'pointer';

        var gui = this.gui;
        var connector = this;
        var line = this.line;

        view.on('mousedown', function (e) {
            if (connector.locked) {
                return;
            }
            var posX = e.stageX;
            var posY = e.stageY;
            view.offset = { x: this.x - posX, y: this.y - posY };
            gui.stage.setChildIndex(view, gui.stage.numChildren - 1);
            connector.initialX = view.x;
            connector.initialY = view.y;
        });

        view.on("pressmove", function (evt) {
            if (connector.locked) {
                return;
            }
            view.x = evt.stageX + view.offset.x;
            view.y = evt.stageY + view.offset.y;
            if (line != null) {
                gui.stage.removeChild(line);
            }

            line = new createjs.Shape();
            line.graphics.setStrokeStyle(1);
            line.graphics.beginStroke("#96f3ff");

            line.graphics.moveTo(view.x, view.y);
            line.graphics.lineTo(connector.input ? connector.initialX + gui.connectorRadius : connector.initialX - gui.connectorRadius, connector.initialY);
            connector.line = line;

            gui.stage.addChild(line);
            gui.stage.setChildIndex(view, gui.stage.numChildren - 1);

            connector.element.base.scheme.deselectAllConnectors(connector);
            var linking = connector.getLinking();
            if (linking != null) {
                linking.select();
            }
        });

        view.on("pressup", function () {
            if (connector.locked) {
                return;
            }
            connector.element.base.scheme.deselectAllConnectors();
            var linking = connector.getLinking();
            view.x = connector.initialX;
            view.y = connector.initialY;
            if (connector.line != null) {
                gui.stage.removeChild(connector.line);
            }
            if (linking != null) {
                var connection = null;
                if (connector.input) {
                    connector.linkOutput = linking;
                    linking.linkInputs.push(connector);
                    connection = new Connection(linking, connector, gui, connector.element.base.scheme);
                } else {
                    linking.linkOutput = connector;
                    connector.linkInputs.push(linking);
                    connection = new Connection(connector, linking, gui, connector.element.base.scheme);
                }
                connection.deselect();
                connector.element.base.scheme.connections.push(connection);
                connector.element.base.scheme.processor.calc();
              connector.element.base.scheme.processor.submitResult();
            }
        });
    };

    /**
     * Get linked connector near current
     */
    Connector.prototype.getLinking = function () {
        var scheme = this.element.base.scheme;
        for (var i = 0; i < scheme.elements.length; i++) {
            var element = scheme.elements[i];
            if (this.input) {
                for (var j = 0; j < element.outputs.length; j++) {
                    var output = element.outputs[j];
                    if (this.isNear(output) && element != this.element) {
                        return output;
                    }
                }
            } else {
                for (var k = 0; k < element.inputs.length; k++) {
                    var input = element.inputs[k];
                    if (this.isNear(input) && element != this.element) {
                        return input;
                    }
                }
            }
        }
        if (this.input) {
            for (var m = 0; m < scheme.outputs.length; m++) {
                var globalOutput = scheme.outputs[m];
                if (this.isNear(globalOutput)) {
                    return globalOutput;
                }
            }
        }
        for (var n = 0; n < scheme.inputs.length; n++) {
            var globalInput = scheme.inputs[n];
            if (this.isNear(globalInput)) {
                return globalInput;
            }
        }
        return null;
    };

    Connector.prototype.lock = function () {
        this.locked = true;
        this.view.cursor = 'default';
    };

    Connector.prototype.unlock = function () {
        this.locked = false;
        if (this.element) {
            this.view.cursor = 'pointer';
        }
    };

    /**
     * Is connector near to another
     * @param another
     */
    Connector.prototype.isNear = function (another) {
        var x1 = this.view.x;
        var y1 = this.view.y;
        var x2 = another.view.x;
        var y2 = another.view.y;
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < this.gui.connectorRadius;
    };

    /**
     * Connection between connectors
     * @param from - connector 1
     * @param to - connector 2
     * @param gui - gui object
     * @param scheme - scheme module
     * @constructor
     */
    function Connection(from, to, gui, scheme) {
        this.from = from;
        this.to = to;
        this.gui = gui;
        this.scheme = scheme;
        this.line = null;
        this.selectLine = null;
        this.background = null;
        this.to.view.visible = false;
        this.from.lock();
        this.color = "#96f3ff";
    }

    Connection.prototype.deselect = function () {
        if (this.line != null) {
            this.gui.stage.removeChild(this.line);
            this.gui.stage.removeChild(this.background);
            this.gui.stage.removeChild(this.selectLine);
        }
        var background = new createjs.Shape();
        var line = new createjs.Shape();
        var selectLine = new createjs.Shape();
        line.graphics.setStrokeStyle(1);
        selectLine.graphics.setStrokeStyle(1);
        background.graphics.setStrokeStyle(5);
        line.graphics.beginStroke(this.color);
        selectLine.graphics.beginStroke("darkred");
        background.graphics.beginStroke("#96f3ff");
        line.graphics.moveTo(this.from.view.x, this.from.view.y);
        selectLine.graphics.moveTo(this.from.view.x, this.from.view.y);
        background.graphics.moveTo(this.from.view.x, this.from.view.y);
        if (!this.gui.straightConnections) {
            line.graphics.lineTo(this.from.view.x, this.to.view.y);
            selectLine.graphics.lineTo(this.from.view.x, this.to.view.y);
            background.graphics.lineTo(this.from.view.x, this.to.view.y);
            line.graphics.lineTo(this.to.view.x + this.gui.connectorRadius, this.to.view.y);
            selectLine.graphics.lineTo(this.to.view.x + this.gui.connectorRadius, this.to.view.y);
            background.graphics.lineTo(this.to.view.x + this.gui.connectorRadius, this.to.view.y);
        } else {
            line.graphics.lineTo(this.to.view.x + this.gui.connectorRadius, this.to.view.y);
            selectLine.graphics.lineTo(this.to.view.x + this.gui.connectorRadius, this.to.view.y);
            background.graphics.lineTo(this.to.view.x + this.gui.connectorRadius, this.to.view.y);
        }
        background.alpha = 0.01;
        selectLine.alpha = 0.01;
        this.line = line;
        this.background = background;
        this.selectLine = selectLine;
        this.gui.stage.addChild(background);
        this.gui.stage.setChildIndex(background, 0);
        this.gui.stage.addChild(line);
        this.gui.stage.setChildIndex(line, 1);
        this.gui.stage.addChild(selectLine);
        this.gui.stage.setChildIndex(selectLine, 2);
        background.cursor = "pointer";

        var stage = this.gui.stage;
        var connection = this;
        background.on("mouseover", function (evt) {
            var cross = new createjs.Shape();
            cross.graphics.setStrokeStyle(2);
            cross.graphics.beginStroke("darkred");
            cross.graphics.moveTo(evt.stageX - 5, evt.stageY - 5);
            cross.graphics.lineTo(evt.stageX + 5, evt.stageY + 5);
            cross.graphics.moveTo(evt.stageX + 5, evt.stageY - 5);
            cross.graphics.lineTo(evt.stageX - 5, evt.stageY + 5);
            stage.addChild(cross);
            connection.cross = cross;
            connection.selectLine.alpha = 0.5;
        });

        background.on("mouseout", function () {
            stage.removeChild(connection.cross);
            connection.selectLine.alpha = 0.01;
        });

        background.on("click", function () {
            connection.scheme.removeConnection(connection);
        });
    };

    /**
     * Creates line for connector in specific place
     * @param x
     * @param y
     * @param length - length of the line
     */
    function makeConnectorLine(x, y, length) {
        var line = new createjs.Shape();
        line.y = y;
        line.x = x;
        line.graphics.setStrokeStyle(1);
        line.graphics.beginStroke("#96f3ff");
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(length, 0);
        return line;
    }

    return {
        magic: function magic() {
            return new Scheme();
        }
    };
}();

/***/ })

/******/ });
//# sourceMappingURL=task_scheme.js.map
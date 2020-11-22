export class ValuesInput {
    constructor(problem, ...params) { // each param is {name, type}
        this.params = params;
        this.name2input = {};

        this.initInterface(problem, params);
    }

    initInterface(problem, params) {
        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-values-list';

        for (let {name, title/*, type*/} of params) {
            let inp = this.createInput(name, 10);

            let label = document.createElement('span');
            label.innerHTML = title;

            this.domNode.appendChild(label);
            this.domNode.appendChild(inp);
        }
    }

    set values(obj) {
        for (let {name} of this.params) {
            $(this.name2input[name]).val(obj[name]);
        }
    }

    get values() {
        let obj = {};

        for (let {name, round_mul, min, max} of this.params) {
            let val_str = $(this.name2input[name]).val();
            //if is empty
            if (/^\s*$/.test(val_str))
                return null;

            let val = +val_str;
            if (isNaN(val))
                return null;
            if (min != null && val < min || max != null && val > max)
                return null;
            if (Math.abs(val * round_mul - Math.round(val * round_mul)) > 1e-6) //if val * round_mul is not integer
                return null;
            obj[name] = val;
        }

        return obj;
    }

    input_changed() {
        if (this.change_handler)
            this.change_handler();
    }

    createInput(name, size, title) {
        let inp = document.createElement('input');

        $(inp)
            .attr('maxlength', size).attr('size', size).attr('type', 'text')
            .attr('value', '0').attr('title', title).change(this.input_changed.bind(this));

        this.name2input[name] = inp;

        return inp;
    }

    createSelect(name, options) {
        let selectDom = document.createElement('select');
        selectDom.name = name;

        let ind = 1;
        for (let option of options) {
            let op_element = document.createElement('option');
            op_element.value = ind++;
            op_element.innerText = option;
            selectDom.appendChild(op_element);
        }

        this.name2input[name] = selectDom;

        $(selectDom).change(this.input_changed.bind(this));

        return selectDom;
    }
}

export class InitialValuesInput extends ValuesInput {
    constructor(problem, v_round_mul) {
        super(
            problem,
            {name: 'initial_theta', round_mul: 1, min: -60, max: 60},
            {name: 'initial_v', round_mul: v_round_mul, min: 0, max: 20},
            {name: 'initial_pose', round_mul: 1, min: null, max: null}
        );
    }

    initInterface(problem) {
        //Прыгнуть под углом *** градусов со скоростью *** м/c в позиции

        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-initial-values-list';

        let sp1 = document.createElement('span');
        sp1.innerText = problem.message('Прыгнуть под углом');
        let sp2 = document.createElement('span');
        sp2.innerText = problem.message('градусов со скоростью');
        let sp3 = document.createElement('span');
        sp3.innerText = problem.message('м/c в позиции');

        let inp1 = this.createInput('initial_theta', 5);
        let inp2 = this.createInput('initial_v', 5);
        let inp3 = this.createSelect('initial_pose', [problem.message('Первая поза'), problem.message('Вторая поза'), problem.message('Третья поза')]);

        this.domNode.appendChild(sp1);
        this.domNode.appendChild(inp1);
        this.domNode.appendChild(sp2);
        this.domNode.appendChild(inp2);
        this.domNode.appendChild(sp3);
        this.domNode.appendChild(inp3);
    }
}

export class IntermediateValuesInput extends ValuesInput {
    constructor(problem, time_round_mul) {
        super(
            problem,
            {name: 'next_time', round_mul: time_round_mul, min: 0, max: 60},
            {name: 'next_pose', round_mul: 1, min: null, max: null}
        );
    }

    initInterface(problem) {
        //Прыгнуть под углом *** градусов со скоростью *** м/c в позиции

        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-intermediate-values-list';

        let sp1 = document.createElement('span');
        sp1.innerText = problem.message('В секунду');
        let sp2 = document.createElement('span');
        sp2.innerText = problem.message('изменить позу на');

        let inp1 = this.createInput('next_time', 5);
        let inp2 = this.createSelect('next_pose', [problem.message('Первая поза'), problem.message('Вторая поза'), problem.message('Третья поза')]);

        this.domNode.appendChild(sp1);
        this.domNode.appendChild(inp1);
        this.domNode.appendChild(sp2);
        this.domNode.appendChild(inp2);
    }
}

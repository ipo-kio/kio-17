export class ValuesInput {
    constructor(...params) { // each param is {name, type}
        this.params = params;
        this.name2input = {};

        this.initInterface(params);
    }

    initInterface(params) {
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

        for (let {name, round_mul} of this.params) {
            let val = +$(this.name2input[name]).val();
            if (isNaN(val))
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
    constructor(v_round_mul) {
        super(
            {name: 'initial_theta', round_mul: 1},
            {name: 'initial_v', round_mul: v_round_mul},
            {name: 'initial_pose', round_mul: 1}
        );
    }

    initInterface() {
        //Прыгнуть под углом *** градусов со скоростью *** м/c в позиции

        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-initial-values-list';

        let sp1 = document.createElement('span');
        sp1.innerText = 'Прыгнуть под углом';
        let sp2 = document.createElement('span');
        sp2.innerText = 'градусов со скоростью';
        let sp3 = document.createElement('span');
        sp3.innerText = 'м/c в позиции';

        let inp1 = this.createInput('initial_theta', 5);
        let inp2 = this.createInput('initial_v', 5);
        let inp3 = this.createSelect('initial_pose', ['Первая поза', 'Вторая поза', 'Третья поза']);

        this.domNode.appendChild(sp1);
        this.domNode.appendChild(inp1);
        this.domNode.appendChild(sp2);
        this.domNode.appendChild(inp2);
        this.domNode.appendChild(sp3);
        this.domNode.appendChild(inp3);
    }
}

export class IntermediateValuesInput extends ValuesInput {
    constructor(time_round_mul) {
        super({name: 'next_time', round_mul: time_round_mul}, {name: 'next_pose', round_mul: 1});
    }

    initInterface() {
        //Прыгнуть под углом *** градусов со скоростью *** м/c в позиции

        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-intermediate-values-list';

        let sp1 = document.createElement('span');
        sp1.innerText = 'В секунду';
        let sp2 = document.createElement('span');
        sp2.innerText = 'изменить позу на';

        let inp1 = this.createInput('next_time', 5);
        let inp2 = this.createSelect('next_pose', ['Первая поза', 'Вторая поза', 'Третья поза']);

        this.domNode.appendChild(sp1);
        this.domNode.appendChild(inp1);
        this.domNode.appendChild(sp2);
        this.domNode.appendChild(inp2);
    }
}
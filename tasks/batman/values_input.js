export class ValuesInput {
    constructor(...params) { // each param is {name, type}
        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-values-list';

        this.name2input = {};

        for (let {name, title/*, type*/} of params) {
            let inp = document.createElement('input');
            inp.type = 'text';
            inp.size = 10;
            inp.value = '0';
            this.name2input[name] = inp;

            let label = document.createElement('span');
            label.innerHTML = title;

            this.domNode.appendChild(label);
            this.domNode.appendChild(inp);
        }

        this.params = params;
    }

    set values(obj) {
        for (let {name} of this.params) {
            this.name2input[name].value = obj[name];
        }
    }

    get values() {
        let obj = {};

        for (let {name} of this.params) {
            obj[name] = +this.name2input[name].value;
        }

        return obj;
    }

}
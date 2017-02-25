export class ListOfElements {

    constructor(get_new_element, elements_list) {
        this.get_new_element = get_new_element;

        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-list-of-elements';

        this.itemsElement = document.createElement('div');
        this.domNode.appendChild(this.itemsElement);

        for (let element of elements_list)
            this.add_element(element);

        this.elements_list = elements_list;

        let add_element = document.createElement('div');
        add_element.class = 'controls';
        this.domNode.appendChild(add_element);
        let add_link = document.createElement('a');
        add_link.href = '#';
        add_link.innerText = '+';
        add_element.appendChild(add_link);

        $(add_link).click(e => {
            let new_element = get_new_element();
            this.add_element(new_element);
        });
    }

    add_element(element) {
        let outer = document.createElement('div');

        let left = document.createElement('div');
        let right = document.createElement('div');

        outer.className = 'item';
        left.className = 'left';
        right.className = 'right';

        outer.appendChild(right);
        outer.appendChild(left);

        let remove_link = document.createElement('a');
        remove_link.href = '#';
        remove_link.innerText = '-';

        left.appendChild(element.domNode);
        right.appendChild(remove_link);

        this.elements_list.push(element);
        this.itemsElement.appendChild(outer);

        $(remove_link).click(e => {
            for (let i = 0; i < this.elements_list.length; i++)
                if (this.elements_list[i] == element)
                    this.elements_list.splice(i, 1);

            this.itemsElement.removeChild(outer);
        });
    }
}

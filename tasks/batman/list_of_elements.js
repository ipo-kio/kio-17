export class ListOfElements {

    constructor(get_new_element, elements_list, add_element_text, remove_element_text) {
        this.get_new_element = get_new_element;
        this.remove_element_text = remove_element_text;

        this.add_remove_extra_action_suspend = false;

        this.domNode = document.createElement('div');
        this.domNode.className = 'kio-batman-list-of-elements';

        this.itemsElement = document.createElement('div');
        this.domNode.appendChild(this.itemsElement);

        for (let element of elements_list)
            this.add_element(element);

        this.elements_list = elements_list;

        let add_element = document.createElement('div');
        add_element.className = 'controls';
        this.domNode.appendChild(add_element);
        let add_link = document.createElement('a');
        add_link.href = '#';
        add_link.innerText = add_element_text;
        add_element.appendChild(add_link);

        $(add_link).click(e => {
            let new_element = get_new_element();
            this.add_element(new_element);
        });
    }

    clear_elements(element) {
        this.elements_list.splice(0, this.elements_list.length);

        //http://stackoverflow.com/a/3955238/1826120
        while (this.itemsElement.firstChild) {
            this.itemsElement.removeChild(this.itemsElement.firstChild);
        }

        this.fire_extra_action();
    }

    add_element(element) {
        let outer = document.createElement('div');

        let left = document.createElement('div');
        let right = document.createElement('div');

        outer.className = 'item';
        left.className = 'left';
        right.className = 'right';

        outer.appendChild(left);
        outer.appendChild(right);

        let remove_link = document.createElement('a');
        remove_link.href = '#';
        remove_link.innerText = this.remove_element_text;

        left.appendChild(element.domNode);
        right.appendChild(remove_link);

        this.elements_list.push(element);
        this.itemsElement.appendChild(outer);

        $(remove_link).click(e => {
            for (let i = 0; i < this.elements_list.length; i++)
                if (this.elements_list[i] == element)
                    this.elements_list.splice(i, 1);

            this.itemsElement.removeChild(outer);

            this.fire_extra_action();
        });

        this.fire_extra_action();
    }

    fire_extra_action() {
        if (this.add_remove_extra_action && !this.add_remove_extra_action_suspend)
            this.add_remove_extra_action();
    }
}

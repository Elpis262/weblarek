import { Component } from "./Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Basket extends Component<{ items: HTMLElement[], total: number }> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._list = ensureElement('.basket__list', container);
        this._total = ensureElement('.basket__price', container);
        this._button = ensureElement('.basket__button', container) as HTMLButtonElement;

        this._button.addEventListener('click', () => {
            this.events.emit('basket:openOrder');
        });
    }

    set items(value: HTMLElement[]) {
        if (value.length > 0) {
            this._list.replaceChildren(...value);
        } else {
            this._list.replaceChildren();
        }
    }

    set total(value: number) {
        this._total.textContent = `${value} синапсов`;
    }

    set selected(value: boolean) {
        this.setDisabled(this._button, !value);
    }
}
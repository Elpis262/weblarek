import { Component } from "./Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Page extends Component<{ catalog: HTMLElement[], counter: number }> {
    protected _catalog: HTMLElement;
    protected _counter: HTMLElement;
    protected _basket: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._catalog = ensureElement('.gallery', container);
        this._counter = ensureElement('.header__basket-counter', container);
        this._basket = ensureElement('.header__basket', container);

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set catalog(value: HTMLElement[]) {
        this._catalog.replaceChildren(...value);
    }

    set counter(value: number) {
        this._counter.textContent = String(value);
    }

    set locked(value: boolean) {
        if (value) {
            this.container.classList.add('page__wrapper_locked');
        } else {
            this.container.classList.remove('page__wrapper_locked');
        }
    }
}
import { Component } from "./Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Modal extends Component<{}> {
    protected _closeBtn: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._closeBtn = ensureElement('.modal__close', container) as HTMLButtonElement;
        this._content = ensureElement('.modal__content', container);

        this._closeBtn.addEventListener('click', () => this.close());
        container.addEventListener('click', (e) => {
            if (e.target === container) this.close();
        });
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this._content.replaceChildren();
        this.events.emit('modal:close');
    }
}
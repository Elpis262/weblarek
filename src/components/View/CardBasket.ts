import { Card } from "./Card";
import { IProduct } from "../../types";

export class CardBasket extends Card<IProduct> {
    protected _index: HTMLElement;
    protected _deleteBtn: HTMLButtonElement;

    constructor(container: HTMLElement, actions: Record<string, Function>) {
        super(container);
        this._index = container.querySelector('.basket__item-index')!;
        this._deleteBtn = container.querySelector('.basket__item-delete') as HTMLButtonElement;

        this._deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            actions.onClick();
        });
    }

    set index(value: number) {
        this._index.textContent = String(value);
    }
}
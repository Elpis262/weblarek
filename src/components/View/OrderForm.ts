import { Form } from "./Form";
import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class OrderForm extends Form<IBuyer> {
    protected _cardBtn: HTMLButtonElement;
    protected _cashBtn: HTMLButtonElement;
    protected _addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._cardBtn = container.querySelector('button[name="card"]') as HTMLButtonElement;
        this._cashBtn = container.querySelector('button[name="cash"]') as HTMLButtonElement;
        this._addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;

        this._cardBtn.addEventListener('click', () => this.selectPayment('card'));
        this._cashBtn.addEventListener('click', () => this.selectPayment('cash'));
    }

    private selectPayment(type: TPayment) {
        this.events.emit('form:change', { field: 'payment', value: type });
    }

    set payment(value: TPayment | '') {
        this._cardBtn.classList.toggle('button_alt-active', value === 'card');
        this._cashBtn.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this._addressInput.value = value;
    }
}
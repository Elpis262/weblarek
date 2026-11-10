import { Component } from "./Component";
import { IEvents } from "../base/Events";
import { IValidationErrors } from "../../types";

export interface IFormState {
    valid: boolean;
    errors: string;
}

export abstract class Form<T> extends Component<T & IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this._submit = container.querySelector('button[type=submit]') as HTMLButtonElement;
        this._errors = container.querySelector('.form__errors')!;

        container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            this.events.emit('form:change', {
                field: target.name,
                value: target.value
            });
        });

        container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${container.name}:submit`);
        });
    }

    set valid(value: boolean) {
        this.setDisabled(this._submit, !value);
    }

    set errors(value: string) {
        this._errors.textContent = value;
    }
}
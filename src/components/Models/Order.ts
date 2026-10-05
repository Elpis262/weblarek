import { IBuyer, TPayment, IValidationErrors } from "../../types";

export class Order {
    private _payment: TPayment | '' = '';
    private _email: string = '';
    private _phone: string = '';
    private _address: string = '';

    set(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this._payment = data.payment;
        if (data.email !== undefined) this._email = data.email;
        if (data.phone !== undefined) this._phone = data.phone;
        if (data.address !== undefined) this._address = data.address;
    }

    getAll(): IBuyer {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address,
        };
    }

    clear(): void {
        this._payment = '';
        this._email = '';
        this._phone = '';
        this._address = '';
    }

    validate(): IValidationErrors {
        const errors: IValidationErrors = {};
        if (!this._payment) errors.payment = 'Не выбран вид оплаты';
        if (!this._email) errors.email = 'Укажите почту';
        if (!this._phone) errors.phone = 'Укажите номер телефона';
        if (!this._address) errors.address = 'Укажите адрес доставки';
        return errors;
    }
}
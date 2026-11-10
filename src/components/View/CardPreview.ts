import { Card } from "./Card";
import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";

export class CardPreview extends Card<IProduct> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement | null;

    constructor(container: HTMLElement, actions: Record<string, Function>) {
        super(container);
        this._description = container.querySelector('.card__text')!;
        this._button = container.querySelector('.card__button') as HTMLButtonElement;
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._category = container.querySelector('.card__category');

        this._button.addEventListener('click', () => actions.onClick());
    }

    set image(value: string) {
        this._image.src = value;
        this._image.alt = this._title.textContent || 'Изображение товара';
    }

    set category(value: string) {
        if (this._category) {
            this._category.textContent = value;
            Object.values(categoryMap).forEach(cls => this._category!.classList.remove(cls));
            if (categoryMap[value as keyof typeof categoryMap]) {
                this._category.classList.add(categoryMap[value as keyof typeof categoryMap]);
            }
        }
    }

    set description(value: string) {
        this._description.textContent = value;
    }

    set buttonState(data: { text: string; disabled: boolean }) {
        this._button.textContent = data.text;
        this.setDisabled(this._button, data.disabled);
    }
}
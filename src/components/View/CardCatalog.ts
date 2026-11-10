import { Card } from "./Card";
import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";

export class CardCatalog extends Card<IProduct> {
    protected _image: HTMLImageElement;
    protected _category: HTMLElement | null;

    constructor(container: HTMLElement, actions: Record<string, Function>) {
        super(container);
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._category = container.querySelector('.card__category');
        
        this.container.addEventListener('click', () => actions.onClick());
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
}
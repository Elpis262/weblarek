import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
    private _items: IProduct[] = [];
    private _selectedProduct: IProduct | null = null;

    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setItems(items: IProduct[]): void {
        this._items = items;
        this.events.emit('catalog:changed', { items: this._items });
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getItemById(id: string): IProduct | undefined {
        return this._items.find((item) => item.id === id);
    }

    setSelected(product: IProduct | null): void {
        this._selectedProduct = product;
        this.events.emit('preview:changed', { product: this._selectedProduct });
    }

    getSelected(): IProduct | null {
        return this._selectedProduct;
    }
}


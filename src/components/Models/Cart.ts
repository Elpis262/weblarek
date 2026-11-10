import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
    private _items: IProduct[] = [];

    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    getItems(): IProduct[] {
        return this._items;
    }

    addItem(item: IProduct): void {
        if (this.hasItem(item.id)) return;
        this._items.push(item);
        this.events.emit('cart:changed', { items: this._items });
    }

    removeItem(id: string): void {
        const initialLength = this._items.length;
        this._items = this._items.filter((item) => item.id !== id);
        if (this._items.length !== initialLength) {
            this.events.emit('cart:changed', { items: this._items });
        }
    }

    clear(): void {
        this._items = [];
        this.events.emit('cart:changed', { items: this._items });
    }

    getTotalPrice(): number {
        return this._items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    getTotalCount(): number {
        return this._items.length;
    }

    hasItem(id: string): boolean {
        return this._items.some((item) => item.id === id);
    }
}


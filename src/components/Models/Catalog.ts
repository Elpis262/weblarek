import { IProduct } from "../../types";

export class Catalog {
    private _items: IProduct[] = [];
    private _selectedProduct: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this._items = items;
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getItemById(id: string): IProduct | undefined {
        return this._items.find((item) => item.id === id);
    }

    setSelected(product: IProduct | null): void {
        this._selectedProduct = product;
    }

    getSelected(): IProduct | null {
        return this._selectedProduct;
    }
}


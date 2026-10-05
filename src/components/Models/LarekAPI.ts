import { Api } from "../base/Api";
import { IProductListResponse, IProduct, IOrder, IOrderResult } from '../../types';


export class LarekAPI{
    private _api: Api;
    constructor(api: Api) {
        this._api = api;
    }

    getProductList(): Promise<IProductListResponse> {
        return this._api.get('/product/');
    }

    getProductById(id: string): Promise<IProduct> {
        return this._api.get(`/product/${id}`);
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this._api.post('/order/', order);
    }
}
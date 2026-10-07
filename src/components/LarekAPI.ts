import { IProductListResponse, IApi, IOrder, IOrderResult } from '../types';


export class LarekAPI{
    private _api: IApi;
    constructor(api: IApi) {
        this._api = api;
    }

    getProductList(): Promise<IProductListResponse> {
        return this._api.get('/product/');
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this._api.post('/order/', order);
    }
}

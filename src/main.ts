import './scss/styles.scss';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Order } from './components/Models/Order';
import { LarekAPI } from './components/LarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { IProduct, IOrder } from './types';

import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { CardBasket } from './components/View/CardBasket';
import { Modal } from './components/View/Modal';
import { Basket } from './components/View/Basket';
import { Page } from './components/View/Page';
import { OrderForm } from './components/View/OrderForm';
import { ContactsForm } from './components/View/ContactsForm';
import { Success } from './components/View/Success';

const events = new EventEmitter();

const catalogModel = new Catalog(events);
const cartModel = new Cart(events);
const orderModel = new Order(events);

const api = new Api(API_URL);
const larekAPI = new LarekAPI(api);

const modal = new Modal(document.querySelector('#modal-container')!, events);
const page = new Page(document.querySelector('.page__wrapper')!, events);

const basketView = new Basket(cloneTemplate('#basket') as HTMLElement, events);
const orderFormView = new OrderForm(cloneTemplate('#order') as HTMLFormElement, events);
const contactsFormView = new ContactsForm(cloneTemplate('#contacts') as HTMLFormElement, events);
const successView = new Success(cloneTemplate('#success') as HTMLElement, events);

const cardPreview = new CardPreview(cloneTemplate('#card-preview') as HTMLElement, {
    onClick: () => events.emit('card:buy')
});

function renderBasket() {
    const items = cartModel.getItems();
    basketView.total = cartModel.getTotalPrice();
    basketView.selected = items.length > 0;
    basketView.items = items.map((item, index) => {
        const card = new CardBasket(cloneTemplate('#card-basket') as HTMLElement, {
            onClick: () => events.emit('card:remove', { id: item.id })
        });
        card.title = item.title;
        card.price = item.price;
        card.index = index + 1;
        return card.render();
    });
}

events.on('catalog:changed', () => {
    const items = catalogModel.getItems();
    page.catalog = items.map(item => {
        const card = new CardCatalog(cloneTemplate('#card-catalog') as HTMLElement, {
            onClick: () => events.emit('card:select', { id: item.id })
        });
        card.title = item.title;
        card.image = item.image;
        card.category = item.category;
        card.price = item.price;
        return card.render();
    });
    page.counter = cartModel.getTotalCount();
});

events.on('cart:changed', () => {
    page.counter = cartModel.getTotalCount();
    renderBasket();
});

events.on('preview:changed', () => {
    const product = catalogModel.getSelected();
    if (!product) return;

    const inBasket = cartModel.hasItem(product.id);
    if (!product.price) {
        cardPreview.buttonState = { text: 'Недоступно', disabled: true };
    } else if (inBasket) {
        cardPreview.buttonState = { text: 'Удалить из корзины', disabled: false };
    } else {
        cardPreview.buttonState = { text: 'Купить', disabled: false };
    }

    cardPreview.title = product.title;
    cardPreview.image = product.image;
    cardPreview.category = product.category;
    cardPreview.price = product.price;
    cardPreview.description = product.description;

    modal.content = cardPreview.render();
    modal.open();
});

events.on('card:select', (data: { id: string }) => {
    const product = catalogModel.getItemById(data.id);
    if (product) {
        catalogModel.setSelected(product);
    }
});

events.on('card:buy', () => {
    const product = catalogModel.getSelected();
    if (!product) return;

    if (cartModel.hasItem(product.id)) {
        cartModel.removeItem(product.id);
    } else {
        cartModel.addItem(product);
    }
    modal.close();
});

events.on('basket:open', () => {
    renderBasket();
    modal.content = basketView.render();
    modal.open();
});

events.on('card:remove', (data: { id: string }) => {
    cartModel.removeItem(data.id);
});

events.on('basket:openOrder', () => {
    modal.content = orderFormView.render();
});

events.on('form:change', (data: { field: string, value: string }) => {
    orderModel.set({ [data.field]: data.value });
});

events.on('order:changed', () => {
    const buyer = orderModel.getAll();
    const errors = orderModel.validate();

    orderFormView.payment = buyer.payment;
    orderFormView.address = buyer.address;
    orderFormView.valid = !(errors.payment || errors.address);
    orderFormView.errors = [errors.payment, errors.address].filter(Boolean).join('; ');

    contactsFormView.email = buyer.email;
    contactsFormView.phone = buyer.phone;
    contactsFormView.valid = !(errors.email || errors.phone);
    contactsFormView.errors = [errors.email, errors.phone].filter(Boolean).join('; ');
});

events.on('order:submit', () => {
    modal.content = contactsFormView.render();
});

events.on('contacts:submit', () => {
    const orderData: IOrder = {
        ...orderModel.getAll(),
        total: cartModel.getTotalPrice(),
        items: cartModel.getItems().map(item => item.id)
    };

    larekAPI.orderProducts(orderData)
        .then(result => {
            successView.total = result.total;
            modal.content = successView.render();
            cartModel.clear();
            orderModel.clear();
        })
        .catch(err => {
            console.error('Ошибка при оформлении заказа:', err);
            alert('Ошибка при оформлении заказа');
        });
});

events.on('success:close', () => {
    modal.close();
});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
    catalogModel.setSelected(null);
});

larekAPI.getProductList()
    .then(data => {
        const itemsWithCdn = data.items.map(item => ({
            ...item,
            image: CDN_URL + item.image
        }));
        catalogModel.setItems(itemsWithCdn);
    })
    .catch(err => {
        console.error('Ошибка при получении товаров:', err);
    });
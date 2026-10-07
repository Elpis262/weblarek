import './scss/styles.scss';
import { Api } from './components/base/Api';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Order } from './components/Models/Order';
import { LarekAPI } from './components/LarekAPI';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';


console.log('Тестирование каталога')
const catalogModel = new Catalog();
catalogModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', catalogModel.getItems());
console.log('Количество товаров:', catalogModel.getItems().length);
console.log('Товар по ID:', catalogModel.getItemById(catalogModel.getItems()[0].id));

console.log('Тестирование корзины')
const cartModel = new Cart();
const firstProduct = catalogModel.getItems()[0];
console.log('Добавляем товар в корзину:', firstProduct.title);
cartModel.addItem(firstProduct);
cartModel.addItem(firstProduct);
console.log('Количество товаров в корзине:', cartModel.getTotalCount());
console.log('Общая стоимость:', cartModel.getTotalPrice());
console.log('Товар есть в корзине:', cartModel.hasItem(firstProduct.id));
console.log('Удаляем товар из корзины');
cartModel.removeItem(firstProduct.id);
console.log('Количество товаров после удаления:', cartModel.getTotalCount());

console.log('Тестирование заказа')
const orderModel = new Order();
console.log('Частичное обновление (только адрес):');
orderModel.set({ address: 'Москва, ул. Пушкина, д. 10' });
console.log('Данные заказа:', orderModel.getAll());
console.log('Ошибки валидации:', orderModel.validate());
console.log('Заполняем все поля:');
orderModel.set({ 
    payment: 'card', 
    email: 'test@gmail.com', 
    phone: '+79750967733' 
});
console.log('Ошибки валидации после заполнения:', orderModel.validate());
orderModel.clear();
console.log('Данные после очистки:', orderModel.getAll());

console.log('Тестирование Api');
const api = new Api(API_URL);
const larekAPI = new LarekAPI(api);
larekAPI.getProductList()
    .then((data) => {
        console.log('Данные получены с сервера');
        console.log('Всего товаров:', data.total);
        console.log('Первые 3 товара:', data.items.slice(0, 3));
        catalogModel.setItems(data.items);
        console.log('Каталог обновлен данными с сервера');
        console.log('Первый товар из обновленного каталога:', catalogModel.getItems()[0]);
    })
    .catch((err) => {
        console.error('Ошибка при получении данных с сервера:', err);
    });
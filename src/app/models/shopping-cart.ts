import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(
    public itemsMap: { [productId: string]: ShoppingCartItem }
  ){
    for (let productId in this.itemsMap) {
      let item = itemsMap[productId];
      let cartItem = new ShoppingCartItem(item.product, item.quantity);

      this.items.push(cartItem);
    }
  }

  get totalItemsCount () {
    let count = 0;

    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }

    return count;
  }

  get totalPrice() {
    return this.items.reduce((p, c) => p + c.totalPrice, 0);
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }
}
import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(
    private itemsMap: { [productId: string]: ShoppingCartItem }
  ){
    this.itemsMap = this.itemsMap || { };

    for (let productId in this.itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({...item, id: productId}));
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
    if (!product) { return 0; }

    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }
}
import { Product } from "./product";

export class ShoppingCartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  gender: string;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async getCart() {
    let cartId = await this.getOrCreateCartId();

    return this.db.object<any>('/shopping-carts/' + cartId).valueChanges()
      .map(x => {
        let y = x || { items: {} };
        return new ShoppingCart(y.items);
      });
  }
  
  async addToCart(product: Product) {
    await this.updateItem(product, 1);
  }
  
  async removeFromCart(product: Product) {
    await this.updateItem(product, -1);
  }
  
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) { return cartId; }
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);

    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$.snapshotChanges().take(1).subscribe(item => {
      item$.update({ 
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        gender: product.gender, 
        quantity: (item.payload.exists() ? item.payload.val().quantity : 0) + change
      });
    });
  }

}

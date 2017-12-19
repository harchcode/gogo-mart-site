import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();

    return this.db.object<any>('/shopping-carts/' + cartId).valueChanges();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    
    if (cartId) { return cartId; }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);

    return result.key;
  }

  async addToCart(product: Product) {
    await this.updateItemQuantity(product, 1);
  }
  
  async removeFromCart(product: Product) {
    await this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$.snapshotChanges().take(1).subscribe(item => {
      item$.update({ 
        product: product, 
        quantity: (item.payload.exists() ? item.payload.val().quantity : 0) + change
      });
    });
  }

}

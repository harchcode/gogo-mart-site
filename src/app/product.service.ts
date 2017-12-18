import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').snapshotChanges().map(actions => {
      return actions.map(action => ({ id: action.key, ...action.payload.val() } as Product));
    });
  }

  get(id: string) {
    return this.db.object<Product>('/products/' + id).snapshotChanges().map(
      action => ({ id: action.key, ...action.payload.val() } as Product
    ));
  }

  update(id: string, product: Product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id: string) {
    return this.db.object('/products/' + id).remove();
  }

}

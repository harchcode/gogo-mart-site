import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').snapshotChanges().map(actions => {
      return actions.map(action => ({ id: action.key, ...action.payload.val() } as Product));
    });
  }

}

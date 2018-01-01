import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService  
  ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
  }

}

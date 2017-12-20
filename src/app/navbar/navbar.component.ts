import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('isTransparent') isTransparent = false;

  user: AppUser;
  cart$: Observable<ShoppingCart>
  
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ){ }

  async ngOnInit() {
    this.auth.appUser$.subscribe(user => {
      this.user = user;
    });

    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}

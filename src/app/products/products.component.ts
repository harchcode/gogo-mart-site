import { Category } from './../models/category';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  cart$: Observable<ShoppingCart>;

  categoryKey: string;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) { 
    this.subscription = productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.categoryKey = params.get('category');
        
        this.filteredProducts = (this.categoryKey) ?
          this.products.filter(p => p.category == this.categoryKey) :
          this.products
      });
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import { Category } from './../models/category';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;

  categoryKey: string;

  constructor(
    private productService: ProductService,
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

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

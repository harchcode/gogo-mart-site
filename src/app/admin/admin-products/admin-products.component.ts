import { Product } from './../../models/product';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(
    private productService: ProductService
  ) {
    this.subscription = productService.getAll().subscribe(p => {
      this.products = this.filteredProducts = p;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products
  }

}

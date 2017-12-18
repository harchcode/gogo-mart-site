import { Product } from './../../models/product';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService
  ) {
    this.products$ = productService.getAll();
  }

  ngOnInit() {
  }

}

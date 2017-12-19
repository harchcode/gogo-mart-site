import { Category } from '../../models/category';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category: string;

  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService
  ) { 
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

}

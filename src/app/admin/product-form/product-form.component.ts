import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../models/category';
import { ProductService } from '../../product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  productForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.categories$ = categoryService.getCategories();
    this.createForm();
  }

  get title() { return this.productForm.get('title'); }
  get price() { return this.productForm.get('price'); }
  get category() { return this.productForm.get('category'); }
  get imageUrl() { return this.productForm.get('imageUrl'); }
  get gender() { return this.productForm.get('gender'); }

  ngOnInit() {
  }

  createForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, CustomValidators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, CustomValidators.url]],
      gender: ['any', Validators.required],
    })
  }

  shouldShowError(control: FormControl) {
    return control.invalid && (control.dirty || control.touched);
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}

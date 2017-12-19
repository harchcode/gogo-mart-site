import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../models/category';
import { ProductService } from '../../product.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Product } from '../../models/product';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  productForm: FormGroup;
  product: Product;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.categories$ = categoryService.getAll();
    this.createForm();

    let id = route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id).take(1).subscribe(p => {
        this.product = p;
        this.productForm.setValue({
          title: p.title,
          price: p.price,
          category: p.category,
          imageUrl: p.imageUrl,
          gender: p.gender
        });
      });
    }
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

  shouldShowError(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

  save(product) {
    if (this.product) { this.productService.update(this.product.id, product); }
    else { this.productService.create(product) }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (this.product && confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.product.id);
      this.router.navigate(['/admin/products']);
    }
  }

}

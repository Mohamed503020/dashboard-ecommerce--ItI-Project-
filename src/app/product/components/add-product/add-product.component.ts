import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/Models/category';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: any;
  images!: any[];
  selectedImages!: FileList;
  categories: Category[] = [];
  productId!: number;
  buttonText: string = '';
  product: any;
  title:string='';
  constructor(
    private formBuilder: FormBuilder,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(this.categories);
      },
    });
    // this.getProductId();

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category_id: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      discount: ['', Validators.required],
      rate: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: [[], Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.productId = params['id'];
      console.log(this.productId);
      this.getProductId();
      // { id: 123, name: 'John' }
    });
    console.log(this.productId);
    console.log(this.product);

    if (this.productId) {
      this.buttonText = 'updateProduct';
      this.title='Update Product';
    } else {
      this.buttonText = 'addProduct';
      this.title='Add Product';

    }
  }
  // onImageUpload(event:any) {
  //   const files = event.target.files;
  //   const imagesArray: string[] = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       imagesArray.push(reader.result as string);
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  //   this.productForm.patchValue({ image: imagesArray });
  // }

  onFileChange(event: any) {
    this.selectedImages = event.target.files;
  }

  onSubmit() {
    const formData = new FormData();
    for (let i = 0; i < this.selectedImages.length; i++) {
      formData.append('image[]', this.selectedImages[i]);
      console.log(this.selectedImages[i]);
    }
   
    // const formData = new FormData();
    console.log(this.productForm.value);
    formData.append('name', this.productForm.get('name').value);
    formData.append('category_id', this.productForm.get('category_id').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('quantity', this.productForm.get('discount').value);
    formData.append('discount', this.productForm.get('discount').value);
    formData.append('rate', this.productForm.get('rate').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('status', this.productForm.get('status').value);
    formData.append('image', this.productForm.get('images')?.value);
    
    if (this.productId) {
      this._ProductService.updateProduct(this.productId,formData).subscribe({
        next: (data)=>{
          console.log(data);
          this._router.navigateByUrl('/dashboard/products')
        }
      })
    } else {
      this._ProductService.createProduct(formData).subscribe({
        next: (data) => {
          console.log(data);
          alert('success');
          this.productForm.reset();
        },
        error: (error) => alert(error.message),
      });
    }
   

  }

  getProductId() {
    this._ProductService.getSingleProduct (this.productId).subscribe({
      next: (res) => {
        this.product = res;
        console.log(res);

      this.productForm.get('name').setValue(this.product.name);
      this.productForm.get('category_id').setValue(this.product.category_id);
      this.productForm.get('price').setValue(this.product.price);
      this.productForm.get('quantity').setValue(this.product.quantity);
      this.productForm.get('discount').setValue(this.product.discount);
      this.productForm.get('rate').setValue(this.product.rate);
      this.productForm.get('description').setValue(this.product.description);
      this.productForm.get('status').setValue(this.product.status);
      this.productForm.get('image').setValue(this.product.images);
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
}

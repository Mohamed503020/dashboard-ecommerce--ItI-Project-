import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/Models/category';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  title: string = '';
  selectedCategory: string = '';
  productStates: string = '';
  

//  *************************new***********************************
  imageUrl!: string;
  imageUrls: string[] = [];
//  *************************new*********************************** 

  constructor(
    private formBuilder: FormBuilder,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private route: ActivatedRoute,
    private _router: Router
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
      name: ['',[Validators.required,Validators.pattern("^(?=.{1,20}$)[a-zA-Z]+(\\s[a-zA-Z]+)*$")]],
      category_id: ['',[Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]{2,10}$")]],
      quantity: ['',[Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      discount: ['', [Validators.required,Validators.pattern("^[0-9]{1,3}$")]],
      rate: ['',[Validators.required, Validators.pattern("^[0-5]{1}$")]],
      description: ['', [Validators.required,Validators.pattern("^(?=.{1,200}$)[a-zA-Z]+(\\s[a-zA-Z]+)*$")]],
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
      this.title = 'Update Product';
    } else {
      this.buttonText = 'addProduct';
      this.title = 'Add Product';
    }
  }


//  *************************new*********************************** 

  onDrop(event: any) {
    event.preventDefault();
    this.uploadImages(event.dataTransfer.files);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.preventDefault();
  }

  onFileSelected(event: any) {
    this.uploadImages(event.target.files);
  }

  uploadImages(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageUrls.push(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  }
//  *************************new*********************************** 


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
    if (this.selectedImages.length) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('image[]', this.selectedImages[i]);
        console.log(this.selectedImages[i]);
      }
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
      this._ProductService.updateProduct(this.productId, formData).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your product has been delete',
            showConfirmButton: false,
            timer: 1500,
          });
          this._router.navigateByUrl('/dashboard/products');
        },
        error: (error) => {
          console.log(error.message);
        },
      });
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
    this._ProductService.getSingleProduct(this.productId).subscribe({
      next: (res) => {
        this.product = res;
        console.log(res);
        this.selectedCategory = res.category;
        this.productStates = res.status;
        this.productForm.get('name').setValue(this.product.name);
        this.productForm.get('category_id').setValue(this.product.category);
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
  get name() {
    return this.productForm.get('name');
  }
  get category_id() {
    return this.productForm.get('category_id');
  }
  get price() {
    return this.productForm.get('price');
  }
  get quantity() {
    return this.productForm.get('quantity');
  } 
  get discount() {
    return this.productForm.get('discount');
  }
  get rate() {
    return this.productForm.get('rate');
  }
  get description() {
    return this.productForm.get('description');
  }
  get status() {
    return this.productForm.get('status');
  }
  get image() {
    return this.productForm.get('image');
  }
}

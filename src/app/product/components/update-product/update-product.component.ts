import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/Models/category';
import { ProductService } from '../../services/product.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  images!: any[];
  selectedImages!: FileList;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService
  ) {}
  ngOnInit() {
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(this.categories);
      },
    });

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
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('category_id', this.productForm.get('category_id')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('quantity', this.productForm.get('discount')?.value);
    formData.append('discount', this.productForm.get('discount')?.value);
    formData.append('rate', this.productForm.get('rate')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('status', this.productForm.get('status')?.value);
    formData.append('image', this.productForm.get('image')?.value);

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

import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: any;
  images!:File[];
  imagePaths: File[]= [];
  image2:any
  image3:any
  image4:any
  selectedFiles: any;
  filePaths: File[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private _ProductService:ProductService
  ) {}
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      rate: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      discount: ['', Validators.required],
      status:['', Validators.required],
      category_id: ['', Validators.required],
      image: [[], Validators.required],
      description: ['', Validators.required],

    });
  }
  // onFileSelected(event: any) {
  //   const files: File[] = event.target.files;
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const filePath = reader.result as string;
  //       this.filePaths.push(filePath);
  //     };
  //   }
  //   this.productForm.patchValue({
  //     image: this.filePaths
  //   });
  // }

  onFileSelected(event:any, index:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const path = reader.result
      this.imagePaths[index] = path;
    };
    reader.readAsDataURL(file);
    this.productForm.patchValue({
      image: this.imagePaths
    });
  }
  onSubmit() {

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('rate', this.productForm.get('rate')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('quantity', this.productForm.get('quantity')?.value);
    formData.append('discount', this.productForm.get('discount')?.value);
    formData.append('status', this.productForm.get('status')?.value);
    formData.append('category_id', this.productForm.get('category_id')?.value);
    formData.append('image', this.productForm.get('image').value);
    formData.append('description', this.productForm.get('description)')?.value);
console.log(this.productForm.value)
console.log(formData)

this._ProductService.createProduct(this.productForm.value).subscribe({
  next:(data)=>{console.log(data);alert('success')},
  error:error=>alert(error.message)
})
}

}


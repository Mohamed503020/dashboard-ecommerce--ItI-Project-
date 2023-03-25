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
  images!:any[]
  constructor(
    private formBuilder: FormBuilder,
    private _ProductService:ProductService
  ) {}
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      discount: ['', Validators.required],
      rate: ['', Validators.required],
      description: ['', Validators.required],
      status:['', Validators.required],
      images: [[], Validators.required],
    });
  }
  onImageUpload(event:any) {
    const files = event.target.files;
    const imagesArray: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        imagesArray.push(reader.result as string);
      };
      reader.readAsDataURL(files[i]);
    }
    this.productForm.patchValue({ images: imagesArray });
  }
  onSubmit() {
    const formData = new FormData();
console.log(this.productForm.value)
    formData.append('name', this.productForm.get('name').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('quantity', this.productForm.get('discount').value)
    formData.append('discount', this.productForm.get('discount').value);
    formData.append('rate', this.productForm.get('rate').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('status', this.productForm.get('status').value);
    formData.append('images', this.productForm.get('images')?.value);

this._ProductService.createProduct(formData).subscribe({
  next:(data)=>{console.log(data);alert('success')},
  error:error=>alert(error.message)
})
}

}


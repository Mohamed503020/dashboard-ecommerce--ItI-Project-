import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  images: File[] = [];

  onFileSelected(event: any, inputNumber: number) {
    const file: File = event.target.files[0];
    this.images[inputNumber - 1] = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const previewElement = document.getElementById(`image-preview-${inputNumber}`);
      if (previewElement) {
        previewElement.setAttribute('src', reader.result as string);
      }
    };
  }
  
}

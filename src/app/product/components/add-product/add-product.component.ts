import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  imageUrl!: string | SafeUrl;
constructor(private sanitizer: DomSanitizer){
  
}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    //  this.imageUrl=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0]));
    };
  }

}


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-grid-products',
  templateUrl: './grid-products.component.html',
  styleUrls: ['./grid-products.component.css']
})
export class GridProductsComponent implements OnInit  {
  apiProduct: any[] = [];
constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct(){
    this.productService.getAllProduct().subscribe({
      next:(res)=>{
        this.apiProduct=res
        console.log(res)
      }
    })
  }
}

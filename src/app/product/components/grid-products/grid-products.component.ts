import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-products',
  templateUrl: './grid-products.component.html',
  styleUrls: ['./grid-products.component.css']
})
export class GridProductsComponent implements OnInit  {
  apiProduct: any[] = [];
constructor(private productService:ProductService,private router: Router,){}
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

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        this.getAllProduct();
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        this.getAllProduct();
      },
    });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your product has been delete',
      showConfirmButton: false,
      timer: 1500,
    });

    this.getAllProduct();
  }

  updateProduct(id: number) {
    this.router.navigate(['/dashboard/products/add'], {
      queryParams: { id: id },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor (
    private _ProductService:ProductService,
    private _ActivatedRoute:ActivatedRoute,
    ){}

    productId!:number;
    subsucription!:Subscription;
    product:any;
    ImgUrl:string='';
    ngOnInit(): void {
      this._ActivatedRoute.params.subscribe(params => {
       this.productId = params['id'];
       this.getProduct();
   
      })
     }

     getProduct(){
      this.subsucription= this._ProductService.getSingleProduct(this.productId).subscribe({
         next:data=>{
          this.product=data;
           this.ImgUrl=data.images[1];
   
         },
         error:error=>alert(error.message)
       })
     }
     changeImg(src:string){
      this.ImgUrl=src
        }
}

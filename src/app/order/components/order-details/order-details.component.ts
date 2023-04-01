import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllOrdersService } from '../allOrders.service';
interface Order{
  order_id: number;
  quantity:number,
  price:number,
  product: {
    id: number;
    name: string;
    description: string,
    rate: number,
    price: number,
    discount: number,
    images: {
        imgPath:string,
      }[]
    }
    payment_status:number
  };

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  constructor(private orderServ:AllOrdersService,private router:ActivatedRoute){}
   totalPrice:any=0;
  orders: Order []= [];


  orderId:any;
  ngOnInit(): void {
    this.orderId=this.router.snapshot.paramMap.get('id');
    console.log(this.orderId);
    
 
    // console.log(this.getTotalPrice());
    
    // this.twoDaysAfter = new Date(
    //   this.now.setDate(this.now.getDate() + 3)
    // );
  this.orderServ.getOrderDetail(this.orderId).subscribe({
    next:(res)=>{
      this.orders=res;
      console.log(this.orders);
      this.orders.forEach((res) => {
        this.totalPrice += +res.price * +res.quantity;
        console.log(this.totalPrice);
      });
      

    }
   }) 
  }
  

  //  ordersWithTotalPrice:Order[] = this.orders.map(order => ({
  //   ...order,
  //   totalPrice: order.quantity * order.price
  // }));
  
  
 
  // getCartProduct() {
  //   this.orderServ.getOrderDetail(this.orderId).subscribe({
  //     next: (res) => {
  //       // console.log(res);
  //       this.cartProduct = res;
  //       this.cartProduct.forEach((res) => {
  //         this.totalPriceCart += +res.price * +res.quantityCart;
  //         console.log(this.totalPriceCart);
  //       });
  //     },
  //   });
  // }
}

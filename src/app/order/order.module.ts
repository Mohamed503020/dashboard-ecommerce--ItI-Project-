import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';


@NgModule({
  declarations: [
    AllOrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }

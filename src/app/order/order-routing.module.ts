import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCategoryComponent } from '../category/components/update-category/update-category.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  {path:"",component:AllOrdersComponent},
  {path:":id",component:OrderDetailsComponent},
  {path:":id",component:UpdateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

import { AddProductComponent } from './components/add-product/add-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { GridProductsComponent } from './components/grid-products/grid-products.component';
import { UpdateCategoryComponent } from '../category/components/update-category/update-category.component';

const routes: Routes = [
  {path:"",component:AllProductsComponent},
  {path:"add",component:AddProductComponent},
  {path:"grid",component:GridProductsComponent},
  {path:":id",component:ProductDetailsComponent},
  {path:"update/:id",component:UpdateCategoryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';

const routes: Routes = [
  {path:"",component:AllCategoriesComponent},
  {path:'add',component:AddCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }

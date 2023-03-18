import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';


@NgModule({
  declarations: [
    AllCategoriesComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }

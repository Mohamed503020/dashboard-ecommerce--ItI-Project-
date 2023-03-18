import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AllCategoriesComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatTableModule
  ]
})
export class CategoryModule { }

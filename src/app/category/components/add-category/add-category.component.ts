import { Component } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categories:Category[]=[];
  category:Category={} as Category;

 constructor(private categorySer:CategoryService){
this.getAllCategories();
 }
 getAllCategories(){
  this.categorySer.getCategories().subscribe({
    next:(res)=>{
      this.categories=res;
      // console.log(this.items);
    }
   })
}

  saveCategory(){
   
    console.log(this.category);
    this.categorySer.saveNewCategory(this.category).subscribe({
      next:(res)=>{
        
     console.log(res);
     console.log(this.category);
    //  this.router.navigate(['/main/products']);
    this.getAllCategories()
   
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    this.getAllCategories()
  }
}

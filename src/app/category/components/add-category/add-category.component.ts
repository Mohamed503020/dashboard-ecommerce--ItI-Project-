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

 }
    

  saveCategory(){
   
    console.log(this.category);
    this.categorySer.saveNewCategory(this.category).subscribe({
      next:(res)=>{
        
     console.log(res);
     console.log(this.category);
    //  this.router.navigate(['/main/products']);
   
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}

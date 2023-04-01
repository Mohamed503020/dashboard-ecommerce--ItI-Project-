import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder,Validators  } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  categories:Category[]=[];
  category:Category={} as Category;
  categoryForm: any;

 constructor(private categorySer:CategoryService, private formBuilder: FormBuilder,){
this.getAllCategories();
 }
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: ['',[Validators.required,Validators.pattern("^(?=.{3,15}$)[a-zA-Z]+(\\s[a-zA-Z]+)*$")]],
    });
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

  

  get name() {
    return this.categoryForm.get('category');
  }
}

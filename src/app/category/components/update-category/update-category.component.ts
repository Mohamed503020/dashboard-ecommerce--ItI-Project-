import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{

  categories:Category[]=[];
  category:Category={} as Category;
  catId!:any|null;

 constructor(private categorySer:CategoryService,private activatedRoute:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any){

 }
    catName!:any;
 sub!:Subscription;
 ngOnInit(){
 
  // this.catName=this.data.name;
  const id = this.data?.id;

  this.categorySer.getByCatId(id).subscribe((cat: any) => {
    this.category = cat;

  });

  console.log(`Received data: ${JSON.stringify(this.data)}`)
  
//   this.catId=this.activatedRoute.snapshot.paramMap.get('id');
//   console.log(this.catId);
//  this.sub= this.categorySer.getByCatId(this.catId).subscribe({
//    next:(res)=>{
//   this.category=res;
//    }
//   });


  this.categorySer.getCategories().subscribe({
   next:(res)=>{
     this.categories=res;
     console.log(this.categories);
  
    }

   }
  )}

  getAllCategories(){
    this.categorySer.getCategories().subscribe({
      next:(res)=>{
        this.categories=res;
        // console.log(this.items);
      }
     })
  }

  updateCategory(){
   
    console.log(this.category);
    this.categorySer.updateCategoryById(this.category,this.data.id).subscribe(
      (cat)=>{
        console.log(cat);
        
        console.log("success update record",cat);
        this.getAllCategories();
      }
    
    )
    this.getAllCategories();
  }

  // deleteCat(id:any){
  
  //   this.categorySer.deleteCategory(id).subscribe(
  //     (cat)=>{
  //       console.log("record deleted successfuly");
        
  //     }
  //   )
  // console.log(id);
  
  // }

}

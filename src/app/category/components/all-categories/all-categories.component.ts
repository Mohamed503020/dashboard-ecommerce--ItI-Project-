import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component'; 
import { UpdateCategoryComponent } from '../update-category/update-category.component';

interface Category {
  id:BigInteger;
  name:string;
  // img:string;
}

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {


  constructor(public dialog: MatDialog,private categoryServ:CategoryService,private router: Router,private http:HttpClient) {}

  // categories:Category[]=[];
  category:Category={} as Category;
  items:Category[]= [];

  pageSize = 6;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];
  searchType = 'name';
  searchTerm = '';
  filteredItems: Category[] = this.items;

  ngOnInit() {
    this.calculatePageNumbers();

    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryServ.getCategories().subscribe({
      next:(res)=>{
        this.items=res;
        this.filteredItems=this.items
        // console.log(this.items);
      }
     })
  }

  calculatePageNumbers() {
    const totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.pageNumbers = Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.startIndex = (pageNumber - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }

  prev() {
    this.goToPage(this.currentPage - 1);
  }

  next() {
    this.goToPage(this.currentPage + 1);
  }

  setPage(page: number) {
    this.goToPage(page);
  }

  search() {
    this.filteredItems = this.items.filter((item) => {
      const searchTermLower = this.searchTerm.toLowerCase();

      if (this.searchType == 'name') {
        return item.name.toLowerCase().includes(searchTermLower);
      }
      // if (this.searchType == 'Email') {
      //   return item.email.toLowerCase().includes(searchTermLower);
      // }

      return false;

      // return this.searchType === 'created_at'?
      // item.created_at.toLowerCase().includes(searchTermLower):
      // item.updated_at.toLowerCase().includes(searchTermLower);
    });

    this.currentPage = 1;
    this.calculatePageNumbers();
    this.goToPage(1);
  }

 
  openDialog() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width:'350px', height:'260px'
    });
  

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllCategories();
    });
  }

  openUpdateDialog(id:any) {

    this.http.get(`http://localhost:8000/api/categories/${id}`).subscribe((data: any) => {
      // Pass the fetched data to the UpdateCategoryComponent dialog.
      const dialogRef = this.dialog.open(UpdateCategoryComponent, {
        width: '350px',
        height: '260px',
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
          // Handle the returned data here.
          console.log(`Returned data: ${JSON.stringify(result)}`);
          this.getAllCategories();
      });
    });
    this.getAllCategories();

 }

 deleteCat(id:any){
  
  this.categoryServ.deleteCategory(id).subscribe(
    (cat)=>{
      console.log("record deleted successfuly",cat);
      this.getAllCategories();
      
    }
  )
console.log(id);

}

}

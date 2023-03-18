import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
items = [
    { name: 'Item 1', parentCategory: 'Category 1' },
    { name: 'Item 2', parentCategory: 'Category 1' },
    { name: 'Item 3', parentCategory: 'Category 2' },
    { name: 'Item 4', parentCategory: 'Category 2' },
    { name: 'Item 5', parentCategory: 'Category 3' },
    { name: 'Item 6', parentCategory: 'Category 3' },
    { name: 'Item 7', parentCategory: 'Category 4' },
    { name: 'Item 8', parentCategory: 'Category 4' },
    { name: 'Item 9', parentCategory: 'Category 5' },
    { name: 'Item 10', parentCategory: 'Category 5' },
    { name: 'Item 11', parentCategory: 'Category 6' },
    { name: 'Item 12', parentCategory: 'Category 6' },
    { name: 'Item 13', parentCategory: 'Category 7' },
    { name: 'Item 14', parentCategory: 'Category 7' },
    { name: 'Item 15', parentCategory: 'Category 8' },
    { name: 'Item 16', parentCategory: 'Category 8' },
    { name: 'Item 17', parentCategory: 'Category 9' },
    { name: 'Item 18', parentCategory: 'Category 9' },
    { name: 'Item 19', parentCategory: 'Category 10' },
    { name: 'Item 20', parentCategory: 'Category 10' },
    { name: 'Item 1', parentCategory: 'Category 1' },
    { name: 'Item 2', parentCategory: 'Category 1' },
    { name: 'Item 3', parentCategory: 'Category 2' },
    { name: 'Item 4', parentCategory: 'Category 2' },
    { name: 'Item 5', parentCategory: 'Category 3' },
    { name: 'Item 6', parentCategory: 'Category 3' },
    { name: 'Item 7', parentCategory: 'Category 4' },
    { name: 'Item 8', parentCategory: 'Category 4' },
    { name: 'Item 9', parentCategory: 'Category 5' },
    { name: 'Item 10', parentCategory: 'Category 5' },
    { name: 'Item 11', parentCategory: 'Category 6' },
    { name: 'Item 12', parentCategory: 'Category 6' },
    { name: 'Item 13', parentCategory: 'Category 7' },
    { name: 'Item 14', parentCategory: 'Category 7' },
    { name: 'Item 15', parentCategory: 'Category 8' },
    { name: 'Item 16', parentCategory: 'Category 8' },
    { name: 'Item 17', parentCategory: 'Category 9' },
    { name: 'Item 18', parentCategory: 'Category 9' },
    { name: 'Item 19', parentCategory: 'Category 10' },
    { name: 'Item 20', parentCategory: 'Category 10' },
    { name: 'Item 1', parentCategory: 'Category 1' },
    { name: 'Item 2', parentCategory: 'Category 1' },
    { name: 'Item 3', parentCategory: 'Category 2' },
    { name: 'Item 4', parentCategory: 'Category 2' },
    { name: 'Item 5', parentCategory: 'Category 3' },
    { name: 'Item 6', parentCategory: 'Category 3' },
    { name: 'Item 7', parentCategory: 'Category 4' },
    { name: 'Item 8', parentCategory: 'Category 4' },
    { name: 'Item 9', parentCategory: 'Category 5' },
    { name: 'Item 10', parentCategory: 'Category 5' },
    { name: 'Item 11', parentCategory: 'Category 6' },
    { name: 'Item 12', parentCategory: 'Category 6' },
    { name: 'Item 13', parentCategory: 'Category 7' },
    { name: 'Item 14', parentCategory: 'Category 7' },
    { name: 'Item 15', parentCategory: 'Category 8' },
    { name: 'Item 16', parentCategory: 'Category 8' },
    { name: 'Item 17', parentCategory: 'Category 9' },
    { name: 'Item 18', parentCategory: 'Category 9' },
    { name: 'Item 19', parentCategory: 'Category 10' },
    { name: 'Item 20', parentCategory: 'Category 10' },
    { name: 'Item 1', parentCategory: 'Category 1' },
    { name: 'Item 2', parentCategory: 'Category 1' },
    { name: 'Item 3', parentCategory: 'Category 2' },
    { name: 'Item 4', parentCategory: 'Category 2' },
    { name: 'Item 5', parentCategory: 'Category 3' },
    { name: 'Item 6', parentCategory: 'Category 3' },
    { name: 'Item 7', parentCategory: 'Category 4' },
    { name: 'Item 8', parentCategory: 'Category 4' },
    { name: 'Item 9', parentCategory: 'Category 5' },
    { name: 'Item 10', parentCategory: 'Category 5' },
    { name: 'Item 11', parentCategory: 'Category 6' },
    { name: 'Item 12', parentCategory: 'Category 6' },
    { name: 'Item 13', parentCategory: 'Category 7' },
    { name: 'Item 14', parentCategory: 'Category 7' },
    { name: 'Item 15', parentCategory: 'Category 8' },
    { name: 'Item 16', parentCategory: 'Category 8' },
    { name: 'Item 17', parentCategory: 'Category 9' },
    { name: 'Item 18', parentCategory: 'Category 9' },
    { name: 'Item 19', parentCategory: 'Category 10' },
    { name: 'Item 20', parentCategory: 'Category 10' },
  ];

  pageSize = 10;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];

  ngOnInit() {
    this.calculatePageNumbers();
  }
  calculatePageNumbers() {
    const totalPages = Math.ceil(this.items.length / this.pageSize);
    this.pageNumbers = Array(totalPages).fill(0).map((x, i) => i + 1);
  }
  
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.startIndex = (pageNumber - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }
  
  prev() {
    this.currentPage--;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }
  
  next() {
    this.currentPage++;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }
}

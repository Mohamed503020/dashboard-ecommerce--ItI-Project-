import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component'; 

interface Item {
  name: string;
  parentCategory: string;
  // img:string;
}

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  items: Item[] = [
    { name: 'Item 1', parentCategory: 'hhlsdf 1'  },
    { name: 'Item 2', parentCategory: 'sdkjaslk 1'  },
    { name: 'Item 3', parentCategory: 'g 2'  },
    { name: 'Item 4', parentCategory: 'f 2'  },
    { name: 'Item 5', parentCategory: 'a 3'  },
    { name: 'Item 6', parentCategory: 'hh 3'  },
    { name: 'Item 7', parentCategory: 'Category 4'  },
    { name: 'Item 8', parentCategory: 'Category 4'  },
    { name: 'Item 9', parentCategory: 'Category 5'  },
    { name: 'Item 10', parentCategory: 'Category 5'  },
    { name: 'Item 11', parentCategory: 'Category 6'  },
    { name: 'Item 12', parentCategory: 'Category 6'  },
    { name: 'Item 13', parentCategory: 'Category 7'  },
    { name: 'Item 14', parentCategory: 'Category 7'  },
    { name: 'Item 15', parentCategory: 'Category 8'  },
    { name: 'Item 16', parentCategory: 'Category 8'  },
    { name: 'Item 17', parentCategory: 'Category 9'  },
    { name: 'Item 18', parentCategory: 'Category 9'  },
    { name: 'Item 19', parentCategory: 'Category 10'  },
  ];

  pageSize = 6;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];
  searchType = 'item';
  searchTerm = '';
  filteredItems: Item[] = this.items;

  ngOnInit() {
    this.calculatePageNumbers();
  }

  calculatePageNumbers() {
    const totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.pageNumbers = Array(totalPages).fill(0).map((_, i) => i + 1);
    
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
    this.filteredItems = this.items.filter(item => {
      const searchTermLower = this.searchTerm.toLowerCase();
      
        // if (this.searchType=='img'){
        //   return item.img.toLowerCase().includes(searchTermLower)
        // }
        return this.searchType === 'item' ?
        item.name.toLowerCase().includes(searchTermLower) :
        item.parentCategory.toLowerCase().includes(searchTermLower);
    });
    this.currentPage = 1;
    this.calculatePageNumbers();
    this.goToPage(1);
  } 

  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width:'350px', height:'260px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


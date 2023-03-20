import { Component } from '@angular/core';
interface Item {
  id:number;
  customer: string;
  email: string;
  price: number;
  item: number;
  status: string;
  date: string;
 
}
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  items: Item[] = [
    {
      id:1,
      customer: 'ahmed',
      email: 'ahmed@gmail.com',
      price: 10.99,
      item: 2, 
      status: 'cancle',
      date: '2023-03-18',
    },
    {
      id:2,
      customer: 'mohammmed',
      email: 'mohammmed@gmail.com',
      price: 100,
      item: 3, 
      status: 'delivered',
      date: '2020-03-18',
    },
    {
      id:3,
      customer: 'ali',
      email: 'ali@gmail.com',
      price: 5,
      item: 1, 
      status: 'processing',
      date: '2025-03-18',
    },
    {
      id:4,
      customer: 'sofo',
      email: 'sofo@gmail.com',
      price: 600,
      item: 8, 
      status: 'delivered',
      date: '2023-03-18',
    },
    {
      id:5,
      customer: 'mar',
      email: 'mar@gmail.com',
      price: 50,
      item: 9, 
      status: 'cancle',
      date: '2022-03-18',
    },
    {
      id:6,
      customer: 'aml',
      email: 'aml@gmail.com',
      price: 300,
      item: 2, 
      status: 'delivered',
      date: '2023-03-18',
    },
    {
      id:7,
      customer: 'gege',
      email: 'gege@gmail.com',
      price: 16,
      item: 2, 
      status: 'processing',
      date: '2021-03-18',
    },
    {
      id:8,
      customer: 'koko',
      email: 'koko@gmail.com',
      price: 108,
      item: 6, 
      status: 'cancle',
      date: '2023-03-18',
    },
    {
      id:9,
      customer: 'lolo',
      email: 'lolo@gmail.com',
      price: 1102,
      item: 5, 
      status: 'processing',
      date: '2023-03-18',
    },
    {
      id:10,
      customer: 'meme',
      email: 'meme@gmail.com',
      price: 10.99,
      item: 2, 
      status: 'delivered',
      date: '2023-03-18',
    },
    
  ];

  pageSize = 5;
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
      
        if (this.searchType=='id'){
          return String(item.id).toLowerCase().includes(searchTermLower)
        }
        if(this.searchType=='price less than'){
          return item.price<= +this.searchTerm;
        }
        if(this.searchType=='price bigger than'){
          return item.price>= +this.searchTerm;
        }
        if (this.searchType=='customer'){
          return item.customer.toLowerCase().includes(searchTermLower)
        }
        if (this.searchType=='email'){
          return item.email.toLowerCase().includes(searchTermLower)
        }
        if (this.searchType=='status'){
          return item.status.toLowerCase().includes(searchTermLower)
        }
        if (this.searchType=='item'){
          return String(item.item).toLowerCase().includes(searchTermLower)
        }
        
        return this.searchType === 'date'?
        item.date.includes(searchTermLower):
         item.date== this.searchTerm;
    });
    this.currentPage = 1;
    this.calculatePageNumbers();
    this.goToPage(1);
  } 
}

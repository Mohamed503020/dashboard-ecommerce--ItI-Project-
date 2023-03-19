import { Component,OnInit } from '@angular/core';

interface Item {
  image: URL;
  name: string;
  price: number;
  offer: number;
  date: string;
 
}

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  items: Item[] = [
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 1',
      price: 10.99,
      offer: 0.2, 
      date: '2023-03-18',
    },
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 2',
      price: 24.99,
      offer: 0, // no discount
      date: '2023-03-19',
    },
    {
      image: new URL('https://m.media-amazon.com/images/I/51eVl5NGIjL._AC_SX679_.jpg'),
      name: 'Item 3',
      price: 5.49,
      offer: 0.1, 
      date: '2023-03-17',
    },
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 1',
      price: 10.99,
      offer: 0.2, 
      date: '2023-03-18',
    },
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 2',
      price: 24.99,
      offer: 0, // no discount
      date: '2023-03-19',
    },
    {
      image: new URL('https://m.media-amazon.com/images/I/51eVl5NGIjL._AC_SX679_.jpg'),
      name: 'Item 3',
      price: 5.49,
      offer: 0.1, 
      date: '2023-03-17',
    },
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 1',
      price: 10.99,
      offer: 0.2, 
      date: '2023-03-18',
    },
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 2',
      price: 24.99,
      offer: 0, // no discount
      date: '2023-03-19',
    },
    {
      image: new URL('https://m.media-amazon.com/images/I/51eVl5NGIjL._AC_SX679_.jpg'),
      name: 'Item 3',
      price: 5.49,
      offer: 0.1, 
      date: '2023-03-17',
    },
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 1',
      price: 10.99,
      offer: 0.2, 
      date: '2023-03-18',
    },
    {
      image: new URL('https://fakeimg.pl/300/'),
      name: 'Item 2',
      price: 24.99,
      offer: 0, // no discount
      date: '2023-03-19',
    },
    {
      image: new URL('https://m.media-amazon.com/images/I/51eVl5NGIjL._AC_SX679_.jpg'),
      name: 'Item 3',
      price: 5.49,
      offer: 0.1, 
      date: '2022-03-17',
    },
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
      
        if (this.searchType=='name'){
          return item.name.toLowerCase().includes(searchTermLower)
        }
        if(this.searchType=='price less than'){
          return item.price<= +this.searchTerm;
        }
        if(this.searchType=='price bigger than'){
          return item.price>= +this.searchTerm;
        }
        if(this.searchType=='offer'){
          return item.offer*100 == +this.searchTerm;
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



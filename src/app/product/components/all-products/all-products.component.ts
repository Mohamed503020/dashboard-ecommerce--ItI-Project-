import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { Component,OnInit } from '@angular/core';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  items: any[]=[]

  pageSize = 6;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];
  searchType = 'item';
  searchTerm = '';
  filteredItem!:any[]
constructor(private router:Router,private ProductServ:ProductService){}
  ngOnInit() {
    this.calculatePageNumbers();
    this.getallproducs()

  }

  calculatePageNumbers() {
    const totalPages = Math.ceil(this.filteredItem!.length / this.pageSize);
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
    this.filteredItem = this.items.filter(item => {
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
getallproducs(){
this.ProductServ.geTAllproducts().subscribe({
  next:(item)=>{this.items=item;console.log(item); this.filteredItem=this.items},
  error:error=>{alert(error.message)}
})
}

  addproduct(){
    this.router.navigate(['dashboard/products/add'] );
  }

  updateProduct(product:any){
    this.router.navigate(['main/products/add'], { queryParams: { product: product} });
  }
}



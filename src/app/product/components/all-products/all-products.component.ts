import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  apiProduct: any[] = [];
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {}
  pageSize = 6;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];
  searchType = 'item';
  searchTerm = '';
  filteredItems: any[] = this.apiProduct;

  ngOnInit() {
    this.getAllProduct();
    this.calculatePageNumbers();
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
    this.filteredItems = this.apiProduct.filter((item) => {
      const searchTermLower = this.searchTerm.toLowerCase();

      if (this.searchType == 'name') {
        return item.name.toLowerCase().includes(searchTermLower);
      }
      if (this.searchType == 'price less than') {
        return item.price <= +this.searchTerm;
      }
      if (this.searchType == 'price bigger than') {
        return item.price >= +this.searchTerm;
      }
      return this.searchType === 'discount'
        ? item.discount.includes(searchTermLower)
        : item.rate == this.searchTerm;
    });
    this.currentPage = 1;
    this.calculatePageNumbers();
    this.goToPage(1);
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe({
      next: (res) => {
        this.apiProduct = res;
        this.filteredItems = this.apiProduct;
        console.log(res);
      },
    });
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        this.getAllProduct();
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        this.getAllProduct();
      },
    });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your product has been delete',
      showConfirmButton: false,
      timer: 1500,
    });

    this.getAllProduct();
  }

  updateProduct(id: number) {
    this.router.navigate(['/dashboard/products/add'], {
      queryParams: { id: id },
    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllOrdersService } from '../allOrders.service';
interface Order {
  id:number;
  name: string;
  total_price: number;
  item: number;
  payment_status: number;
  created_at: string;
  user:{
    id:number,
    email:string,
  };
 
}

 interface OrderStatus {
 
}
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  orders: Order[] = [];
  
  pageSize = 5;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];
  searchType = 'item';
  searchTerm = '';
  filteredItems: Order[] = this.orders;

  constructor(private orderServ:AllOrdersService,private route: ActivatedRoute, private router: Router){

  }

   getOrders(){
    this.orderServ.getAllOrders().subscribe({
      next:(res)=>{
        this.orders=res;
        this.filteredItems=this.orders;
        console.log(this.orders);
        
  
      }
    })
   }
  ngOnInit() {
    // console.log(10);
    
    this.calculatePageNumbers();
    this.getOrders();
    
  }
  changeStatus(id:number,status:number){
      this.orderServ.changeOrderStatus(id,+status).subscribe({
        next:(data)=>{
          // this.router.navigate(['/dashboard/orders']);
          console.log(typeof status);
          // this.router.navigate([this.route.snapshot.url.join('/dashboard/orders')])
          this.getOrders();

        }
      })
       
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
    this.filteredItems = this.orders.filter(item => {
      const searchTermLower = this.searchTerm.toLowerCase();
      
        if (this.searchType=='id'){
          return String(item.id).toLowerCase().includes(searchTermLower)
        }
        if(this.searchType=='price less than'){
          return item.total_price<= +this.searchTerm;
        }
        if(this.searchType=='price bigger than'){
          return item.total_price>= +this.searchTerm;
        }
        if (this.searchType=='customer'){
          return item.name.toLowerCase().includes(searchTermLower)
        }
        if (this.searchType=='email'){
          return item.user.email.toLowerCase().includes(searchTermLower)
        }
      
        if (this.searchType=='item'){
          return String(item.item).toLowerCase().includes(searchTermLower)
        }
        
        return this.searchType === 'date'?
        item.created_at.includes(searchTermLower):
         item.created_at== this.searchTerm;
    });
    this.currentPage = 1;
    this.calculatePageNumbers();
    this.goToPage(1);
  }
  
  
  // openUpdateDialog(id:any) {
  //   console.log(id)
  //     this.http.get(`http://localhost:8000/api/showUser/${id}`).subscribe((data: any) => {
  //       // Pass the fetched data to the UpdateCategoryComponent dialog.
  //       const dialogRef = this.dialog.open(AddUserComponent, {
  //         width: '500px',
  //         height: '400px',
  //         data: data
  //       });
    
  //       dialogRef.afterClosed().subscribe(result => {
          
  //           // Handle the returned data here.
  //           console.log(`Returned data: ${JSON.stringify(result)}`);
  //           // console.log(`Dialog result: ${result}`);
  //           this.getAllUsers();
            
          
  //       });
  //     });
    
  //     this.getAllUsers();
    
  //   }

}

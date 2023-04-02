import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AllOrdersService } from 'src/app/order/components/allOrders.service';
import { OrdersService } from 'src/app/order/service/orders.service';
import { ProductService } from 'src/app/product/services/product.service';
import { UserService } from 'src/app/user/Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  products!: any[];
  electronics: any[] = [];
  shose: any[] = [];
  clothes: any[] = [];
  data: any;
  options: any;
  users: any;
  orders: any;
  totalSales: number = 0;
  ordersByMonth!: any[];
  constructor(
    private productServ: ProductService,
    private userServ: UserService,
    private orderServ: AllOrdersService
  ) {}

  ngAfterViewInit() {
  

    // Options for the chart
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  doughnutChart: any;

  ngOnInit(): void {
    // Data for the chart
    this.getAllProducts();
    console.log(this.products);
    this.getAllUsers();
    this.getAllOrders();
  }

  getAllProducts() {
    this.productServ.getAllProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
        console.log(this.products);
        this.clothes = this.products.filter((element: any) => {
          return element.category == 'clothes';
        });

        this.shose = this.products.filter((element: any) => {
          return element.category == 'shose';
        });

        this.electronics = this.products.filter((element: any) => {
          return element.category == 'electronics';
        });

        this.data = {
          labels: ['clothes', 'shose', 'electronics'],
          datasets: [
            {
              data: [
                this.clothes.length,
                this.shose.length,
                this.electronics.length,
              ],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        };

        // Create the doughnut chart
        this.doughnutChart = new Chart('doughnut-chart', {
          type: 'doughnut',
          data: this.data,
          options: this.options,
        });
      },
    });

    console.log(this.products);
  }

  getAllUsers() {
    this.userServ.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  getAllOrders() {
    this.orderServ.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(data);
        this.orders.forEach((element: any) => {
          this.totalSales += Number(element.total_price);
        });
        // Initialize variables to store monthly orders
        let ordersInMonth1 = 0;
        let ordersInMonth2 = 0;
        let ordersInMonth3 = 0;
        let ordersInMonth4 = 0;
        let ordersInMonth5 = 0;
        let ordersInMonth6 = 0;

        // Loop through each order and count the number of orders in each month
        this.orders.forEach((element: any) => {
          const orderDate = new Date(element.created_at);
          const month = orderDate.getMonth() + 1;
          switch (month) {
            case 1:
              ordersInMonth1++;
              break;
            case 2:
              ordersInMonth2++;
              break;
            case 3:
              ordersInMonth3++;
              break;
            case 4:
              ordersInMonth4++;
              break;
            case 5:
              ordersInMonth5++;
              break;
            case 6:
              ordersInMonth6++;
              break;
          }
          this.totalSales += Number(element.total_price);
        });

        // Store monthly order counts in an array
        this.ordersByMonth = [
          ordersInMonth1,
          ordersInMonth2,
          ordersInMonth3,
          ordersInMonth4,
          ordersInMonth5,
          ordersInMonth6,
        ];

        console.log(this.ordersByMonth);

        const chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              {
                label: 'Sales',
                data: [...this.ordersByMonth],
                borderColor: '#1cc88a',
                borderWidth: 2,
                fill: true,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    });
  }
}

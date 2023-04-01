import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Chart, { elements } from 'chart.js/auto';
import { ProductService } from 'src/app/product/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  products: any[] = [];
  electronics: any[]=[];
  shose: any[]=[];
  clothes: any[]=[];
  constructor(private productServ: ProductService) {}

  ngAfterViewInit() {
    const chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Sales',
            data: [120, 200, 150, 300, 250, 180, 220],
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
  }
  doughnutChart: any;

  ngOnInit(): void {
    // Data for the chart
    this.getAllProducts();
    const data = {
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

    // Options for the chart
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    // Create the doughnut chart
    this.doughnutChart = new Chart('doughnut-chart', {
      type: 'doughnut',
      data: data,
      options: options,
    });

    console.log(this.clothes);
    console.log(this.shose);
    console.log(this.electronics);
  }

  getAllProducts() {
    this.productServ.getAllProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
        this.clothes = this.products.filter((element: any) => {
          return element.category == 'clothes';
        });
    
        this.shose = this.products.filter((element: any) => {
          return element.category == 'shose';
        });
    
        this.electronics = this.products.filter((element: any) => {
          return element.category == 'electronics';
        });
    
      },
    });
  }
}

import { AfterViewInit, Component, OnInit, ViewChild , ElementRef,} from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit,OnInit{

  constructor() {}

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
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  doughnutChart: any;

  ngOnInit(): void {
    // Data for the chart
    const data = {
      labels: ['Desktop', 'Tablet', 'Mobile'],
      datasets: [
        {
          data: [60, 25, 15],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };

    // Options for the chart
    const options = {
      responsive: true,
      maintainAspectRatio: false
    };

    // Create the doughnut chart
    this.doughnutChart = new Chart('doughnut-chart', {
      type: 'doughnut',
      data: data,
      options: options
    });
  }
  

}
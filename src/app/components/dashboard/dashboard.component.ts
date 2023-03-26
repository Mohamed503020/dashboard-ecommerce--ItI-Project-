import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showFiller=false;
  admin=JSON.parse(localStorage.getItem('admin')!)
  //orders =[{prooduc:"prodc",id:1,tottalprice:250,items:4},{prooduc:"prodc",id:1,tottalprice:250,items:4}]
}

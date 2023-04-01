import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  showFiller=false;
  admin=JSON.parse(localStorage.getItem('admin')!)
  //orders =[{prooduc:"prodc",id:1,tottalprice:250,items:4},{prooduc:"prodc",id:1,tottalprice:250,items:4}]
constructor( private router: Router){

}
  logOut(){
    localStorage.removeItem("admin")
    localStorage.removeItem("adminToken")
    this.router.navigateByUrl("/auth/login")

  }
}

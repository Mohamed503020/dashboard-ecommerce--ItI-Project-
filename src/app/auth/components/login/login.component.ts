import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../model/login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorAuthLogin!: string;
  email!: string;
  password!: string;
  admin: any;
  adminToken: any;
constructor(private _authService:AuthService,
  private _router:Router){}
  ngOnInit(): void {
  }
  Userlogin() {

 const loginModel:Login={
    email:this.email,
    password:this.password
  }
    this._authService.login(loginModel).subscribe({
      next:data=>{
        console.log(data)
        this.admin=data[0]
        this.adminToken=data[1]
        if(localStorage.getItem('adminToken')){
        localStorage.setItem('adminToken',this.adminToken)
        localStorage.setItem('admin',JSON.stringify(this.admin) )
        }
         localStorage.setItem('adminToken',this.adminToken)
        localStorage.setItem('admin', JSON.stringify(this.admin))
        this._router.navigateByUrl('/')
      },

      error:error=>{
        this.errorAuthLogin='Invalid Email Or PassWord'
        console.log(error.error)}
    })
  }
}

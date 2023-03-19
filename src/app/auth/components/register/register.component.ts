import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  Name?: string;
  password?: string;
  confirmpassword?: string;
  userName?:string;
}

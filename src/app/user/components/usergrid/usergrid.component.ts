import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { UserService } from '../../Service/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})

export class UsergridComponent  implements OnInit {

  apiUser: User[] = [];
  constructor(private userService: UserService ,public dialog: MatDialog,private router: Router,private http:HttpClient) {}
  ngOnInit(): void {
    this.getAllUsers()
  }
  
  
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        // console.log(res);
        this.apiUser = res;
     
      },
    });
  }
  


  openUpdateDialog(id:any) {
    console.log(id)
      this.http.get(`http://localhost:8000/api/showUser/${id}`).subscribe((data: any) => {
        // Pass the fetched data to the UpdateCategoryComponent dialog.
        const dialogRef = this.dialog.open(AddUserComponent, {
          width: '500px',
          height: '400px',
          data: data
        });
    
        dialogRef.afterClosed().subscribe(result => {
          
            // Handle the returned data here.
            console.log(`Returned data: ${JSON.stringify(result)}`);
            // console.log(`Dialog result: ${result}`);
            this.getAllUsers();
            
          
        });
      });
    
      this.getAllUsers();
    
    }


    async deleteUser(id: number) {
      if (await Swal.fire(
        'Confirm the deletion?',
        'Are you sure you want to delete this user?',
        'question'
      ) ) {
        this.userService.deleteUser(id).subscribe({
          next:(data)=>{
            this.getAllUsers();
          }
        });
        
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'User has been delete',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
}

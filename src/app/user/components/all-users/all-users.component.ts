import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../Service/user.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// interface user {
//   image: URL;
//   name: string;
//   email: string;
//   phone: string;
//   joinOn: string;
// }

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  // users :user[]=[
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "jack karry",
  //     email: "jackkarry@gmail.com",
  //     phone: "01056789461",
  //     joinOn: "2023-01-01"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "harry",
  //     email: "harrykarry@gmail.com",
  //     phone: "01044789461",
  //     joinOn: "2023-03-03"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "danyal",
  //     email: "danyalkarry@gmail.com",
  //     phone: "01044559461",
  //     joinOn: "2023-02-02"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "kero",
  //     email: "kerokarry@gmail.com",
  //     phone: "01044789461",
  //     joinOn: "2023-04-04"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "mark",
  //     email: "markkarry@gmail.com",
  //     phone: "01044789422",
  //     joinOn: "2023-05-05"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "vander",
  //     email: "vanderkarry@gmail.com",
  //     phone: "01033669461",
  //     joinOn: "2023-06-06"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "harry",
  //     email: "harrykarry@gmail.com",
  //     phone: "01044789461",
  //     joinOn: "2023-01-01"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "jack karry",
  //     email: "jackkarry@gmail.com",
  //     phone: "01056789461",
  //     joinOn: "2023-01-01"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "harry",
  //     email: "harrykarry@gmail.com",
  //     phone: "01044789461",
  //     joinOn: "2023-03-03"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "danyal",
  //     email: "danyalkarry@gmail.com",
  //     phone: "01044559461",
  //     joinOn: "2023-02-02"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "kero",
  //     email: "kerokarry@gmail.com",
  //     phone: "01044789461",
  //     joinOn: "2023-04-04"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "mark",
  //     email: "markkarry@gmail.com",
  //     phone: "01044789422",
  //     joinOn: "2023-05-05"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "vander",
  //     email: "vanderkarry@gmail.com",
  //     phone: "01033669461",
  //     joinOn: "2023-06-06"
  //   },
  //   {
  //     image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
  //     name: "harry",
  //     email: "harrykarry@gmail.com",
  //     phone: "01044789461",
  //     joinOn: "2023-01-01"
  //   },
  // ]
  apiUser: User[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {}
  pageSize = 5;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];
  searchType = 'item';
  searchTerm = '';
  filteredItems: User[] = this.apiUser;

  ngOnInit(): void {
    this.getAllUsers();
    // this.userService.getAllUsers().subscribe({
    //   next: (res) => {
    //     // console.log(res);
    //     console.log(this.filteredItems);
    //     // console.log(this.apiUser);
    //     this.apiUser = res;
    //     this.filteredItems = this.apiUser;
    //   },
    // });
    this.calculatePageNumbers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        // console.log(res);
        // console.log(this.filteredItems);
        // console.log(this.apiUser);
        this.apiUser = res;
        this.filteredItems = this.apiUser;
      },
    });
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
    this.filteredItems = this.apiUser.filter((item) => {
      const searchTermLower = this.searchTerm.toLowerCase();

      if (this.searchType == 'name') {
        return item.name.toLowerCase().includes(searchTermLower);
      }
      if (this.searchType == 'Email') {
        return item.email.toLowerCase().includes(searchTermLower);
      }

      return item.gender.toLowerCase().includes(searchTermLower);

      // return this.searchType === 'created_at'?
      // item.created_at.toLowerCase().includes(searchTermLower):
      // item.updated_at.toLowerCase().includes(searchTermLower);
    });

    this.currentPage = 1;
    this.calculatePageNumbers();
    this.goToPage(1);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getAllUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Deleted Successfully ',
          showConfirmButton: false,
          timer: 2500,
        });
      },
      error: (err) => {
        // console.error(err);
        // Swal.fire('Oops...', 'Something went wrong!', 'error');
      },
    });
  }

  //   openDialog() {
  //     const dialogRef = this.dialog.open(AddUserComponent, {
  //       width:'500px', height:'400px'
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log(`Dialog result: ${result}`);
  //       this.getAllUsers();
  //     });
  // }

  openUpdateDialog(id: any) {
    console.log(id);
    this.http
      .get(`http://localhost:8000/api/showUser/${id}`)
      .subscribe((data: any) => {
        // Pass the fetched data to the UpdateCategoryComponent dialog.
        const dialogRef = this.dialog.open(AddUserComponent, {
          width: '500px',
          height: '400px',
          data: data,
        });

        dialogRef.afterClosed().subscribe((result) => {
          // Handle the returned data here.
          console.log(`Returned data: ${JSON.stringify(result)}`);
          // console.log(`Dialog result: ${result}`);
          this.getAllUsers();
        });
      });

    this.getAllUsers();
  }
}

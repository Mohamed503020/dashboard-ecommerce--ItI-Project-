import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../Models/user';
import { UserService } from '../../Service/user.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  //////////////////////
  apiUser: User[] = [];
  user: User = {} as User;
  registerForm!: FormGroup;
  userId: string | null = '';
  sub!: Subscription;

  selectedImage!: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,15}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.com$')]],
      gender: ['', Validators.required],
    });
    ///////////////////////
    this.getUser();

    const id = this.data?.id;
    console.log(id);
    this.userService.getUserById(id).subscribe((User: any) => {
      this.user = User;
      console.log(User);
    });

    console.log(`Received data: ${JSON.stringify(this.data)}`);
    // this.categorySer.getCategories().subscribe({
    //  next:(res)=>{
    //    this.categories=res;
    //    console.log(this.categories);
  }

  getUser() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub = this.userService.getUserById(this.userId!).subscribe({
      next: (res) => {
        this.user = res;
        console.log(res);
      },
      error: (err) => {
        // alert("error try again")
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: err.message,
        //   footer: '<a href="">Why do I have this issue?</a>',
        // });
      },
    });
  }
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get gender() {
    return this.registerForm.get('gender');
  }

  onFileSelected(event: any) {
    this.registerForm.patchValue({ image: event.target.files[0] });
  }
  onSubmit() {
    const formData = new FormData();
    console.log(this.registerForm.value);
    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('gender', this.registerForm.get('gender')?.value);
  }
  ///////////
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        // console.log(res);
        // console.log(this.filteredItems);
        // console.log(this.apiUser);
        this.apiUser = res;
        // this.filteredItems = this.apiUser;
      },
    });
  }

  updateuser() {
    console.log(this.user);
    this.userService.updateUser(this.user, this.data.id).subscribe({
      next: (data) => {
        console.log(data);
        // window.location.reload();
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Your product has been delete',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        this.getAllUsers();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    });
    this.getAllUsers();
  }
  // (data) => {
  //   console.log(data);

  //   console.log('success update record', data);

  //   this.getAllUsers();
  // }

  deleteuser(id: any) {
    this.userService.deleteUser(id).subscribe((data) => {
      console.log('record deleted successfuly', data);
      this.getAllUsers();
    });
    console.log(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../Models/user';
import { UserService } from '../../Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  //////////////////////
  // apiUser: User[] = [];
  user: User = {} as User;
  registerForm!: FormGroup;
  userId: string | null = '';
  sub!: Subscription;

  selectedImage!: File;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private activatedRoute: ActivatedRoute,private router: Router,) {}
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
    });
///////////////////////
   this.getUser()


  }

  getUser(){
  this.userId = this.activatedRoute.snapshot.paramMap.get('id');
  this.sub = this.userService.getUserById(this.userId!).subscribe({
    next: (res) => {
      this.user = res;
      console.log(res)
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
   update(){
    this.userService.updateUser(this.user, this.userId!).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your product has been edit',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/dashboard/users']);
      },
      error: () => {},
    });
  }
}

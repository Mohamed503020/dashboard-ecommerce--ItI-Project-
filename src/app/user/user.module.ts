import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsergridComponent } from './components/usergrid/usergrid.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations:[
    AllUsersComponent,
    AddUserComponent,
    UsergridComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
    
  ]
})
export class UserModule { }

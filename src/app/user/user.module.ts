import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsergridComponent } from './components/usergrid/usergrid.component';


@NgModule({
  declarations: [
    AllUsersComponent,
    AddUserComponent,
    UsergridComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

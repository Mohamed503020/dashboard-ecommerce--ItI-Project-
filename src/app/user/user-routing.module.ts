import { UsergridComponent } from './components/usergrid/usergrid.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {path:"",component:AllUsersComponent},
  {path:"add/:id",component:AddUserComponent},
  {path:"grid",component:UsergridComponent},
  {path:"messages",component:MessagesComponent},
  {path:":id",component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
// user list => ts =>data= [
  //{name:"MOHAMED",adreess:'aa@ttt",id:1,phone:"11698"},
 //{name:"MOHAMED",adreess:'aa@ttt",id:1,phone:"11698"},
//]


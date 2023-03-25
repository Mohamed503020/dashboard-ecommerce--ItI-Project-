import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:"",redirectTo:"/dashboard",pathMatch:"full"},
  {path:"dashboard",component:DashboardComponent,children:[
   {path:"",component:HomeComponent},
   {
    path: 'users',
    loadChildren: () => import('../app/user/user.module').then(m => m.UserModule),canActivate:[AuthGuard]
   },
   {
    path: 'products',
    loadChildren: () => import('../app/product/product.module').then(m => m.ProductModule)
   },
   {
    path: 'orders',
    loadChildren: () => import('../app/order/order.module').then(m => m.OrderModule)
   },
   {
    path: 'category',
    loadChildren: () => import('../app/category/category.module').then(m => m.CategoryModule)
   },
  ],canActivate:[AuthGuard]},
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

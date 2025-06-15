import { Routes } from '@angular/router';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
export const routes: Routes =  [
    
    {path : '', component : HomeComponent, title: 'My Plateforme'},
    { path: 'product/:id', component: ProductdetailsComponent },
    {
  path: 'account',component:AccountComponent},
     { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
{ path: 'category', component: CategoryComponent }

];
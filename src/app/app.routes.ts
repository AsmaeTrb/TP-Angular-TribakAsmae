import { Routes } from '@angular/router';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
export const routes: Routes =  [
    
    {path : '', component : HomeComponent, title: 'My Plateforme'},
    { path: 'product/:id', component: ProductdetailsComponent },
    
    { path: 'login', component: LoginComponent },
{ path: 'category', component: CategoryComponent }



];
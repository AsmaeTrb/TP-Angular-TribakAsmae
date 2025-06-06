import { Routes } from '@angular/router';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes =  [
    
    {path : '', component : HomeComponent, title: 'My Plateforme'},
    {path : 'productdetails', component : ProductdetailsComponent, title: 'Product details'},
    { path: 'login', component: LoginComponent },



];
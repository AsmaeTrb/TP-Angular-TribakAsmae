import { Routes } from '@angular/router';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CatalogComponent } from './catalog/catalog.component';
export const routes: Routes =  [
    
    {path : 'catalog', component : CatalogComponent, title: 'My Catalog products'},
    {path : 'productdetails', component : ProductdetailsComponent, title: 'Product details'},
    {path : '', redirectTo : '/catalog', pathMatch : 'full'},


];
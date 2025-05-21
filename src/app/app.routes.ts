import { Routes } from '@angular/router';
import { CatalogCompnentComponent } from '../catalog-compnent/catalog-compnent.component';
import { ProductDetailsCompnentComponent } from '../product-details-compnent/product-details-compnent.component';

export const routes: Routes =  [
    
    {path : 'catalog', component : CatalogCompnentComponent, title: 'My Catalog products'},
    {path : 'product-details', component : ProductDetailsCompnentComponent, title: 'Product details'},
    {path : '', redirectTo : '/catalog', pathMatch : 'full'},

];
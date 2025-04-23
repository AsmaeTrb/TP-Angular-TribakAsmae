import { Component } from '@angular/core';
import { Product } from '../models/product';
import { GetDataService } from '../services/get-data.service';
import { ProductDetailsCompnentComponent } from '../product-details-compnent/product-details-compnent.component'; 
import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { get } from 'node:http';

@Component({
  selector: 'app-catalog-compnent',
  imports: [ProductDetailsCompnentComponent,CommonModule],
  templateUrl: './catalog-compnent.component.html',
  styleUrl: './catalog-compnent.component.css'
})
export class CatalogCompnentComponent {
products! : Product[]; 

selectedProduct!: Product;

voirDetails(product: Product) {
  this.selectedProduct = product;
}

  constructor(private getDataService: GetDataService) {}

    
  ngOnInit(): void {
    
    this.products = this.getDataService.getProducts();



}
  
 }
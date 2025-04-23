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

 

  constructor(private getDataService: GetDataService) {}

    
  ngOnInit(): void {
    
    this.products = this.getDataService.getProducts();

    console.log("products === "+this.products[0].name_product);

    console.log(" no data");
    console.log( "*********************"+this.products.map((product) => product.id));
  
    // for (let i = 0; i < this.products.length; i++) {
    // if (this.products[i].quantity <10 ) {
    //     console.log(this.products[i].id);
    //     this.data.push(this.products[i].id);
    // }
  // }
  // console.log("data === "+this.data);
  }

}
  

import { Component, Input, input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-details-compnent',
  imports: [],
  templateUrl: './product-details-compnent.component.html',
  styleUrl: './product-details-compnent.component.css'
})
export class ProductDetailsCompnentComponent {
  
  // @Input() dataC: any[] = [];
  @Input() productC!: Product[] ;  

  constructor() {
    console.log("dataC ================================================ "+this.productC);
  }

}

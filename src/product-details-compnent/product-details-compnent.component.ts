import { Component, Input, input } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common'; // ✅ à ajouter


@Component({
  selector: 'app-product-details-compnent',
  standalone: true,
  imports: [CommonModule], // ✅ ici
  templateUrl: './product-details-compnent.component.html',
  styleUrl: './product-details-compnent.component.css'
})
export class ProductDetailsCompnentComponent {
  
  @Input() product!: Product;

}

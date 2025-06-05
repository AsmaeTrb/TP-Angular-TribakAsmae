import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {
  @Input() product!: Product;

}

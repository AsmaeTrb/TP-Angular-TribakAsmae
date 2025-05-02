import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { GetDataService } from '../services/get-data.service';
import { ProductDetailsCompnentComponent } from '../product-details-compnent/product-details-compnent.component'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-catalog-compnent',
  imports: [ProductDetailsCompnentComponent, CommonModule],
  templateUrl: './catalog-compnent.component.html',
  styleUrl: './catalog-compnent.component.css',
  standalone: true
})
export class CatalogCompnentComponent implements OnInit {
  products: Product[] = [];
  selectedProduct!: Product;

  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.getDataService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  voirDetails(product: Product) {
    this.selectedProduct = product;
  }
}

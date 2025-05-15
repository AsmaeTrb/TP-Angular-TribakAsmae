import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { GetDataService } from '../services/get-data.service';
import { ProductDetailsCompnentComponent } from '../product-details-compnent/product-details-compnent.component'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-catalog-compnent',
  imports: [ProductDetailsCompnentComponent, CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './catalog-compnent.component.html',
  styleUrl: './catalog-compnent.component.css',
  standalone: true
})
export class CatalogCompnentComponent implements OnInit {
  products: Product[] = [];
  selectedProduct!: Product;
  filter: string = '';

  constructor(private getDataService: GetDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getDataService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    })
    this.route.queryParams.subscribe((params)=>{
      this.filter = params['filter'] ?? '';
    })
  }

  voirDetails(product: Product) {
    this.selectedProduct = product;
  }
  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter(
        (product: any) => product.category === this.filter
      );
  }
  

}

import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../models/product';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';
@Component({
  selector: 'app-catalog',
  imports: [ProductdetailsComponent, CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
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

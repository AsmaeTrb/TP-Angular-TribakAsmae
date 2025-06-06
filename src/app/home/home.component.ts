import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../models/product';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';

@Component({
  selector: 'app-home',
  imports: [[ProductdetailsComponent, CommonModule,RouterLink, RouterLinkActive]],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
    hasLowStock(product: Product): boolean {
      return product.sizes.some(size => size.quantity < 10);
  }
  
    

}

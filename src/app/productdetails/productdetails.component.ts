// productdetails.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { GetDataService } from '../../services/get-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  isSizeOpen = false;

  product!: Product;
  currentImage?: string;
  currentDetailsBackground?: string;
  selectedSize?: string;
  zoomedImage: string | null = null;
  payOption: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private getDataService: GetDataService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    this.getDataService.getProducts().subscribe({
      next: (products) => {
        const foundProduct = products.find(p => p.id === productId);
        if (foundProduct) {
          this.product = foundProduct;
          this.currentImage = this.product.image1;
          this.currentDetailsBackground = this.product.image2;
        }
      }
    });
  }

  getAvailableImages(): string[] {
    return [this.product.image1, this.product.image2].filter(img => img);
  }

  onImageClick(img: string): void {
    this.currentImage = img;
    this.currentDetailsBackground = img;
  }

  zoomImage(img: string): void {
    this.zoomedImage = img;
  }

  addToCart(): void {
    if (this.selectedSize) {
      // Logique d'ajout au panier
      console.log('Produit ajouté:', {
        id: this.product.id,
        size: this.selectedSize,
        payOption: this.payOption
      });
    }
  }
}

// productdetails.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { GetDataService } from '../../services/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartservice';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  isSizeOpen = false;
selectedSize?: string;
availableQuantity: number = 0;
quantity: number = 1;
showPopup: boolean = false;

  product!: Product;
  currentImage?: string;
  currentDetailsBackground?: string;
  zoomedImage: string | null = null;
  payOption: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private getDataService: GetDataService,
    private router: Router,
     private cartService: CartService
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

        // ✅ Auto-sélection si taille unique
        if (this.product.sizes.length === 1) {
          this.selectedSize = this.product.sizes[0].size;
          this.availableQuantity = this.product.sizes[0].quantity;
        }
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

selectSize(sizeObj: { size: string, quantity: number }): void {
  this.selectedSize = sizeObj.size;
  this.availableQuantity = sizeObj.quantity;
  this.quantity = 1;
}

increment(): void {
  if (!this.selectedSize) return;
  if (this.quantity < this.availableQuantity) {
    this.quantity++;
  }
}

decrement(): void {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
addToCart(): void {
  if (this.selectedSize) {
    const item = {
       id: this.product.id,
  name: this.product.name,
  size: this.selectedSize,
  quantity: this.quantity,
  image: this.product.image1,
  price: this.product.price,
  payOption: this.payOption,
  availableQuantity: this.availableQuantity 
    };

    this.cartService.addToCart(item).subscribe({
      next: () => {
        this.showPopup = true;
      },
      error: () => {
        alert("Erreur lors de l'ajout au panier.");
      }
    });
  }
}

closePopup(): void {
  this.showPopup = false;
}
goToCart(): void {
  this.router.navigate(['/cart']); 
}


}

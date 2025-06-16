import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cartservice';
import { CommonModule } from '@angular/common';
@Component({
    standalone: true,
  selector: 'app-cart',
    imports: [CommonModule],

  
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQty(item: any): void {
    if (item.quantity < item.availableQuantity) { // tu peux remplacer 10 par item.stock si tu veux
      item.quantity++;
      this.updateCart(item);
    }
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(item);
    }
  }

  removeItem(item: any): void {
    this.cartService.removeItem(item.id, item.size).subscribe(() => {
      this.loadCart();
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateCart(item: any): void {
    // Tu peux ici appeler un PUT si tu veux synchroniser les quantités côté serveur
  }
}

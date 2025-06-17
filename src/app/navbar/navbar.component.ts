import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';
import { CartService } from '../../services/cartservice';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isConnected = false;
  currentUserName: string | null = null;

  constructor(private router: Router, private authService: AuthService,  private cartService: CartService) {}

  ngOnInit(): void {
    this.authService.isConnectedSubject.subscribe(value => {
      this.isConnected = value;
    });
    this.authService.nameSubject.subscribe(name => {
      this.currentUserName = name;
    });
  }

logout(): void {
  this.authService.logout();

  // Supprimer session locale
  sessionStorage.removeItem('cartItems');
  sessionStorage.removeItem('subtotal');
  sessionStorage.removeItem('email');

  // Supprimer panier côté serveur
  this.cartService.clearCart().subscribe({
    next: () => {
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Erreur lors du vidage du panier :', err);
      this.router.navigate(['/']);
    }
  });
}



  reloadPage(): void {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any[] = [];
  products: any[] = [];

  newProduct = {
    name: '',
    price: 0,
    color: '',
    description: '',
    image1: '',
    image2: '',
    category: '',
    sizes: [{ size: '', quantity: 0 }]
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'Admin') {
      alert("⛔ Accès réservé aux admins !");
      this.router.navigate(['/']);
      return;
    }

    this.loadOrders();
    this.loadProducts();
  }

  loadOrders(): void {
    this.http.get<any[]>('http://localhost:3000/api/orders').subscribe(data => {
      this.orders = data;
    });
  }

  loadProducts(): void {
    this.http.get<any[]>('http://localhost:3000/api/products').subscribe(data => {
      this.products = data;
    });
  }

  addProduct(): void {
    this.http.post('http://localhost:3000/api/products', this.newProduct).subscribe(() => {
      alert('✅ Produit ajouté');
      this.loadProducts();
      this.newProduct = {
        name: '',
        price: 0,
        color: '',
        description: '',
        image1: '',
        image2: '',
        category: '',
        sizes: [{ size: '', quantity: 0 }]
      };
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

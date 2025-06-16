import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  // ➕ Ajouter un article au panier
  addToCart(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  // 📦 Récupérer tous les articles du panier
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ❌ Supprimer un article du panier par id + taille
  removeItem(id: string, size: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/${size}`);
  }

  // 🗑️ Vider complètement le panier (optionnel)
  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl); // si tu crées une route DELETE /api/cart
  }
}

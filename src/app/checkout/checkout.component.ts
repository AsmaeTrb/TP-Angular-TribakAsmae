import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  standalone: true,
  selector: 'app-checkout',
    imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],

  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  email: string = '';

  constructor(private router: Router,private http: HttpClient) {}

onContinue() {
  if (this.validateEmail(this.email)) {
    this.http.post('http://localhost:3000/send-email', { email: this.email }).subscribe({
      next: () => {
        alert('Email envoyé ✅');
        this.router.navigate(['/checkout/payment'], { queryParams: { email: this.email } });
      },
      error: () => {
        alert('Erreur : email non envoyé ❌');
      }
    });
  } else {
    alert('Format d’email invalide.');
  }
}


  validateEmail(email: string): boolean {
    return /^\S+@\S+\.\S+$/.test(email);
  }
}

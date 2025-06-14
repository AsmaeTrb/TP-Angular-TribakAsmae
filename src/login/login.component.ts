import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Ajoutez cette ligne


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isEmailVerified: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  verifyEmail() {
    this.isLoading = true;
    this.http.post<any>('http://localhost:3000/api/users/check', { email: this.email })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isEmailVerified = true;
          if (!response.exists) {
            this.router.navigate(['/register'], { 
              state: { email: this.email } 
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la vérification';
        }
      });
  }

  submitPassword() {
    this.isLoading = true;
    this.http.post<any>('http://localhost:3000/api/users/login', { 
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Mot de passe incorrect';
      }
    });
  }

  backToEmail() {
    this.isEmailVerified = false;
    this.password = '';
    this.errorMessage = '';
  }
}
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ← ajouter ceci


@Component({
  selector: 'app-login',
    standalone: true,  // ← très important en standalone
  imports: [FormsModule],  // ← ajouter FormsModule ici

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/api/users/check', { email: this.email })
      .subscribe(response => {
        if (response.exists) {
          alert('Bienvenue ' + response.user.name + '!');
          // tu peux rediriger vers /account ou autre
          this.router.navigate(['/account']); // exemple
        } else {
          alert('Email inconnu → redirection vers Register');
          this.router.navigate(['/register']);
        }
      });
  }
}

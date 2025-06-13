import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';    // <== C'est ça qui te manque !
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
    imports: [CommonModule, RouterModule],   // <== Ajoute RouterModule ici
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  reloadPage(): void {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';

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

  constructor(private router: Router, private authService: AuthService) {}

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
    this.router.navigate(['/']);
  }

  reloadPage(): void {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }
}
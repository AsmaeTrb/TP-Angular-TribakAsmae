import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  isConnectedSubject: BehaviorSubject<boolean>;
  nameSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient) {
    // ✅ Initialisation dans le constructeur, maintenant c’est sûr que le navigateur est prêt
    const email = typeof window !== 'undefined' ? sessionStorage.getItem('email') : null;
    const name = typeof window !== 'undefined' ? sessionStorage.getItem('name') : null;

    this.isConnectedSubject = new BehaviorSubject<boolean>(!!email);
    this.nameSubject = new BehaviorSubject<string | null>(name);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, { email, password });
  }

  setSession(email: string, name: string): void {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('name', name);
    this.isConnectedSubject.next(true);
    this.nameSubject.next(name);
  }

  logout(): void {
    sessionStorage.clear();
    this.isConnectedSubject.next(false);
    this.nameSubject.next(null);
  }
}

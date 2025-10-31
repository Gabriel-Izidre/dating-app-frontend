import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request.interface';
import { RegisterRequest } from '../interfaces/register-request.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
        if (response.user) {
          this.setCurrentUser(response.user);
        }
      })
    );
  }

  registerWithPhoto(userData: RegisterRequest, photo: File): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('dob', userData.dob);
    formData.append('password', userData.password);
    formData.append('confirmPassword', userData.confirmPassword);
    formData.append('gender', userData.gender);
    formData.append('preference', userData.preference);
    formData.append('profilePhoto', photo);
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, formData).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
        if (response.user) {
          this.setCurrentUser(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

export interface IAuthModel {
  success: boolean;
  accessToken: string;
  user: User;
}

export interface ILoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  loginUrl: string = `${this.apiUrl}/login`;

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  access_token$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    const loginInfo = sessionStorage.getItem('login');
    if (loginInfo) {
      const loginObject = JSON.parse(loginInfo);
      this.access_token$.next(loginObject.accessToken);
      this.user$.next(loginObject.user);
    }

    this.user$.subscribe({
      next: (user) => {
        // console.log('AuthService user$ subscription:', user);
        if (user) {
          // console.log('User logged in, navigating to home');
          this.router.navigate(['/']);
        } else {
          // console.log('User logged out');
          this.access_token$.next('');
          sessionStorage.removeItem('login');
        }
      },
    });
  }

  login(loginData: ILoginData): void {
    this.http.post<IAuthModel>(this.loginUrl, loginData)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe({
        next: (response: IAuthModel) => {
          // console.log('Login response:', response);
          if (response.success) {
            // console.log('Setting user in AuthService:', response.user);
            this.user$.next(response.user); // Helyes kulcs használata
            this.access_token$.next(response.accessToken);
            sessionStorage.setItem('login', JSON.stringify(response));
            this.router.navigate(['/']);
          } else {
            this.handleLoginError('Login failed: Invalid credentials.');
          }
        },
        error: (err) => {
          this.handleLoginError('Login failed: ' + err.message);
        }
      });
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ismeretlen hiba történt!';
    if (error.error instanceof ErrorEvent) {
      // Kliens oldali hiba
      errorMessage = `Hiba: ${error.error.message}`;
    } else {
      // Backend hiba
      errorMessage = `${error.status}: ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  handleLoginError(message: string): void {
    console.error(message);
    alert(message);  // Vizuális hibajelzés a felhasználónak
    this.router.navigate(['/', 'login']);
  }

  logout(): void {
    // console.log('Logging out...');
    sessionStorage.removeItem('login');
    this.user$.next(null);
    // console.log('User after logout:', this.user$.value);
  }
}

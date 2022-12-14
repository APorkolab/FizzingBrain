import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

export interface IAuthModel {
  success: boolean;
  accessToken: string;
  User: User;
}


export interface ILoginData {
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  loginUrl: string = '';

  user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  access_token$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    this.loginUrl = `${this.apiUrl}/login`;

    const loginInfo = sessionStorage.getItem('login');
    if (loginInfo) {
      const loginObject = JSON.parse(loginInfo);
      this.access_token$.next(loginObject.accessToken);
      this.user$.next(loginObject.User);
    }

    this.user$.subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/']);
        } else {

          this.access_token$.next('');
          sessionStorage.removeItem('login');
        }
      },
    });
  }

  login(loginData: ILoginData): void {
    this.http.post<IAuthModel>(this.loginUrl, loginData).subscribe({
      next: (response: IAuthModel) => {
        this.user$.next(response.User);
        this.access_token$.next(response.accessToken);
        sessionStorage.setItem('login', JSON.stringify(response));
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/', 'login']);
      }
    });
  }

  logout(): void {
    sessionStorage.removeItem('login');
    this.user$.next(null);
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, ILoginData } from 'src/app/service/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class LoginComponent implements OnInit {
  loginData: ILoginData = { email: '', password: '' };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.logout();
  }

  onLogin(): void {
    console.log('Attempting login with:', this.loginData);
    // Ellenőrizzük, hogy az email és jelszó nem üres-e
    if (this.loginData.email && this.loginData.password) {
      this.auth.login(this.loginData);
    } else {
      console.error('Email vagy jelszó hiányzik');
      // Itt jelenítsen meg egy hibaüzenetet a felhasználónak
    }
  }
}

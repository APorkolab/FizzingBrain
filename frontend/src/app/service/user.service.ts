import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';
import { User } from '../model/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService
  extends BaseService<User> {
  constructor(http: HttpClient, config: ConfigService) {
    super(http, config);
    this.entity = 'user';
  }
}





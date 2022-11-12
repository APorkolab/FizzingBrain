
import { Injectable } from '@angular/core';
import { INgxTableColumn } from '../common/data-table/ngx-data-table/ngx-data-table.component';

export interface IMenuItem {
  link: string;
  title: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})

export class ConfigService {
  sidebarMenu: IMenuItem[] = [
    { link: '/', title: 'Dashboard', icon: 'home' },
    { link: '/movies', title: 'Planned Films', icon: 'calendar' },
    { link: '/watched-movies', title: 'Watched Films', icon: 'Youtube' },
    { link: '/directors', title: 'Directors', icon: 'video' },
    { link: '/main-actors', title: 'Main Actors', icon: 'film' },
    { link: '/family-members', title: 'Family Members', icon: 'users' },
  ];

  questionsColumn: INgxTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'hungarianQuestion', title: 'Hungarian question' },
    { key: 'englishQuestion', title: 'English question' },
    { key: 'hungarianAnswer', title: 'Hungarian answer' },
    { key: 'englishAnswer', title: 'English answer' },
    { key: 'descriptionHungarian', title: 'Description Hungarian' },
    { key: 'descriptionEnglish', title: 'Description English' },
  ];

  usersColumn: INgxTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'firstName', title: 'First name' },
    { key: 'lastName', title: 'Last name' },
    { key: 'email', title: 'E-mail' },
    { key: 'password', title: 'Password' },
  ];


  constructor() { }
}
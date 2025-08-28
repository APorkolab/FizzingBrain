import { Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { FizzingbrainComponent } from './page/fizzingbrain/fizzingbrain.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { QuestionsComponent } from './page/questions/questions.component';
import { RulesComponent } from './page/rules/rules.component';
import { UsersComponent } from './page/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fizzingbrain', component: FizzingbrainComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersComponent },
  { path: 'question', component: QuestionsComponent },
  { path: '**', redirectTo: '' },
];

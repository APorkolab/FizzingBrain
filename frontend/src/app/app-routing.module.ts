import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { FizzingbrainComponent } from './page/fizzingbrain/fizzingbrain.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { QuestionsEditorComponent } from './page/questions-editor/questions-editor.component';
import { QuestionsComponent } from './page/questions/questions.component';
import { RulesComponent } from './page/rules/rules.component';
import { UsersEditorComponent } from './page/users-editor/users-editor.component';
import { UsersComponent } from './page/users/users.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'forbidden',
  component: ForbiddenComponent,
},
{
  path: 'fizzingbrain',
  component: FizzingbrainComponent,
},
{
  path: 'user/edit/`0`',
  component: UsersEditorComponent,
  canActivate: [AuthGuardService],
},
{
  path: 'user/edit/:id',
  component: UsersEditorComponent,
  canActivate: [AuthGuardService],
},
{
  path: 'user',
  component: UsersComponent,
  canActivate: [AuthGuardService],
},
{
  path: 'question/edit/`0`',
  component: QuestionsEditorComponent,
  canActivate: [AuthGuardService],
},
{
  path: 'question/edit/:id',
  component: QuestionsEditorComponent,
  canActivate: [AuthGuardService],
},
{
  path: 'question',
  component: QuestionsComponent,

},
{
  path: 'rules',
  component: RulesComponent,
},
{
  path: 'contact',
  component: ContactComponent,
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

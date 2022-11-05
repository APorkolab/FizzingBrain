import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { ContactComponent } from './page/contact/contact.component';
import { RulesComponent } from './page/rules/rules.component';
import { LoginComponent } from './page/login/login.component';
import { UsersComponent } from './page/users/users.component';
import { QuestionsComponent } from './page/questions/questions.component';
import { UsersEditorComponent } from './page/users-editor/users-editor.component';
import { QuestionsEditorComponent } from './page/questions-editor/questions-editor.component';
import { FizzingbrainComponent } from './page/fizzingbrain/fizzingbrain.component';
import { FilterPipe } from './pipe/filter.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './service/auth.service';
import { JwtInterceptor } from './service/jwt.interceptor';
import { ConfigService, IMenuItem } from './service/config.service';
import { DataTableModule } from './common/data-table/data-table.module';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    HomeComponent,
    ContactComponent,
    RulesComponent,
    LoginComponent,
    UsersComponent,
    QuestionsComponent,
    UsersEditorComponent,
    QuestionsEditorComponent,
    FizzingbrainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  sidebar: IMenuItem[] = this.config.sidebarMenu;

  constructor(private config: ConfigService) { }
}
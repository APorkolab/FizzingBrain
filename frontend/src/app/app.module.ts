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
import { HttpBackend, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AuthService } from './service/auth.service';
import { JwtInterceptor } from './service/jwt.interceptor';
import { ConfigService, IMenuItem } from './service/config.service';
import { DataTableModule } from './common/data-table/data-table.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeadbarComponent } from './common/headbar/headbar.component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { IconModule } from './common/icon/icon.module';
import { forwardRef } from '@angular/core';

export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(httpBackend, [
    './assets/translate/core/',
    './assets/translate/shared/',
  ]);
}

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
    HeadbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule,
    IconModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    // FontAwesomeModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      onActivateTick: true,
      closeButton: true,
      preventDuplicates: true,
      timeOut: 5000,
      extendedTimeOut: 3000,
    }),
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
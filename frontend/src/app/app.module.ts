import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { DataTableModule } from './common/data-table/data-table.module';

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
import { HeadbarComponent } from './common/headbar/headbar.component';
import { IconModule } from './common/icon/icon.module';
import { AuthService } from './service/auth.service';
import { ConfigService } from './service/config.service';
import { JwtInterceptor } from './service/jwt.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initializeApp(translateService: TranslateService) {
  return () => new Promise<void>(resolve => {
    translateService.setDefaultLang('hu');
    translateService.use('hu').subscribe(() => {
      console.log('Translations loaded');
      resolve();
    });
  });
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
    IconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
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
    DataTableModule,
  ],
  exports: [FormsModule],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslateService],
      multi: true
    },
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private config: ConfigService) { }
}
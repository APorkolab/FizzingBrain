import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import {
  TRANSLATE_HTTP_LOADER_CONFIG,
  TranslateHttpLoader,
} from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { jwtInterceptor } from './service/jwt.interceptor';

export function httpLoaderFactory() {
  return new TranslateHttpLoader(); // 0 paraméteres loader
}

// 👉 Default EN fordítás betöltés induláskor
export function initTranslations(translate: TranslateService) {
  return () =>
    new Promise<void>((resolve) => {
      translate.addLangs(['en', 'hu']);
      translate.setDefaultLang('en');
      translate.use('en').subscribe({
        next: () => resolve(),
        error: () => resolve(), // fallback: ne akadjon meg a boot
      });
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimations(),
    provideRouter(routes),

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
        },
      }),
      ToastrModule.forRoot({
        positionClass: 'toast-top-center',
        closeButton: true,
        preventDuplicates: true,
        timeOut: 5000,
        extendedTimeOut: 3000,
      }),
    ),

    // loader config
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: '/assets/i18n/',
        suffix: '.json',
      },
    },

    // default EN init
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslations,
      deps: [TranslateService],
      multi: true,
    },
  ],
};

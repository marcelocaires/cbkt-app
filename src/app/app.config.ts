import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpInterceptor } from './core/interceptors/http-interceptor';
// REGISTRA O LOCALE (importa base + extra)
import { registerLocaleData } from '@angular/common';
import ptBrExtra from '@angular/common/locales/extra/pt';
import ptBr from '@angular/common/locales/pt';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
registerLocaleData(ptBr, 'pt-BR', ptBrExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideClientHydration(),
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(
      withFetch(),
      withInterceptors([HttpInterceptor])
    ),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ]
};

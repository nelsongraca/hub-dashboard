import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideOAuthClient} from "angular-oauth2-oidc";
import {Config} from "./service/Config";
import {Observable} from "rxjs";


const initConfig = (config: Config): (() => Observable<boolean>) => {
  return () => config.load();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [Config],
      multi: true
    },
  ]
};

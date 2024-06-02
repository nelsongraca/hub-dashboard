import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {Config} from "./service/Config";
import {Observable} from "rxjs";

const initConfig = (config: Config): (() => Observable<boolean>) => {
  return () => config.load();
};

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppComponent],
  providers: [
    Config,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [Config],
      multi: true
    },
  ],
})
export class AppModule {
}

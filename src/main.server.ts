/*
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/ssr';
import { App } from './app/app';
import { config } from './app/app.config.server';

export default () => bootstrapApplication(App, {
  ...config,
  providers: [
    ...config.providers,
    provideServerRendering()
  ]
});
*/
import {
  bootstrapApplication,
  BootstrapContext
} from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;

import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideToastr } from "ngx-toastr";
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false //i love it when i can see the same message multiple times
    }),
    importProvidersFrom(BsDatepickerModule.forRoot()),
    provideHttpClient()
  ]
};

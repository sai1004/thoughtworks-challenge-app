import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import { Props } from './app/shared/utils/props';

if (environment.production) {
    enableProdMode();
}

Props.API_END_POINT = environment.API_END_POINT;

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

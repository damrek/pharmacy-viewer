import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ConfigService } from './app/services/config.service';

ConfigService.set('apifarmacias', 'http://www.zaragoza.es/sede/servicio/farmacia.json');
ConfigService.set('apifarmacia', 'http://www.zaragoza.es/sede/servicio/farmacia/');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

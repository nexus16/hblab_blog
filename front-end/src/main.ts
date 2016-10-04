import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode, ComponentRef } from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend, Http } from '@angular/http';
import {FORM_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import 'rxjs/Rx';
import {MATERIAL_DIRECTIVES,MATERIAL_PROVIDERS} from 'ng2-material';

import { HbBlogAppComponent, environment } from './app/';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import {AppSetting} 			from './app/shared';
import {ApiConfig} from 'angular2-active-record';
import { AuthService } from './app/services/auth.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(HbBlogAppComponent, [
  ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	FORM_PROVIDERS,
	MATERIAL_PROVIDERS,
	provide(AuthConfig, {
		useValue: new AuthConfig({
			headerName: 'X-AUTH-TOKEN',
			tokenName: 'X-AUTH-TOKEN',
			headerPrefix: '',
			noJwtError: true
		})
  }),
  AppSetting,AuthService,
	provide(ApiConfig, {
		useValue: new ApiConfig({
			urlAPI:  AppSetting.API_URL
		})
	}),
  provide(APP_BASE_HREF, { useValue: '/' }),
	provide(LocationStrategy,
		{ useClass: HashLocationStrategy }),
  AuthHttp,
]);


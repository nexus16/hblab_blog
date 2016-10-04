import {Injectable}     		from '@angular/core';
import {Response} 		        from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {AuthHttp}               from 'angular2-jwt';

import {Posttag}           		from '../models/posttag.model';
import {ActiveRecord, ApiConfig}from 'angular2-active-record';



@Injectable()
export class PosttagService extends ActiveRecord<Posttag> {
	constructor(public options: ApiConfig, public authHttp: AuthHttp) {
		super(options, authHttp, "posttag");
	}
}
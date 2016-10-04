import {Injectable}     		from '@angular/core';
import {Response} 		        from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {AuthHttp}               from 'angular2-jwt';

import {Tag}           		from '../models/tag.model';
import {ActiveRecord, ApiConfig}from 'angular2-active-record';



@Injectable()
export class TagService extends ActiveRecord<Tag> {
	constructor(public options: ApiConfig, public authHttp: AuthHttp) {
		super(options, authHttp, "tags");
	}
}
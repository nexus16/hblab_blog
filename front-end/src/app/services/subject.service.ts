import {Injectable}     		from '@angular/core';
import {Response} 		        from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {AuthHttp}               from 'angular2-jwt';

import {Subject}           		from '../models/subject.model';
import {ActiveRecord, ApiConfig}from 'angular2-active-record';



@Injectable()
export class SubjectService extends ActiveRecord<Subject> {
	constructor(public options: ApiConfig, public authHttp: AuthHttp) {
		super(options, authHttp, "subjects");
	}
}
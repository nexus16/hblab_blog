import {Injectable}     		from '@angular/core';
import {Response} 		        from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {AuthHttp}               from 'angular2-jwt';

import {Project}           		from '../models/project.model';
import {ActiveRecord, ApiConfig}from 'angular2-active-record';



@Injectable()
export class ProjectService extends ActiveRecord<Project> {
	constructor(public options: ApiConfig, public authHttp: AuthHttp) {
		super(options, authHttp, "projects");
	}
}
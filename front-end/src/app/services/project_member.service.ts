import {Injectable}     		from '@angular/core';
import {Response} 		        from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {AuthHttp}               from 'angular2-jwt';

import {ProjectMember}           		from '../models/project_member.model';
import {ActiveRecord, ApiConfig}from 'angular2-active-record';



@Injectable()
export class ProjectMemberService extends ActiveRecord<ProjectMember> {
	constructor(public options: ApiConfig, public authHttp: AuthHttp) {
		super(options, authHttp, "project_member");
	}
}
import {Injectable}     		from '@angular/core';
import {Response} 		        from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {AuthHttp}               from 'angular2-jwt';

import {Comment}           		from '../models/comment.model';
import {ActiveRecord, ApiConfig}from 'angular2-active-record';



@Injectable()
export class CommentService extends ActiveRecord<Comment> {
	constructor(public options: ApiConfig, public authHttp: AuthHttp) {
		super(options, authHttp, "comments");
	}
}
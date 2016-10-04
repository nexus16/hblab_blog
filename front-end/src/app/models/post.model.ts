//import {Tag} from './tag.model';
import {User} from './user.model';
import {Tag} from './tag.model';
export interface Post {
	id?: string,
	number_id?:number,
	title: string,
	short_content?: string,
	tags?: Array<any>,
	content: string,
	status?: boolean,
	created_by?:number;
	created_at?: Date,
	updated_at?: Date,
	updated_by?: any,
	avatar?:any;
	subject?:any;
	comments?:Array<any>;
	created_user?:User,
}
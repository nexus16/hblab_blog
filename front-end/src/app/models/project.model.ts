import {User} from './user.model';
import {Subject} from './subject.model';
import {Post} from './post.model';

export interface Project {
	id?: any;
	id_number?:number,
	name: string,
	description?: string,
	logo?: string,
	members?: Array<User>,
	status?: boolean,
	subjects?: Array<Subject>,
	start_at?: string,
	end_at?: string,
	created_by?: User,
	posts?: Array<Post>
	leader?:Array<any>
}

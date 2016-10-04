import { Post } from './post.model'
export interface Subject {
	id?: number;
	title: string,
	position?: number,
	subjects?: Array<Subject>,
	has_child?: boolean,
	posts?: Array<Post>,
	display: boolean
}

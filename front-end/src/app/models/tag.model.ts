import { Post } from './post.model'
export interface Tag {
	id?:number,
	name?: string,
	num_posts?:number;
	posts?: Array<Post>
}
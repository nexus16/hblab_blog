export enum Role{Admin = 1, SubAdmin = 2, Mod = 3, Member = 4}
import { Post } from './post.model'
export interface User {
	id?:number,
	username: string,
	password?:string,
	first_name?: string,
	last_name?: string,
	email?:string,
	avatar?: string,
	role?: Role,
	posts?: Array<Post>,
	leader?:boolean
}
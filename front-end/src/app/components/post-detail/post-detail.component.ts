/// <reference path="../../../../typings/globals/marked/index.d.ts"/>
import {Component, OnInit} from '@angular/core'
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {Router, RouteParams} from '@angular/router-deprecated';
import * as marked from 'marked';

import {Post} from '../../models/post.model';
import {PostService} from '../../services/post.service'

import {Comment} from '../../models/comment.model';
import {CommentService} from '../../services/comment.service';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

import {TagInputComponent} from '../tag-input';


@Component({
  moduleId: module.id,
  selector: 'hb-project-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['post-detail.component.css'],
  directives: [MATERIAL_DIRECTIVES,TagInputComponent],
	providers: [PostService,CommentService]
})
export class PostDetailComponent implements OnInit {
  private md: MarkedStatic;
	post: Post = {title: "",content: ""};
	listComment: Array<Comment>;
	postId: string;
	postIdNumber:number;
	errorMessage: string;
	user: User;
	private md_comment: MarkedStatic;
  	public commentMarked: string ;
  	demoClick: boolean = false;

	constructor(private _authService: AuthService,private _postService: PostService, private params: RouteParams, private _commentService: CommentService) {
		this.postId = params.get("id");
		this.md = marked;
		this.md_comment = marked;
		this.commentMarked = "";
		
		this.user = this._authService.getUserInfo();
		console.log(this.user);
		console.log("flag");
	}
	ngOnInit() { 
		this.getPost(this.postId) ;
		
	}

	getPost(id) {
		this._postService.find(id)
			.then(
				post => {
					this.post = post;
					this.post.content = this.md.parse(post.content);
					this.listComment = post.comments;
					for(let i=0; i<post.comments.length; i++){
						this.listComment[i].content = this.md_comment.parse(post.comments[i].content);
					}
					
				})
			.catch(
				error => this.errorMessage = error
			);
			
	}


	
	
	addComment(comment: string){
		//console.log(comment);
		let com : any = {content: comment, post_id: this.post.number_id};

		this._commentService.
		    insert({comment:com})
		    .then(
		      res => {
		      	this.getPost(this.postId);
		      }
		    ).catch(error => this.errorMessage);
		
	}

	convertMark(comment:string){
		console.log(comment);
      this.commentMarked = this.md_comment.parse(comment);
	}


}


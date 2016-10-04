import { Component, OnInit } from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import { RouteParams } from '@angular/router-deprecated';


import { TagService } from '../../services/tag.service';
import { UserService } from '../../services/user.service';
import { Tag } from '../../models/tag.model';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-tags',
  templateUrl: 'tags.component.html',
  styleUrls: ['tags.component.css'],
   directives: [MATERIAL_DIRECTIVES],
  providers: [TagService,UserService]
})
export class TagsComponent implements OnInit {

	posts: Array<Post>;
	users: Array<User>;
	errorMessage: string;

  constructor(private tagService: TagService,private routeParams: RouteParams,private userService: UserService) {}

  ngOnInit() {
  	this.getUsers();

  	if(this.routeParams.get('id') !== null){
			let id = this.routeParams.get('id');
			this.getPostByTag(id);
 
		}
   	
  }

 getUsers() {
    this.userService
    .findAll()
    .then(users => {this.users = users;console.log(this.users);})
    .catch( error => this.errorMessage = error)
  }

  getPostByTag(id){
  	this.tagService.find(id)
  	.then(
  		tags => {
  			this.posts = tags.posts;
  			let listUser= this.users;
  			for(let i=0; i<tags.posts.length; i++){
  				this.posts[i].created_user = listUser.filter(function(value){
  					return value.id == tags.posts[i].created_by;
  				})[0];
  			 }

  			 console.log(this.posts);
  			}
  	).catch(error => this.errorMessage = error)
  }



}

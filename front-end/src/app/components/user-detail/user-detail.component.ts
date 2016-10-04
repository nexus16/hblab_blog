import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';


import {MATERIAL_DIRECTIVES} from 'ng2-material';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post.model';

@Component({
  moduleId: module.id,
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.css'],
  directives:[MATERIAL_DIRECTIVES],
  providers: [UserService]
})
export class UserDetailComponent implements OnInit {
	user : User;
	posts: Array<Post>;
	errorMessage: string;
	userId : string;
  constructor(private _userService: UserService, private params: RouteParams) {
  	this.userId = params.get("id");
  }

  ngOnInit() {
  	this.getUser(this.userId);
  }

  getUser(id){
  	this._userService.find(id)
  	.then(
  		user => {
  			this.user = user;
  			this.posts = user.posts;
  			console.log(user);
  		})
      .catch(error => this.errorMessage = error)
  }


}
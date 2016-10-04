import { Component, OnInit } from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Router, RouteParams} from '@angular/router-deprecated';

import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { PictureUploaderComponent } from '../picture-uploader';

@Component({
  moduleId: module.id,
  selector: 'app-user-new',
  templateUrl: 'user-new.component.html',
  styleUrls: ['user-new.component.css'],
  directives:[ MATERIAL_DIRECTIVES,MD_INPUT_DIRECTIVES,PictureUploaderComponent ],
  providers: [ HTTP_PROVIDERS, UserService ],
})
export class UserNewComponent implements OnInit {
	uploaderOptions:any = {
  	url:"http://localhost:3456/api/v1/uploads/",
  	customHeaders: {
  		"X-AUTH-TOKEN" : localStorage.getItem('X-AUTH-TOKEN')
  	}
  };
	user: User={username: "", first_name:"", last_name:"", email:"", avatar:"", password:""};
	errorMessage: any;
	title: string;
	button: string;
	listUser: Array<User>;
	usernameExisted: boolean = false;
	emailExisted: boolean = false;
  constructor(private _userService: UserService,  private _router: Router, private _routeParam: RouteParams ) {

  }

  ngOnInit() {
		if (this._routeParam.get('id')) {
			this._userService.find(this._routeParam.get('id'))
			.then(
			user => { 
					this.user = user;
					console.log(user);
					//#TODO if post is null
			})
			.catch(error => this.errorMessage = error);
			this.title="Edit user";
			this.button="Update";
		}
		else {
			this.title="Create user";
			this.button="Create";
		}
		this.getListUser();
	}

	getListUser(){
		this._userService.findAll().then(users => this.listUser=users).catch(error => this.errorMessage = error );
	}

	checkExistedUsername(username: string){
		let user = this.listUser.filter(function(check){return check.username == username});
		if(user.length > 0)
			this.usernameExisted = true;
		else this.usernameExisted = false;
	}

	checkExistedEmail(email: string){
		let user = this.listUser.filter(function(check){return check.email == email});
		if(user.length > 0)
			this.emailExisted = true;
		else this.emailExisted = false;
	}

	save(user : User){
		if (this._routeParam.get('id')) {
			this._userService.update(this._routeParam.get('id'),{ user: user })
				.then(
					res => {
						this._router.navigate(["UserDetail", { id: res.id }]);
						console.log(res);
						
					})
				.catch(
					error =>{this.errorMessage = <any>error} 
			);
		} 
		else{
			this._userService.insert({user: user})
				.then(
					response => {
						this._router.navigate(["UserDetail", { id: response.id }]);
						console.log(response);
						console.log(user);
					}).catch(
					error =>{
						 this.errorMessage = <any>error;
						 console.log(error);
				
					}
				)
		}
		
	}

}

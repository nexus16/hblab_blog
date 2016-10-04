import { FORM_DIRECTIVES, NgForm } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouteConfig } from '@angular/router-deprecated';

import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls : ['login.component.css'],
  directives: [ 
	  MD_INPUT_DIRECTIVES, 
	  FORM_DIRECTIVES, 
	  MATERIAL_DIRECTIVES, 
	  MdToolbar,
	],
  providers: [ AuthService ]
})

export class LoginComponent {
	constructor(private _router: Router, private _authService: AuthService) { };
	error: String;
	login(username:any, password:any) {
		this._authService.login(username, password).then(
			result => {
				if(result){
					this._router.navigate(['Posts']);
				}else{

				}
			}
		).catch(Error =>{
			this.error = Error.toString();
		})
	}
}
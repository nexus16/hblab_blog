import {Injectable}     		from '@angular/core';
import {Response} 		        from '@angular/http';
import {Http, Headers, RequestOptions}from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthHttp }             from 'angular2-jwt';

import {AppSetting} 			from '../shared';
import {User}           		from '../models/user.model';


@Injectable()
export class AuthService{
	private loggedIn = false;
	private userInfo: User = null;
	private adminLogined = false;
    constructor(private _authHttp: AuthHttp, private http: Http) {
		this.loggedIn = !!localStorage.getItem('X-AUTH-TOKEN');
	}

	login(username:any, password:any) {
		//event.preventDefault();
		let body = JSON.stringify({ auth: { username: username, password: password } });
		let contentHeaders = new Headers({ 'Content-Type': 'application/json' });
		contentHeaders.append('Accept', 'application/json');
		contentHeaders.append('Content-Type', 'application/json');

		//#TODO error
		return this.http.post(AppSetting.API_URL + '/auth_token', body, { headers: contentHeaders })
			.toPromise().then(res => {
				var result = res.json();
				if (result.jwt) {
					localStorage.setItem('X-AUTH-TOKEN', result.jwt);
					this.getProfile();
					this.loggedIn = true;
					return result.jwt;
				} else {
          return null;
				}
			}).catch(Error=>{
				return Promise.reject(Error.message || Error);
			})
	}
	getProfile() {
        return this._authHttp.get(AppSetting.API_URL + '/profile').subscribe(
            user => {this.userInfo = user.json();
            if(this.userInfo.username == "admin")
            	this.adminLogined = true;
            else this.adminLogined = false;
        } 
    	);
	}
	getUserInfo() {
		return this.userInfo;
	}
	logout() {
		localStorage.removeItem('X-AUTH-TOKEN');
		this.loggedIn = false;
		this.userInfo = null;
	}

	isLoggedIn() {
		return !!localStorage.getItem('X-AUTH-TOKEN');
	}

	adminIsLogin(){
		return this.adminLogined;
	}

}
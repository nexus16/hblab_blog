"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var shared_1 = require('../shared');
var AuthService = (function () {
    function AuthService(_authHttp, http) {
        this._authHttp = _authHttp;
        this.http = http;
        this.loggedIn = false;
        this.userInfo = null;
        this.adminLogined = false;
        this.loggedIn = !!localStorage.getItem('X-AUTH-TOKEN');
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        //event.preventDefault();
        var body = JSON.stringify({ auth: { username: username, password: password } });
        var contentHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        //#TODO error
        return this.http.post(shared_1.AppSetting.API_URL + '/auth_token', body, { headers: contentHeaders })
            .toPromise().then(function (res) {
            var result = res.json();
            if (result.jwt) {
                localStorage.setItem('X-AUTH-TOKEN', result.jwt);
                _this.getProfile();
                _this.loggedIn = true;
                return result.jwt;
            }
            else {
                return null;
            }
        }).catch(function (Error) {
            return Promise.reject(Error.message || Error);
        });
    };
    AuthService.prototype.getProfile = function () {
        var _this = this;
        return this._authHttp.get(shared_1.AppSetting.API_URL + '/profile').subscribe(function (user) {
            _this.userInfo = user.json();
            if (_this.userInfo.username == "admin")
                _this.adminLogined = true;
            else
                _this.adminLogined = false;
        });
    };
    AuthService.prototype.getUserInfo = function () {
        return this.userInfo;
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('X-AUTH-TOKEN');
        this.loggedIn = false;
        this.userInfo = null;
    };
    AuthService.prototype.isLoggedIn = function () {
        return !!localStorage.getItem('X-AUTH-TOKEN');
    };
    AuthService.prototype.adminIsLogin = function () {
        return this.adminLogined;
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
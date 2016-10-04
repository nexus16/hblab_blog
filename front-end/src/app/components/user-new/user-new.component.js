"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var input_1 = require('@angular2-material/input');
var ng2_material_1 = require('ng2-material');
var user_service_1 = require('../../services/user.service');
var picture_uploader_1 = require('../picture-uploader');
var UserNewComponent = (function () {
    function UserNewComponent(_userService, _router, _routeParam) {
        this._userService = _userService;
        this._router = _router;
        this._routeParam = _routeParam;
        this.uploaderOptions = {
            url: "http://localhost:3456/api/v1/uploads/",
            customHeaders: {
                "X-AUTH-TOKEN": localStorage.getItem('X-AUTH-TOKEN')
            }
        };
        this.user = { username: "", first_name: "", last_name: "", email: "", avatar: "", password: "" };
        this.usernameExisted = false;
        this.emailExisted = false;
    }
    UserNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._routeParam.get('id')) {
            this._userService.find(this._routeParam.get('id'))
                .then(function (user) {
                _this.user = user;
                console.log(user);
                //#TODO if post is null
            })
                .catch(function (error) { return _this.errorMessage = error; });
            this.title = "Edit user";
            this.button = "Update";
        }
        else {
            this.title = "Create user";
            this.button = "Create";
        }
        this.getListUser();
    };
    UserNewComponent.prototype.getListUser = function () {
        var _this = this;
        this._userService.findAll().then(function (users) { return _this.listUser = users; }).catch(function (error) { return _this.errorMessage = error; });
    };
    UserNewComponent.prototype.checkExistedUsername = function (username) {
        var user = this.listUser.filter(function (check) { return check.username == username; });
        if (user.length > 0)
            this.usernameExisted = true;
        else
            this.usernameExisted = false;
    };
    UserNewComponent.prototype.checkExistedEmail = function (email) {
        var user = this.listUser.filter(function (check) { return check.email == email; });
        if (user.length > 0)
            this.emailExisted = true;
        else
            this.emailExisted = false;
    };
    UserNewComponent.prototype.save = function (user) {
        var _this = this;
        if (this._routeParam.get('id')) {
            this._userService.update(this._routeParam.get('id'), { user: user })
                .then(function (res) {
                _this._router.navigate(["UserDetail", { id: res.id }]);
                console.log(res);
            })
                .catch(function (error) { _this.errorMessage = error; });
        }
        else {
            this._userService.insert({ user: user })
                .then(function (response) {
                _this._router.navigate(["UserDetail", { id: response.id }]);
                console.log(response);
                console.log(user);
            }).catch(function (error) {
                _this.errorMessage = error;
                console.log(error);
            });
        }
    };
    UserNewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-new',
            templateUrl: 'user-new.component.html',
            styleUrls: ['user-new.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES, picture_uploader_1.PictureUploaderComponent],
            providers: [http_1.HTTP_PROVIDERS, user_service_1.UserService]
        })
    ], UserNewComponent);
    return UserNewComponent;
}());
exports.UserNewComponent = UserNewComponent;
//# sourceMappingURL=user-new.component.js.map
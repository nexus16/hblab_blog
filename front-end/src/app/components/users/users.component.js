"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_material_1 = require('ng2-material');
var input_1 = require('@angular2-material/input');
var user_service_1 = require('../../services/user.service');
var UsersComponent = (function () {
    function UsersComponent(userService) {
        this.userService = userService;
        this.subAdmin = '';
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService
            .findAll()
            .then(function (users) { return _this.users = users; })
            .catch(function (error) { return _this.errorMessage = error; });
    };
    UsersComponent.prototype.searchUser = function (key) {
        if (key.length == 0) {
            this.listSearchUser = null;
            return;
        }
        this.listSearchUser = this.users.filter(function (user) {
            return user.username == key;
        });
    };
    UsersComponent.prototype.add = function (key) {
        this.subAdmin = key;
    };
    UsersComponent.prototype.searchUser = function () {
    };
    UsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-users',
            templateUrl: 'users.component.html',
            styleUrls: ['users.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES],
            providers: [user_service_1.UserService]
        })
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_material_1 = require('ng2-material');
var user_service_1 = require('../../services/user.service');
var UserDetailComponent = (function () {
    function UserDetailComponent(_userService, params) {
        this._userService = _userService;
        this.params = params;
        this.userId = params.get("id");
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        this.getUser(this.userId);
    };
    UserDetailComponent.prototype.getUser = function (id) {
        var _this = this;
        this._userService.find(id)
            .then(function (user) {
            _this.user = user;
            _this.posts = user.posts;
            console.log(user);
        })
            .catch(function (error) { return _this.errorMessage = error; });
    };
    UserDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-detail',
            templateUrl: 'user-detail.component.html',
            styleUrls: ['user-detail.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES],
            providers: [user_service_1.UserService]
        })
    ], UserDetailComponent);
    return UserDetailComponent;
}());
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map
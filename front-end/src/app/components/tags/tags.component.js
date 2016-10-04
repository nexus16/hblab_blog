"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_material_1 = require('ng2-material');
var tag_service_1 = require('../../services/tag.service');
var user_service_1 = require('../../services/user.service');
var TagsComponent = (function () {
    function TagsComponent(tagService, routeParams, userService) {
        this.tagService = tagService;
        this.routeParams = routeParams;
        this.userService = userService;
    }
    TagsComponent.prototype.ngOnInit = function () {
        this.getUsers();
        if (this.routeParams.get('id') !== null) {
            var id = this.routeParams.get('id');
            this.getPostByTag(id);
        }
    };
    TagsComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService
            .findAll()
            .then(function (users) { _this.users = users; console.log(_this.users); })
            .catch(function (error) { return _this.errorMessage = error; });
    };
    TagsComponent.prototype.getPostByTag = function (id) {
        var _this = this;
        this.tagService.find(id)
            .then(function (tags) {
            _this.posts = tags.posts;
            var listUser = _this.users;
            var _loop_1 = function(i) {
                _this.posts[i].created_user = listUser.filter(function (value) {
                    return value.id == tags.posts[i].created_by;
                })[0];
            };
            for (var i = 0; i < tags.posts.length; i++) {
                _loop_1(i);
            }
            console.log(_this.posts);
        }).catch(function (error) { return _this.errorMessage = error; });
    };
    TagsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-tags',
            templateUrl: 'tags.component.html',
            styleUrls: ['tags.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES],
            providers: [tag_service_1.TagService, user_service_1.UserService]
        })
    ], TagsComponent);
    return TagsComponent;
}());
exports.TagsComponent = TagsComponent;
//# sourceMappingURL=tags.component.js.map
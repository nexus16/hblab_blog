"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_material_1 = require('ng2-material');
var post_service_1 = require('../../services/post.service');
var progress_circle_1 = require('@angular2-material/progress-circle');
var PostsComponent = (function () {
    function PostsComponent(postService, router) {
        this.postService = postService;
        this.router = router;
        this.onSearch = false;
        this.page = 0;
        this.isload = true;
    }
    PostsComponent.prototype.ngOnInit = function () {
        this.getPost();
    };
    PostsComponent.prototype.getPost = function () {
        var _this = this;
        this.isload = true;
        this.postService
            .findAll({ page: ++this.page, sort: "updated_at desc" })
            .then(function (posts) {
            _this.isload = false;
            _this.allPosts = posts;
            _this.posts = _this.posts ? _this.posts.concat(posts) : posts;
            console.log(posts);
        }).catch(function (error) { return console.log(error); });
    };
    PostsComponent.prototype.searchPost = function (key) {
        this.onSearch = true;
        this.postSearch = this.allPosts.filter(function (value) {
            return value.short_content.includes(key);
        });
        console.log(this.postSearch);
    };
    PostsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hblab-posts',
            templateUrl: 'posts.component.html',
            styleUrls: ['posts.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES, progress_circle_1.MdProgressCircle],
            providers: [post_service_1.PostService]
        })
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
//# sourceMappingURL=posts.component.js.map
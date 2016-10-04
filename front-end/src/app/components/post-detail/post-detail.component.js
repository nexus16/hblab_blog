"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../typings/globals/marked/index.d.ts"/>
var core_1 = require('@angular/core');
var ng2_material_1 = require('ng2-material');
var marked = require('marked');
var post_service_1 = require('../../services/post.service');
var comment_service_1 = require('../../services/comment.service');
var tag_input_1 = require('../tag-input');
var PostDetailComponent = (function () {
    function PostDetailComponent(_authService, _postService, params, _commentService) {
        this._authService = _authService;
        this._postService = _postService;
        this.params = params;
        this._commentService = _commentService;
        this.post = { title: "", content: "" };
        this.demoClick = false;
        this.postId = params.get("id");
        this.md = marked;
        this.md_comment = marked;
        this.commentMarked = "";
        this.user = this._authService.getUserInfo();
        console.log(this.user);
        console.log("flag");
    }
    PostDetailComponent.prototype.ngOnInit = function () {
        this.getPost(this.postId);
    };
    PostDetailComponent.prototype.getPost = function (id) {
        var _this = this;
        this._postService.find(id)
            .then(function (post) {
            _this.post = post;
            _this.post.content = _this.md.parse(post.content);
            _this.listComment = post.comments;
            for (var i = 0; i < post.comments.length; i++) {
                _this.listComment[i].content = _this.md_comment.parse(post.comments[i].content);
            }
        })
            .catch(function (error) { return _this.errorMessage = error; });
    };
    PostDetailComponent.prototype.addComment = function (comment) {
        var _this = this;
        //console.log(comment);
        var com = { content: comment, post_id: this.post.number_id };
        this._commentService.
            insert({ comment: com })
            .then(function (res) {
            _this.getPost(_this.postId);
        }).catch(function (error) { return _this.errorMessage; });
    };
    PostDetailComponent.prototype.convertMark = function (comment) {
        console.log(comment);
        this.commentMarked = this.md_comment.parse(comment);
    };
    PostDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hb-project-detail',
            templateUrl: 'post-detail.component.html',
            styleUrls: ['post-detail.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES, tag_input_1.TagInputComponent],
            providers: [post_service_1.PostService, comment_service_1.CommentService]
        })
    ], PostDetailComponent);
    return PostDetailComponent;
}());
exports.PostDetailComponent = PostDetailComponent;
//# sourceMappingURL=post-detail.component.js.map
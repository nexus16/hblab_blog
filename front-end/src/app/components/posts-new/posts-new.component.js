"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../typings/globals/marked/index.d.ts"/>
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var input_1 = require('@angular2-material/input');
var ng2_material_1 = require('ng2-material');
var marked = require('marked');
var post_service_1 = require('../../services/post.service');
var ng2_select_1 = require('ng2-select');
var tag_input_1 = require('../tag-input');
var tag_service_1 = require('../../services/tag.service');
var posttag_service_1 = require('../../services/posttag.service');
var PostsNewComponent = (function () {
    function PostsNewComponent(_postService, _router, _routeParam, _projectService, _tagService, _posttagService) {
        this._postService = _postService;
        this._router = _router;
        this._routeParam = _routeParam;
        this._projectService = _projectService;
        this._tagService = _tagService;
        this._posttagService = _posttagService;
        this.post = { title: "", content: "" };
        this.dataConfig = {};
        this.isprivate = false;
        this.select = false;
        this.checkTitle = true;
        this.subjectSelected = { title: "", id: "" };
        this.tags = [];
        this.html = '';
        this.md = marked;
    }
    PostsNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._routeParam.get('id')) {
            //get post if update
            this._postService.find(this._routeParam.get('id')).then(function (post) {
                _this.post = post;
                _this.subjectSelected = _this.post.subject || { title: "", id: "" };
                if (_this.subjectSelected.id != "")
                    _this.isprivate = true;
                _this.updateValue(post.content);
            }).catch(function (error) { return _this.errorMessage = error; });
        }
        this._projectService.findAll().then(function (projects) { return _this.projects = projects; }).catch(function (error) { return _this.errorMessage = error; });
        this._tagService.findAll().then(function (tags) { _this.listAllTag = tags; console.log(tags); })
            .catch(function (error) { return console.log(error); });
    };
    PostsNewComponent.prototype.listTagInsert = function () {
        console.log(this.tags);
        var posttag = { post_id: 138, tag_id: 9 };
        this._posttagService.insert({ posttag: posttag });
    };
    PostsNewComponent.prototype.updateValue = function (val) {
        if (!val) {
            return '';
        }
        this.html = this.md.parse(val);
    };
    PostsNewComponent.prototype.save = function (event, post) {
        var _this = this;
        event.preventDefault();
        //remove html tag of content html
        //this.listTagInsert();
        var short_content = post_service_1.strip_tags(this.md.parse(post.content));
        // remove break line
        short_content = short_content.replace(new RegExp("\n", "g"), "");
        post.short_content = short_content.substring(0, 200);
        if (this._routeParam.get('id')) {
            this._postService.update(this._routeParam.get('id'), { post: post })
                .then(function (res) {
                _this._router.navigate(["PostDetail", { id: res.id }]);
            }).catch(function (error) { _this._router.navigate(["Posts"]); });
        }
        else {
            this._postService.insert({ post: post })
                .then(function (response) {
                //console.log(response.number_id);
                //console.log(this.tags);
                var _loop_1 = function(i) {
                    var tag_name = _this.tags[i];
                    var tag_id = _this.listAllTag.filter(function (key) { return key.name == tag_name; })[0].id;
                    var posttag = { tag_id: tag_id, post_id: response.number_id };
                    _this._posttagService.insert({ posttag: posttag });
                };
                for (var i = 0; i < _this.tags.length; i++) {
                    _loop_1(i);
                }
                _this._router.navigate(["PostDetail", { id: response.id }]);
            })
                .catch(function (error) { return _this.errorMessage = error; });
        }
    };
    PostsNewComponent.prototype.show = function (subject) {
        this.select = true;
    };
    PostsNewComponent.prototype.choseSelect = function (subject) {
        this.subjectSelected = subject;
        this.select = false;
    };
    PostsNewComponent.prototype.isSelected = function (subject) {
        return this.subjectSelected.id == subject.id || this.subjectSelected.title_id == subject.id;
    };
    PostsNewComponent.prototype.close = function () {
        this.select = false;
    };
    PostsNewComponent.prototype.checkTitleLength = function (title) {
        if (title.length < 10)
            this.checkTitle = false;
        else
            this.checkTitle = true;
    };
    __decorate([
        core_1.ViewChild('fileUrl')
    ], PostsNewComponent.prototype, "fileUrl");
    PostsNewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hb-posts-new',
            templateUrl: 'posts-new.component.html',
            styleUrls: ['posts-new.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES, ng2_select_1.SELECT_DIRECTIVES, tag_input_1.TagInputComponent],
            providers: [http_1.HTTP_PROVIDERS, post_service_1.PostService, tag_service_1.TagService, posttag_service_1.PosttagService]
        })
    ], PostsNewComponent);
    return PostsNewComponent;
}());
exports.PostsNewComponent = PostsNewComponent;
//# sourceMappingURL=posts-new.component.js.map
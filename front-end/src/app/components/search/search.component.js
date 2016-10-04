"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_material_1 = require('ng2-material');
var SearchComponent = (function () {
    function SearchComponent(postService, router) {
        this.postService = postService;
        this.router = router;
        this.router = router;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.postService
            .findAll({ sort: "updated_at desc" })
            .then(function (posts) {
            _this.allPost = posts;
            var dkm = _this.key;
            _this.posts = posts.filter(function (value) {
                return value.short_content.includes(dkm);
            });
        }).catch(function (error) { return console.log(error); });
        //this.getPost();
    };
    SearchComponent.prototype.getPost = function () {
        var _this = this;
        this.postService
            .findAll({ sort: "updated_at desc" })
            .then(function (posts) {
            var dkm = _this.key;
            _this.posts = posts.filter(function (value) {
                return value.short_content.includes(dkm);
            });
            console.log(_this.posts);
        }).catch(function (error) { return console.log(error); });
    };
    Object.defineProperty(SearchComponent.prototype, "debug", {
        get: function () {
            return JSON.stringify(this.key);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], SearchComponent.prototype, "key");
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-search',
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES]
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map
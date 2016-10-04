"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var toolbar_1 = require('@angular2-material/toolbar');
var ng2_material_1 = require('ng2-material');
var sidenav_1 = require('@angular2-material/sidenav');
var ng2_material_2 = require('ng2-material');
var post_service_1 = require('./services/post.service');
var project_service_1 = require('./services/project.service');
var logged_in_outlet_directives_1 = require('./directives/logged-in-outlet.directives');
var posts_1 = require('./components/posts');
var login_1 = require('./components/login');
var posts_new_1 = require('./components/posts-new');
var post_detail_1 = require('./components/post-detail');
var projects_1 = require('./components/projects');
var project_detail_1 = require('./components/project-detail');
var projects_new_1 = require('./components/projects-new');
var users_1 = require('./components/users');
var user_detail_1 = require('./components/user-detail');
var user_new_1 = require('./components/user-new');
var picture_uploader_1 = require('./components/picture-uploader');
var search_1 = require('./components/search');
var tags_1 = require('./components/tags');
var HbBlogAppComponent = (function () {
    function HbBlogAppComponent(router, _authService, _projectService) {
        var _this = this;
        this.router = router;
        this._authService = _authService;
        this._projectService = _projectService;
        this.firstLoaded = false;
        this.menuLoaded = false;
        this.projectPage = false;
        this.searchPage = false;
        this.search = null;
        router.subscribe(function (val) {
            _this.getMenu();
            if (val.indexOf('projects') == 0) {
                _this.projectPage = true;
            }
            else {
                _this.projectPage = false;
            }
            if (val.indexOf('search') == 0) {
                _this.searchPage = true;
            }
            else {
                _this.searchPage = false;
            }
            console.log(_this._authService);
            if (val.indexOf('/edit') != -1 || val.indexOf('/new') != -1)
                _this.projectPage = true;
            if (_this._authService.isLoggedIn()) {
                if (val == "login")
                    _this.router.navigate(["Posts"]);
                if (!_this.menuLoaded) {
                    _this.getMenu();
                }
                if (!_this._authService.getUserInfo() && !_this.firstLoaded) {
                    _this._authService.getProfile();
                    _this.firstLoaded = true;
                    return "";
                }
                else {
                    return _this._authService.getUserInfo() ? _this._authService.getUserInfo().username : "";
                }
            }
            else {
                return "";
            }
        });
    }
    HbBlogAppComponent.prototype.ngOnInit = function () { }; //component chinh khong goi lai
    HbBlogAppComponent.prototype.getMenu = function () {
        var _this = this;
        if (!this._authService.isLoggedIn())
            return false;
        this.menuLoaded = true;
        this._projectService.findAll()
            .then(function (projects) { _this.menuItems = projects; }).catch(function (error) { return _this.errorMessage = error; });
    };
    HbBlogAppComponent.prototype.selectedMenu = function (selected, index) {
        if (selected == index) {
            selected = -1;
        }
        else {
            selected = index;
        }
        return selected;
    };
    Object.defineProperty(HbBlogAppComponent.prototype, "authenticated", {
        get: function () {
            return this._authService.isLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HbBlogAppComponent.prototype, "userInfo", {
        get: function () {
            var user = { username: "", avatar: "" };
            return this._authService.getUserInfo() ? this._authService.getUserInfo() : user;
        },
        enumerable: true,
        configurable: true
    });
    HbBlogAppComponent.prototype.logout = function () {
        this.firstLoaded = false;
        this._authService.logout();
        this.router.navigate(["Login"]);
    };
    Object.defineProperty(HbBlogAppComponent.prototype, "adminIsLogin", {
        get: function () {
            return this._authService.adminIsLogin();
        },
        enumerable: true,
        configurable: true
    });
    HbBlogAppComponent.prototype.searchPost = function (content) {
        this.search = content;
        this.router.navigate(["Search"]);
    };
    HbBlogAppComponent = __decorate([
        router_deprecated_1.RouteConfig([
            { path: '/posts', name: 'Posts', component: posts_1.PostsComponent, useAsDefault: true },
            { path: '/login', name: 'Login', component: login_1.LoginComponent },
            { path: '/posts/new', name: 'PostsNew', component: posts_new_1.PostsNewComponent },
            { path: '/posts/:id', name: 'PostDetail', component: post_detail_1.PostDetailComponent },
            { path: '/posts/:id/edit', name: 'PostEdit', component: posts_new_1.PostsNewComponent },
            { path: '/projects', name: 'Projects', component: projects_1.ProjectsComponent },
            { path: '/projects/new', name: 'Projectdetail', component: projects_new_1.ProjectsNewComponent },
            { path: '/projects/:id', name: 'Projectdetail', component: project_detail_1.ProjectDetailComponent },
            { path: '/projects/:id/edit', name: 'ProjectEdit', component: projects_new_1.ProjectsNewComponent },
            { path: '/users', name: 'USers', component: users_1.UsersComponent },
            { path: '/users/:id', name: "UserDetail", component: user_detail_1.UserDetailComponent },
            { path: '/users/:id/edit', name: 'UserEdit', component: user_new_1.UserNewComponent },
            { path: '/users/new', name: 'UserNew', component: user_new_1.UserNewComponent },
            { path: '/upload', name: 'Upload', component: picture_uploader_1.PictureUploaderComponent },
            { path: '/search', name: 'Search', component: search_1.SearchComponent },
            { path: '/tag', name: 'Tag', component: tags_1.TagsComponent },
            { path: '/tag/:id', name: 'TagDetail', component: tags_1.TagsComponent },
            { path: '/**', redirectTo: ['Posts'] }
        ]),
        core_1.Component({
            moduleId: module.id,
            selector: 'hb-blog-app',
            templateUrl: 'hb-blog.component.html',
            styleUrls: ['hb-blog.component.css'],
            directives: [
                ng2_material_2.MATERIAL_DIRECTIVES,
                sidenav_1.MD_SIDENAV_DIRECTIVES,
                ng2_material_1.MdIcon,
                toolbar_1.MdToolbar,
                common_1.FORM_DIRECTIVES,
                logged_in_outlet_directives_1.LoggedInRouterOutlet,
                search_1.SearchComponent
            ],
            providers: [post_service_1.PostService, project_service_1.ProjectService]
        })
    ], HbBlogAppComponent);
    return HbBlogAppComponent;
}());
exports.HbBlogAppComponent = HbBlogAppComponent;
//# sourceMappingURL=hb-blog.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_material_1 = require('ng2-material');
var project_service_1 = require('../../services/project.service');
var user_service_1 = require('../../services/user.service');
var project_member_service_1 = require('../../services/project_member.service');
var tabs_1 = require('@angular2-material/tabs');
var input_1 = require('@angular2-material/input');
var ng2_material_2 = require('ng2-material');
var overlay_1 = require('@angular2-material/core/overlay/overlay');
var subject_service_1 = require('../../services/subject.service');
var http_1 = require('@angular/http');
var marked = require('marked');
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(projectService, userService, projectMemberService, routeParams, subjectService, _routeParam) {
        this.projectService = projectService;
        this.userService = userService;
        this.projectMemberService = projectMemberService;
        this.routeParams = routeParams;
        this.subjectService = subjectService;
        this._routeParam = _routeParam;
        this.postsBySubject = null;
        this.ListUserSearch = null;
        this.short = true;
        this.dislayedit = false;
        this.selected = null;
        this.previous = null;
        this._selectedIndex = 1;
        this.selected1 = null;
        this.previous1 = null;
        this._selectedIndex1 = 1;
        this.selected2 = null;
        this.previous2 = null;
        this._selectedIndex2 = 1;
        this.editDescription = false;
        this.html = "";
        this.md = marked;
    }
    Object.defineProperty(ProjectDetailComponent.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this.previous = this.selected;
            this.selected = this.members[value];
            this._selectedIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDetailComponent.prototype, "selectedIndex1", {
        get: function () {
            return this._selectedIndex1;
        },
        set: function (value) {
            this.previous1 = this.selected1;
            this.selected1 = this.listSubjects[value];
            this._selectedIndex1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDetailComponent.prototype, "selectedIndex2", {
        get: function () {
            return this._selectedIndex2;
        },
        set: function (value) {
            this.previous2 = this.selected2;
            this.selected2 = this.ListUserSearch[value];
            this._selectedIndex2 = value;
        },
        enumerable: true,
        configurable: true
    });
    ProjectDetailComponent.prototype.ngOnInit = function () {
        if (this.routeParams.get('id') !== null) {
            var id = this.routeParams.get('id');
            this.getProjectSelected(id);
            this.getListUser();
            this.getListMemberInProject();
        }
        this.getProject();
    };
    ProjectDetailComponent.prototype.getProject = function () {
        var _this = this;
        this.projectService
            .findAll()
            .then(function (projects) {
            _this.listProjects = projects;
            console.log(_this.listProjects);
        })
            .catch(function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.getProjectSelected = function (id) {
        var _this = this;
        this.projectService
            .find(id)
            .then(function (projectSelected) {
            console.log(projectSelected);
            // let des = projectSelected.description;
            // if(des.length > 100)
            //   this.description = des.substr(0,100)+"...";
            // else this.description = des;
            _this.projectSelected = projectSelected;
            _this.projectSelected.description = _this.md.parse(projectSelected.description);
            _this.posts = projectSelected.posts;
            _this.postsAll = projectSelected.posts;
            var members = projectSelected.members;
            var leader = projectSelected.leader;
            var _loop_1 = function(i) {
                leader.map(function (value) {
                    if (value.user_id == members[i].id)
                        members[i].leader = true;
                    else
                        members[i].leader = false;
                });
            };
            for (var i = 0; i < members.length; i++) {
                _loop_1(i);
            }
            _this.members = members;
            console.log(_this.members);
            //this.listSubjects = projectSelected.subjects;
            console.log(_this.projectSelected);
            var listSubjects = projectSelected.subjects;
            //console.log(listSubjects);
            //console.log("flag");
            var posts = projectSelected.posts;
            //console.log(posts);
            var _loop_2 = function(i) {
                listSubjects[i].display = false;
                var id_1 = listSubjects[i].id;
                listSubjects[i].posts = projectSelected.posts.filter(function (post) { return id_1 == post.subject.id; });
            };
            for (var i = 0; i < listSubjects.length; i++) {
                _loop_2(i);
            }
            _this.listSubjects = listSubjects;
            //console.log(this.listSubjects);
            //console.log("flag");
        })
            .catch(function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.getListUser = function () {
        var _this = this;
        this.userService
            .findAll()
            .then(function (users) { _this.users = users; }).catch(function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.search = function (username) {
        if (username.length == 0) {
            this.ListUserSearch = null;
            return;
        }
        var members = this.members;
        this.ListUserSearch = this.users.filter(function (user) {
            return user.username.includes(username) || user.email.includes(username);
        }).filter(function (user) {
            return members.filter(function (member) {
                return user.id == member.id;
            }).length == 0;
        });
        //TODO
    };
    ProjectDetailComponent.prototype.addUSer = function (user) {
        var _this = this;
        var project_member = { project_id: this.projectSelected.id, user_id: user.id };
        this.projectMemberService.
            insert({ project_member: project_member })
            .then(function (res) {
            _this.members.push(user);
            _this.getListMemberInProject();
        }).catch(function (error) { return _this.errorMessage; });
        this.ListUserSearch.splice(this.ListUserSearch.indexOf(user), 1);
        this.selectedIndex2 = Math.min(this.ListUserSearch.indexOf(user), this.ListUserSearch.length - 1);
    };
    ProjectDetailComponent.prototype.delete = function (user) {
        var _this = this;
        var userDelete = this.listUserInProject.filter(function (userInProject) { return userInProject.user_id == user.id; })[0];
        this.projectMemberService.delete(userDelete.id)
            .then(function (res) { }, function (error) { return _this.errorMessage = error; });
        this.members.splice(this.members.indexOf(user), 1);
        this.selectedIndex = Math.min(this.members.indexOf(user), this.members.length - 1);
    };
    ProjectDetailComponent.prototype.getListMemberInProject = function () {
        var _this = this;
        this.projectMemberService.findAll()
            .then(function (users) {
            _this.listUserInProject = users;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.confirmClose = function (forgiveDebt, user) {
        if (forgiveDebt)
            this.delete(user);
    };
    ProjectDetailComponent.prototype.checkExistedLeader = function () {
        var project_id = this.routeParams.get('id');
        var id_project = this.listProjects.filter(function (check) { return check.id == project_id; })[0].id_number;
        var listUserJoinProject = this.listUserInProject.filter(function (check) { return check.project_id == id_project; });
        var check = false;
        for (var i = 0; i < listUserJoinProject.length; i++) {
            if (listUserJoinProject[i].leader) {
                check = true;
                break;
            }
        }
        //console.log(check);
        return check;
    };
    ProjectDetailComponent.prototype.checkIsLeader = function (member) {
        if (member.leader)
            return true;
        return false;
    };
    ProjectDetailComponent.prototype.onChange = function ($event, member, index) {
        var _this = this;
        var project_id = this.routeParams.get('id');
        var id_project = this.listProjects.filter(function (check) { return check.id == project_id; })[0].id_number;
        var listUserJoinProject = this.listUserInProject.filter(function (check) { return check.project_id == id_project; });
        console.log(index);
        var id = listUserJoinProject.filter(function (value) {
            return value.user_id == member.id;
        })[0];
        var project_member = { leader: false };
        project_member.leader = $event;
        this.projectMemberService.update(id.id, { project_member: project_member }).then(function (res) {
            _this.members[index].leader = res.status ? $event : !$event;
        }).catch(function (error) { return _this.members[index].leader = !$event; });
    };
    ProjectDetailComponent.prototype.addSubject = function (title) {
        var _this = this;
        var subject = { title: title, project_id: this.projectSelected.id_number };
        //console.log(subject);
        this.subjectService.insert({ subject: subject }).then(function (res) {
            _this.listSubjects.push(subject);
            _this.getProjectSelected(_this.projectSelected.id);
        }).catch(function (error) { return error; });
    };
    ProjectDetailComponent.prototype.deleteSubject = function (subject) {
        //console.log(subject);
        this.subjectService.delete(subject.id).then(function (res) { }).catch(function (error) { return error; });
        this.listSubjects.splice(this.listSubjects.indexOf(subject), 1);
        this.selectedIndex1 = Math.min(this.listSubjects.indexOf(subject), this.listSubjects.length - 1);
    };
    ProjectDetailComponent.prototype.updateSubject = function (title, subjectObj) {
        //console.log(subject);
        var subject = { title: title };
        var subjectEdited = subject;
        this.subjectService.update(subjectObj.id, { subject: subjectEdited }).then(function (res) { }).catch(function (error) { return error; });
        for (var i = 0; i < this.listSubjects.length; i++) {
            this.listSubjects[i].display = false;
        }
    };
    ProjectDetailComponent.prototype.confirmCloseSubject = function (forgiveDebt, subject) {
        if (forgiveDebt)
            this.deleteSubject(subject);
    };
    ProjectDetailComponent.prototype.getPostBySubject = function (id) {
        console.log(id);
        this.posts = this.listSubjects.filter(function (subject) { return subject.id == id; })[0].posts;
    };
    ProjectDetailComponent.prototype.getAllPost = function () {
        this.posts = this.postsAll;
    };
    ProjectDetailComponent.prototype.goToEdit = function (id) {
        for (var i = 0; i < this.listSubjects.length; i++) {
            this.listSubjects[i].display = false;
        }
        this.listSubjects.filter(function (subject) { return subject.id == id; })[0].display = true;
    };
    ProjectDetailComponent.prototype.displayFull = function () {
        console.log(this.short);
        this.short = false;
    };
    ProjectDetailComponent.prototype.displayShort = function () {
        console.log(this.short);
        this.short = true;
    };
    ProjectDetailComponent.prototype.displayDes = function () {
        if (this.short == true)
            this.short = false;
        else
            this.short = true;
    };
    ProjectDetailComponent.prototype.updateValue = function (val) {
        if (!val) {
            return '';
        }
        this.html = this.md.parse(val);
    };
    ProjectDetailComponent.prototype.goEditDescription = function () {
        if (this.editDescription == false)
            this.editDescription = true;
        else
            this.editDescription = false;
    };
    ProjectDetailComponent.prototype.updateDescription = function (des) {
        var _this = this;
        var project = this.projectSelected;
        project.description = des;
        this.projectService.update(this._routeParam.get('id'), { project: project }).then(function (res) {
        }).catch(function (error) { return _this.errorMessage = error; });
        this.editDescription = false;
    };
    __decorate([
        core_1.Input()
    ], ProjectDetailComponent.prototype, "selectedIndex");
    ProjectDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hblab-projects-detail',
            templateUrl: 'project-detail.component.html',
            styleUrls: ['project-detail.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES, tabs_1.MD_TABS_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES, ng2_material_2.MdIcon],
            providers: [project_service_1.ProjectService, user_service_1.UserService, project_member_service_1.ProjectMemberService, overlay_1.OVERLAY_PROVIDERS, subject_service_1.SubjectService, http_1.HTTP_PROVIDERS, input_1.MD_INPUT_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());
exports.ProjectDetailComponent = ProjectDetailComponent;
//# sourceMappingURL=project-detail.component.js.map
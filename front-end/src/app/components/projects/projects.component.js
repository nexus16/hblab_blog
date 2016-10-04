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
var ProjectsComponent = (function () {
    function ProjectsComponent(projectService) {
        this.projectService = projectService;
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.getProject();
    };
    ProjectsComponent.prototype.getProject = function () {
        var _this = this;
        this.projectService
            .findAll()
            .then(function (projects) {
            _this.projects = projects;
            console.log(_this.projects);
        })
            .catch(function (error) { return _this.errorMessage = error; });
    };
    ProjectsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hblab-projects',
            templateUrl: 'projects.component.html',
            styleUrls: ['projects.component.css'],
            directives: [ng2_material_1.MATERIAL_DIRECTIVES],
            providers: [project_service_1.ProjectService]
        })
    ], ProjectsComponent);
    return ProjectsComponent;
}());
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map
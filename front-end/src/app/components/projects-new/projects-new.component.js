"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var input_1 = require('@angular2-material/input');
var ng2_material_1 = require('ng2-material');
var project_service_1 = require('../../services/project.service');
var datepicker_1 = require('../../shared/datepicker');
var picture_uploader_1 = require('../picture-uploader');
var moment = require('moment');
var ProjectsNewComponent = (function () {
    function ProjectsNewComponent(projectService, router, _routeParam) {
        this.projectService = projectService;
        this.router = router;
        this._routeParam = _routeParam;
        this.project = { logo: "", name: "", description: "", start_at: "", end_at: "" };
        this.uploaderOptions = {
            url: "http://localhost:3456/api/v1/uploads/",
            // withCredentials: true,
            // authToken: localStorage.getItem('X-AUTH-TOKEN'),
            // authTokenPrefix : "X-AUTH-TOKEN",
            customHeaders: {
                "X-AUTH-TOKEN": localStorage.getItem('X-AUTH-TOKEN')
            }
        };
    }
    ProjectsNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._routeParam.get('id')) {
            this.projectService.find(this._routeParam.get('id')).then(function (project) {
                _this.project = project;
                var date1 = moment(project.start_at, moment.ISO_8601);
                project.start_at = date1.format("DD-MM-YYYY");
                var date2 = moment(project.end_at, moment.ISO_8601);
                project.end_at = date2.format("DD-MM-YYYY");
                //#TODO if post is null
            }).catch(function (error) { return _this.errorMessage = error; });
            this.title = "Update Project";
            this.button = "Update";
        }
        else {
            this.title = "New Project";
            this.button = "Create";
        }
    };
    ProjectsNewComponent.prototype.save = function (project) {
        var _this = this;
        // console.log(project);
        if (this._routeParam.get('id')) {
            this.projectService.update(this._routeParam.get('id'), { project: project })
                .then(function (res) {
                _this.router.navigate(["Projectdetail", { id: res.id }]);
            }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.projectService.insert({ project: project })
                .then(function (response) {
                _this.router.navigate(["Projectdetail", { id: response.id }]);
            })
                .catch(function (error) { return _this.errorMessage = error; });
        }
    };
    ProjectsNewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-projects-new',
            templateUrl: 'projects-new.component.html',
            styleUrls: ['projects-new.component.css'],
            directives: [input_1.MD_INPUT_DIRECTIVES, ng2_material_1.MATERIAL_DIRECTIVES, datepicker_1.MdDatePicker, picture_uploader_1.PictureUploaderComponent],
            providers: [project_service_1.ProjectService]
        })
    ], ProjectsNewComponent);
    return ProjectsNewComponent;
}());
exports.ProjectsNewComponent = ProjectsNewComponent;
//# sourceMappingURL=projects-new.component.js.map
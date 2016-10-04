"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var input_1 = require('@angular2-material/input');
var toolbar_1 = require('@angular2-material/toolbar');
var ng2_material_1 = require('ng2-material');
require('rxjs/add/operator/toPromise');
var auth_service_1 = require('../../services/auth.service');
var LoginComponent = (function () {
    function LoginComponent(_router, _authService) {
        this._router = _router;
        this._authService = _authService;
    }
    ;
    LoginComponent.prototype.login = function (username, password) {
        var _this = this;
        this._authService.login(username, password).then(function (result) {
            if (result) {
                _this._router.navigate(['Posts']);
            }
            else {
            }
        }).catch(function (Error) {
            _this.error = Error.toString();
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
            directives: [
                input_1.MD_INPUT_DIRECTIVES,
                common_1.FORM_DIRECTIVES,
                ng2_material_1.MATERIAL_DIRECTIVES,
                toolbar_1.MdToolbar,
            ],
            providers: [auth_service_1.AuthService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
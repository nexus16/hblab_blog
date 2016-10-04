"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
var common_1 = require('@angular/common');
var noop = function () { };
//Quan trong
exports.MD_UPLOAD_CONTROL_VALUE_ACCESSOR = {
    provide: common_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return PictureUploaderComponent; }),
    multi: true
};
var PictureUploaderComponent = (function () {
    /** TODO: internal */
    // ngAfterContentInit() {
    // }
    // ngOnChanges(changes: {[key: string]: SimpleChange}) {
    // }
    function PictureUploaderComponent(renderer, _uploader) {
        this.renderer = renderer;
        this._uploader = _uploader;
        this.picture = '';
        this.uploaderOptions = { "url": "http://localhost/" };
        this.canDelete = true;
        this.onUploadCompleted = new core_1.EventEmitter();
        this.onUpload = new core_1.EventEmitter();
        this._value = '';
        this.uploadInProgress = false;
        this._onTouchedCallback = noop;
        /** Callback registered via registerOnChange (ControlValueAccessor) */
        this._onChangeCallback = noop;
    }
    Object.defineProperty(PictureUploaderComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    //  _handleFocus(event: FocusEvent) {
    // }
    PictureUploaderComponent.prototype._handleBlur = function (event) {
    };
    PictureUploaderComponent.prototype._handleChange = function (event) {
        this._onTouchedCallback();
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    PictureUploaderComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // /**
    //  * Implemented as part of ControlValueAccessor.
    //  * TODO: internal
    //  */
    PictureUploaderComponent.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    PictureUploaderComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    PictureUploaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._canUploadOnServer()) {
            setTimeout(function () {
                _this._uploader.setOptions(_this.uploaderOptions);
            });
            this._uploader._emitter.subscribe(function (data) {
                _this._onUpload(data);
            });
        }
        else {
            console.warn('Please specify url parameter to be able to upload the file on the back-end');
        }
    };
    PictureUploaderComponent.prototype.onFiles = function () {
        var files = this._fileUpload.nativeElement.files;
        if (files.length) {
            var file = files[0];
            this._changePicture(file);
            if (this._canUploadOnServer()) {
                this.uploadInProgress = true;
                this._uploader.addFilesToQueue(files);
            }
        }
    };
    PictureUploaderComponent.prototype.bringFileSelector = function () {
        //this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        this.renderer.invokeElementMethod(this._fileUpload.nativeElement, "click", null);
        return false;
    };
    PictureUploaderComponent.prototype.removePicture = function () {
        this.value = '';
        return false;
    };
    PictureUploaderComponent.prototype._changePicture = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            _this.picture = event.target.result;
        }, false);
        reader.readAsDataURL(file);
    };
    PictureUploaderComponent.prototype._onUpload = function (data) {
        if (data['done'] || data['abort'] || data['error']) {
            this._onUploadCompleted(data);
        }
        else {
            this.onUpload.emit(data);
        }
    };
    PictureUploaderComponent.prototype._onUploadCompleted = function (data) {
        this.uploadInProgress = false;
        var url = JSON.parse(data.response);
        this.value = url.src;
        //this.onUploadCompleted.emit(JSON.parse(data.response));
    };
    PictureUploaderComponent.prototype._canUploadOnServer = function () {
        return !!this.uploaderOptions['url'];
    };
    __decorate([
        core_1.Input()
    ], PictureUploaderComponent.prototype, "picture");
    __decorate([
        core_1.Input()
    ], PictureUploaderComponent.prototype, "uploaderOptions");
    __decorate([
        core_1.Input()
    ], PictureUploaderComponent.prototype, "canDelete");
    __decorate([
        core_1.Output()
    ], PictureUploaderComponent.prototype, "onUploadCompleted");
    __decorate([
        core_1.ViewChild('fileUpload')
    ], PictureUploaderComponent.prototype, "_fileUpload");
    __decorate([
        core_1.Input()
    ], PictureUploaderComponent.prototype, "value");
    PictureUploaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'picture-uploader',
            styleUrls: ['picture-uploader.css'],
            templateUrl: 'picture-uploader.html',
            providers: [ng2_uploader_1.Ng2Uploader, exports.MD_UPLOAD_CONTROL_VALUE_ACCESSOR]
        })
    ], PictureUploaderComponent);
    return PictureUploaderComponent;
}());
exports.PictureUploaderComponent = PictureUploaderComponent;
//# sourceMappingURL=picture-uploader.component.js.map
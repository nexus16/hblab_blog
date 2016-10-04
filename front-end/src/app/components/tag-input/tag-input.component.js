"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var tag_input_item_1 = require('../tag-input-item');
var tag_service_1 = require('../../services/tag.service');
var TagInputComponent = (function () {
    function TagInputComponent(_ngControl, _tagService) {
        this._ngControl = _ngControl;
        this._tagService = _tagService;
        this.placeholder = 'Add a tag';
        this.delimiterCode = '188';
        this.addOnBlur = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.allowedTagsPattern = /.+/;
        this.inputValue = '';
        /** Implemented as part of ControlValueAccessor. */
        this.onChange = function () { };
        this.onTouched = function () { };
        this._ngControl.valueAccessor = this;
    }
    TagInputComponent.prototype.ngOnInit = function () {
        if (this.ngModel)
            this.tagsList = this.ngModel;
        this.onChange(this.tagsList);
        this.delimiter = parseInt(this.delimiterCode);
        this.getAllTag();
    };
    TagInputComponent.prototype.getAllTag = function () {
        var _this = this;
        this._tagService.findAll().then(function (tags) { _this.listAllTags = tags; console.log(tags); })
            .catch(function (error) { return console.log(error); });
    };
    TagInputComponent.prototype.ngAfterViewInit = function () {
        // If the user passes an undefined variable to ngModel this will warn
        // and set the value to an empty array
        if (!this.tagsList) {
            console.warn('TagInputComponent was passed an undefined value in ngModel. Please make sure the variable is defined.');
            this.tagsList = [];
            this.onChange(this.tagsList);
        }
    };
    TagInputComponent.prototype.inputChanged = function (event) {
        var _this = this;
        var key = event.keyCode;
        switch (key) {
            case 13:
                console.log(this.inputValue);
                var data_1 = this.inputValue;
                var tag = { name: data_1 };
                if (this.listAllTags.filter(function (value) { return value.name == data_1; }).length == 0) {
                    //console.log("ok");
                    this._tagService.insert({ tag: tag })
                        .then(function (res) { _this.getAllTag(); })
                        .catch();
                }
                this.addOnEnter && this._addTags([this.inputValue]);
                event.preventDefault();
                break;
            default:
                this._resetSelected();
                break;
        }
    };
    TagInputComponent.prototype.addSearchTag = function (data) {
        console.log(data);
        this._addTags([data]);
        this.listSearchTags = null;
    };
    TagInputComponent.prototype.inputBlurred = function (event) {
        this.addOnBlur && this._addTags([this.inputValue]);
        this.isFocussed = false;
    };
    TagInputComponent.prototype.inputFocused = function (event) {
        this.isFocussed = true;
    };
    TagInputComponent.prototype.inputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var tags = this._splitString(pastedString);
        var tagsToAdd = tags.filter(function (tag) { return _this._isTagValid(tag); });
        this._addTags(tagsToAdd);
        setTimeout(function () { return _this.inputValue = ''; }, 3000);
        console.log("flag");
    };
    TagInputComponent.prototype.searchTag = function (key) {
        console.log(key);
        if (key.length == 0) {
            this.listSearchTags = null;
            return;
        }
        this.listSearchTags = this.listAllTags.filter(function (value) {
            return value.name.includes(key);
        });
        console.log(this.listSearchTags);
    };
    TagInputComponent.prototype._splitString = function (tagString) {
        tagString = tagString.trim();
        var tags = tagString.split(String.fromCharCode(this.delimiter));
        return tags.filter(function (tag) { return !!tag; });
    };
    TagInputComponent.prototype._isTagValid = function (tagString) {
        return this.allowedTagsPattern.test(tagString);
    };
    TagInputComponent.prototype._addTags = function (tags) {
        var _this = this;
        var validTags = tags.filter(function (tag) { return _this._isTagValid(tag); });
        this.tagsList = this.tagsList.concat(validTags);
        this._resetSelected();
        this._resetInput();
        this.onChange(this.tagsList);
    };
    TagInputComponent.prototype._removeTag = function (tagIndexToRemove) {
        this.tagsList.splice(tagIndexToRemove, 1);
        this._resetSelected();
        this.onChange(this.tagsList);
    };
    TagInputComponent.prototype._resetSelected = function () {
        this.selectedTag = null;
    };
    TagInputComponent.prototype._resetInput = function () {
        this.inputValue = '';
    };
    TagInputComponent.prototype.writeValue = function (value) { };
    TagInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TagInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input()
    ], TagInputComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], TagInputComponent.prototype, "ngModel");
    __decorate([
        core_1.Input()
    ], TagInputComponent.prototype, "delimiterCode");
    __decorate([
        core_1.Input()
    ], TagInputComponent.prototype, "addOnBlur");
    __decorate([
        core_1.Input()
    ], TagInputComponent.prototype, "addOnEnter");
    __decorate([
        core_1.Input()
    ], TagInputComponent.prototype, "addOnPaste");
    __decorate([
        core_1.Input()
    ], TagInputComponent.prototype, "allowedTagsPattern");
    __decorate([
        core_1.HostBinding('class.ng2-tag-input-focus')
    ], TagInputComponent.prototype, "isFocussed");
    TagInputComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tag-input',
            templateUrl: 'tag-input.component.html',
            styleUrls: ['tag-input.component.css'],
            directives: [tag_input_item_1.TagInputItemComponent],
            providers: [tag_service_1.TagService]
        })
    ], TagInputComponent);
    return TagInputComponent;
}());
exports.TagInputComponent = TagInputComponent;
//# sourceMappingURL=tag-input.component.js.map
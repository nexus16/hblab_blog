"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var common_2 = require('@angular/common');
var moment = require('moment');
var input_1 = require('@angular2-material/input');
var noop = function () { };
//Quan trong
exports.MD_DATEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: common_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MdDatePicker; }),
    multi: true
};
// Invalid input type. Using one of these will throw an MdInputUnsupportedTypeError.
/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
var MdDatePicker = (function () {
    function MdDatePicker() {
        this.modelFormat = 'YYYY-MM-DD';
        this.viewFormat = 'DD/MM/YYYY';
        this._focused = false;
        this._value = '';
        /** Callback registered via registerOnTouched (ControlValueAccessor) */
        this._onTouchedCallback = noop;
        /** Callback registered via registerOnChange (ControlValueAccessor) */
        this._onChangeCallback = noop;
    }
    Object.defineProperty(MdDatePicker.prototype, "value", {
        /**
         * Bindings.
         */
        get: function () { return this._value; },
        set: function (v) {
            v = this._convertValueForInputType(v);
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
    // might place it as RTL when we don't want to. We still want to use `align` as an
    // Input though, so we use HostBinding.
    /** Set focus on input */
    MdDatePicker.prototype.focus = function () {
        //this._inputElement.nativeElement.focus();
    };
    MdDatePicker.prototype._handleFocus = function (event) {
        this._focused = true;
    };
    MdDatePicker.prototype._handleBlur = function (event) {
    };
    MdDatePicker.prototype._handleChange = function (event) {
        this.value = event.target.value;
        this._onTouchedCallback();
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    MdDatePicker.prototype.writeValue = function (value) {
        this._value = value;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    MdDatePicker.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    MdDatePicker.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    /** TODO: internal */
    MdDatePicker.prototype.ngAfterContentInit = function () {
        this._validateConstraints();
        //this.initValue();
    };
    MdDatePicker.prototype.initValue = function () {
        var date = moment(this._value, "DD-MM-YYYY");
        this.date = date.isValid() ? date : moment();
        this.cannonical = this.date.toDate().getTime();
        this.firstWeekDaySunday = false;
        this.generateDayNames();
        this.generateCalendar(this.date);
    };
    /** TODO: internal */
    MdDatePicker.prototype.ngOnChanges = function (changes) {
        this._validateConstraints();
    };
    /**
     * Convert the value passed in to a value that is expected from the type of the md-input.
     * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
     * on our internal input it won't work locally.
     * @private
     */
    MdDatePicker.prototype._convertValueForInputType = function (v) {
        switch (this.type) {
            case 'number': return parseFloat(v);
            default: return v;
        }
    };
    /**
     * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
     * Constraints for now:
     *   - placeholder attribute and <md-placeholder> are mutually exclusive.
     *   - type attribute is not one of the forbidden types (see constant at the top).
     *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
     *     considered as align="start".
     * @private
     */
    MdDatePicker.prototype._validateConstraints = function () {
    };
    MdDatePicker.prototype.openDatepicker = function () {
        this.initValue();
        this.isOpened = true;
    };
    MdDatePicker.prototype.closeDatepicker = function () {
        this.isOpened = false;
    };
    MdDatePicker.prototype.prevYear = function () {
        this.date.subtract(1, 'Y');
        this.generateCalendar(this.date);
    };
    MdDatePicker.prototype.prevMonth = function () {
        this.date.subtract(1, 'M');
        this.generateCalendar(this.date);
    };
    MdDatePicker.prototype.nextYear = function () {
        this.date.add(1, 'Y');
        this.generateCalendar(this.date);
    };
    MdDatePicker.prototype.nextMonth = function () {
        this.date.add(1, 'M');
        this.generateCalendar(this.date);
    };
    MdDatePicker.prototype.selectDate = function (e, date) {
        if (this.isSelected(date))
            return;
        var selectedDate = moment(date.day + '-' + date.month + '-' + date.year, "DD-MM-YYYY");
        this.cannonical = selectedDate.toDate().getTime();
        this.value = selectedDate.format("DD-MM-YYYY");
        this.closeDatepicker();
    };
    MdDatePicker.prototype.generateCalendar = function (date) {
        var lastDayOfMonth = date.endOf('month').date();
        var month = date.month();
        var year = date.year();
        var n = 1;
        var firstWeekDay = null;
        this.dateValue = date.format('MM/YYYY');
        this.days = [];
        if (this.firstWeekDaySunday === true) {
            firstWeekDay = date.set('date', 2).day();
        }
        else {
            firstWeekDay = date.set('date', 1).day();
        }
        if (firstWeekDay !== 1) {
            n -= firstWeekDay - 1;
        }
        for (var i = n; i <= lastDayOfMonth; i += 1) {
            if (i > 0) {
                this.days.push({ day: i, month: month + 1, year: year, enabled: true });
            }
            else {
                this.days.push({ day: null, month: null, year: null, enabled: false });
            }
        }
    };
    MdDatePicker.prototype.isSelected = function (date) {
        var selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY');
        return selectedDate.toDate().getTime() === this.cannonical;
    };
    MdDatePicker.prototype.generateDayNames = function () {
        this.dayNames = [];
        var date = this.firstWeekDaySunday === true ? moment('2015-06-07') : moment('2015-06-01');
        for (var i = 0; i < 7; i += 1) {
            this.dayNames.push(date.format('ddd'));
            date.add('1', 'd');
        }
    };
    __decorate([
        core_1.Input('placeholder')
    ], MdDatePicker.prototype, "placeholder");
    __decorate([
        core_1.Input('model-format')
    ], MdDatePicker.prototype, "modelFormat");
    __decorate([
        core_1.Input('view-format')
    ], MdDatePicker.prototype, "viewFormat");
    __decorate([
        core_1.Input('init-date')
    ], MdDatePicker.prototype, "initDate");
    __decorate([
        core_1.Input('first-week-day-sunday')
    ], MdDatePicker.prototype, "firstWeekDaySunday");
    __decorate([
        core_1.Input('static')
    ], MdDatePicker.prototype, "isStatic");
    __decorate([
        core_1.Input()
    ], MdDatePicker.prototype, "type");
    __decorate([
        core_1.Input()
    ], MdDatePicker.prototype, "value");
    MdDatePicker = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'datepicker',
            templateUrl: 'datepicker.html',
            styleUrls: ['datepicker.css'],
            providers: [exports.MD_DATEPICKER_CONTROL_VALUE_ACCESSOR],
            directives: [common_1.DefaultValueAccessor, common_2.NgIf, common_1.NgModel, input_1.MD_INPUT_DIRECTIVES],
            host: { '(click)': 'focus()' }
        })
    ], MdDatePicker);
    return MdDatePicker;
}());
exports.MdDatePicker = MdDatePicker;
//# sourceMappingURL=datepicker.js.map
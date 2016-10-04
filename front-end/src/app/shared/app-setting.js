"use strict";
var AppSetting = (function () {
    function AppSetting() {
    }
    Object.defineProperty(AppSetting, "API_URL", {
        get: function () {
            return "http://localhost:3456/api/v1/";
        },
        enumerable: true,
        configurable: true
    });
    return AppSetting;
}());
exports.AppSetting = AppSetting;
//# sourceMappingURL=app-setting.js.map
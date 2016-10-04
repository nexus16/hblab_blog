/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'core-js/client/core.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      '@angular2-material/**/*',
      'ng2-material/**/*',
      'bootstrap/dist/**/*',
      'marked/**/*',
      'angular2-jwt/**/*.+(js|js.map)',
      'moment/moment.js',
      'ng2-uploader/**/*',
      'ng2-select/**/*',
      'angular2-active-record/angular2-active-record.js'
    ]
  });
};

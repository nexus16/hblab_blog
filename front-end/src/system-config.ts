/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  'ng2-material': 'vendor/ng2-material',
  'angular2-jwt': 'vendor/angular2-jwt',
  'marked'      : 'vendor/marked',
  'moment': 'vendor/moment/moment.js',
  'ng2-uploader' : 'vendor/ng2-uploader',
  'angular2-active-record' : 'vendor/angular2-active-record',
  'ng2-select' : 'vendor/ng2-select'
  };

/** User packages configuration. */
const packages: any = {
  'angular2-active-record':{
    main : 'angular2-active-record.js',
    defaultExtension: 'js'
  },
  'ng2-uploader':{
    main : "ng2-uploader.js"
  },
  'angular2-jwt': {                  
    main: 'angular2-jwt.js'
  },
  'ng2-material': {
    main: 'index.js',
    defaultExtension: 'js'
  },
  'marked': {
    main: 'index.js',
    format: 'cjs'
  },
   'moment':{
    format: 'cjs'
  },
  'ng2-select':{
    main : 'ng2-select.js',
    defaultExtension: 'js'
  }
};
const materialPkgs: string[] = [
  'core',
  'button',
  'card',
  'checkbox',
  'input',
  'list',
  'progress-circle',
  'progress-bar',
  'radio',
  'sidenav',
  'toolbar',
  'tabs',
  'icon',
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = { main: `${pkg}.js` };
});
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/router-deprecated',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/components/posts-new',
  'app/components/post-detail',
  'app/components/projects',
  'app/components/project-detail',
  'app/components/login',
  'app/components/posts',
  'app/test',
  'app/components/projects-new',
  'app/components/user-detail',
  'app/components/user-new',
  'app/components/users',
  'app/components/picture-uploader',
  'app/shared/datepicker',
  'app/search',
  'app/components/search',
  'app/components/tags',
  'app/components/tag-input-item',
  'app/components/tag-input',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });

import { FORM_DIRECTIVES } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { MdToolbar } from '@angular2-material/toolbar';
import { MdIcon } from 'ng2-material';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MATERIAL_DIRECTIVES,Media } from 'ng2-material';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { Post } from './models/post.model';
import { Project } from './models/project.model';
import { User } from './models/user.model';
import { LoggedInRouterOutlet } from './directives/logged-in-outlet.directives';

import { PostsComponent } from './components/posts';
import { LoginComponent } from './components/login';
import { PostsNewComponent } from './components/posts-new';
import { PostDetailComponent } from './components/post-detail';

import { ProjectsComponent } from './components/projects';
import { ProjectDetailComponent } from './components/project-detail';
import { ProjectsNewComponent } from './components/projects-new';

import { UsersComponent } from './components/users';
import { UserDetailComponent } from './components/user-detail';
import { UserNewComponent } from './components/user-new';

import { PictureUploaderComponent } from './components/picture-uploader';
import {SearchComponent} from './components/search';
import {TagsComponent} from './components/tags';
@RouteConfig([
  { path: '/posts', name: 'Posts', component: PostsComponent, useAsDefault: true },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/posts/new', name: 'PostsNew', component: PostsNewComponent },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetailComponent },
  { path: '/posts/:id/edit', name: 'PostEdit', component: PostsNewComponent },
  { path: '/projects', name: 'Projects', component: ProjectsComponent},
  { path: '/projects/new', name: 'Projectdetail', component: ProjectsNewComponent},
  { path: '/projects/:id', name: 'Projectdetail', component: ProjectDetailComponent},
  { path: '/projects/:id/edit', name: 'ProjectEdit', component: ProjectsNewComponent},
  { path: '/users', name: 'USers', component: UsersComponent},
  { path: '/users/:id', name: "UserDetail", component: UserDetailComponent},
  { path: '/users/:id/edit', name: 'UserEdit', component: UserNewComponent },
  { path: '/users/new', name: 'UserNew', component: UserNewComponent },
  { path: '/upload', name: 'Upload', component: PictureUploaderComponent },
  { path: '/search', name: 'Search', component: SearchComponent },
  { path: '/tag', name: 'Tag',component: TagsComponent},
  { path: '/tag/:id', name: 'TagDetail',component: TagsComponent},
  { path: '/**', redirectTo: ['Posts'] }
  
])

@Component({
  moduleId: module.id,
  selector: 'hb-blog-app',
  templateUrl: 'hb-blog.component.html',
  styleUrls: ['hb-blog.component.css'],
  directives: [
    MATERIAL_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MdIcon,
    MdToolbar, 
    FORM_DIRECTIVES, 
    LoggedInRouterOutlet,
    SearchComponent
    ],
  providers: [ PostService, ProjectService ]
})

export class HbBlogAppComponent implements OnInit{ 
  public firstLoaded: boolean = false;
  public menuItems: Array<Project>;
  public errorMessage: string;
  public selected: number;
  public menuLoaded: boolean = false;
  public projectPage: boolean = false;
  public searchPage: boolean = false;
  public search:string=null;
  constructor(public router: Router, private _authService: AuthService,private _projectService: ProjectService) {
    router.subscribe(
      (val)  => {
        this.getMenu();
        if( val.indexOf('projects') == 0 ){
          this.projectPage = true;
        }else{
          this.projectPage = false;
        }

        if( val.indexOf('search') == 0 ){
          this.searchPage = true;
        }else{
          this.searchPage = false;
        }

        console.log(this._authService);

        if(val.indexOf('/edit')!=-1||val.indexOf('/new')!=-1) this.projectPage = true;

        if (this._authService.isLoggedIn()) {
          if(val=="login") this.router.navigate(["Posts"]);
          
          if (!this.menuLoaded) {
            this.getMenu();
          }
          
          if (!this._authService.getUserInfo() && !this.firstLoaded) {
            this._authService.getProfile();
            this.firstLoaded = true;
            return "";
          } else {
            return this._authService.getUserInfo() ? this._authService.getUserInfo().username : "";
          }

        } else {
          return "";
        }
      }
    );
  }
  ngOnInit() { } //component chinh khong goi lai

  getMenu() {
    if (!this._authService.isLoggedIn())
      return false;
    this.menuLoaded = true;
    this._projectService.findAll()
      .then(
        projects => {this.menuItems = projects;}
      ).catch(error => this.errorMessage = error);
  }

  selectedMenu (selected, index) {
    if (selected == index) {
      selected = -1;
    } else {
      selected = index;
    }
    return selected;
  }

  get authenticated(){
    return this._authService.isLoggedIn();
  }
  get userInfo() {
    let user: User = {username: "", avatar: ""}
    return this._authService.getUserInfo() ? this._authService.getUserInfo() : user;
  }

  logout() {
    this.firstLoaded = false;
    this._authService.logout();
    this.router.navigate(["Login"]);
  }


  get adminIsLogin(){
    return this._authService.adminIsLogin();
  }


  searchPost(content: string){
    this.search = content;
    this.router.navigate(["Search"]);
  }


}
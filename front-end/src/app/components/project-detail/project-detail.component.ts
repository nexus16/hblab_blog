import {FORM_DIRECTIVES} from '@angular/common';
import {Component, OnInit,ViewEncapsulation,Input} from '@angular/core';

import {MATERIAL_DIRECTIVES} from 'ng2-material';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model'

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'
import { ProjectMemberService } from '../../services/project_member.service';
import { ProjectMember } from '../../models/project_member.model'

import { RouteParams } from '@angular/router-deprecated';

import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { MdIcon } from 'ng2-material';

import { Post } from '../../models/post.model';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';

import { Subject } from '../../models/subject.model';
import { SubjectService } from '../../services/subject.service';
import {HTTP_PROVIDERS}    from '@angular/http';
import * as marked from 'marked';

@Component({
  moduleId: module.id,
  selector: 'hblab-projects-detail',
  templateUrl: 'project-detail.component.html',
    styleUrls: ['project-detail.component.css'],

  directives: [MATERIAL_DIRECTIVES, MD_TABS_DIRECTIVES,MD_INPUT_DIRECTIVES,MdIcon],
  providers: [ProjectService, UserService,ProjectMemberService, OVERLAY_PROVIDERS,SubjectService,HTTP_PROVIDERS,MD_INPUT_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})

export class ProjectDetailComponent implements OnInit{
	projectSelected: Project;
  listProjects: Array<Project>;
  posts: Array<Post>;
  postsAll: Array<Post>;
  postsBySubject: Array<Post> = null; 

  errorMessage: any;
  errorMessage1: any;
  description:string;
  text : String;
  members : Array<User>;
  users : Array<User>;
  ListUserSearch : Array<User> = null;
  listUserInProject: Array<ProjectMember>;
  short: boolean = true;
  listSubjects: Array<Subject>;
  dislayedit: boolean = false;
  listPost: Array<Post>;
  selected = null;
  previous = null;
  private _selectedIndex: number = 1;

  selected1 = null;
  previous1 = null;
  private _selectedIndex1: number = 1;

  selected2 = null;
  previous2 = null;
  private _selectedIndex2: number = 1;
  private md: MarkedStatic;
  public html: string ;
  editDescription: boolean=false;

  @Input()
  set selectedIndex(value: number) {
    this.previous = this.selected;
    this.selected = this.members[value];
    this._selectedIndex = value;
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex1(value: number) {
    this.previous1 = this.selected1;
    this.selected1 = this.listSubjects[value];
    this._selectedIndex1 = value;
  }
  get selectedIndex1(): number {
    return this._selectedIndex1;
  }

  set selectedIndex2(value: number) {
    this.previous2 = this.selected2;
    this.selected2 = this.ListUserSearch[value];
    this._selectedIndex2 = value;
  }
  get selectedIndex2(): number {
    return this._selectedIndex2;
  }



	constructor(private projectService: ProjectService,private userService: UserService,private projectMemberService:ProjectMemberService,
				      private routeParams: RouteParams,private subjectService: SubjectService,private _routeParam: RouteParams) {
    this.html = "";
    this.md = marked;
  }

  ngOnInit() {
    if(this.routeParams.get('id') !== null){
			let id = this.routeParams.get('id');
			this.getProjectSelected(id);
      this.getListUser();
      this.getListMemberInProject();
		}
    this.getProject();
  }
  getProject() {
    this.projectService
    .findAll()
    .then(
      projects => {this.listProjects = projects;console.log(this.listProjects)
      })
    .catch(
      error => this.errorMessage = error
      );
  }
  getProjectSelected(id: any){
    this.projectService
    .find(id)
    .then(
      projectSelected => {
        console.log(projectSelected);
        // let des = projectSelected.description;
        // if(des.length > 100)
        //   this.description = des.substr(0,100)+"...";
        // else this.description = des;
        this.projectSelected = projectSelected;
        this.projectSelected.description = this.md.parse(projectSelected.description);
        this.posts = projectSelected.posts;
        this.postsAll = projectSelected.posts;
        let members = projectSelected.members;
        let leader = projectSelected.leader;
        for(let i=0;i<members.length;i++){
          leader.map(value=>{
            if(value.user_id == members[i].id)
              members[i].leader = true;
            else members[i].leader = false;
          })
        }
        this.members = members;
        console.log(this.members);
        //this.listSubjects = projectSelected.subjects;
        console.log(this.projectSelected);

        let listSubjects: Array<Subject> = projectSelected.subjects;
        //console.log(listSubjects);
        //console.log("flag");
        let posts: Array<Post> = projectSelected.posts;
        //console.log(posts);
        for(let i=0; i< listSubjects.length; i++){
          listSubjects[i].display = false;
          let id = listSubjects[i].id;
          listSubjects[i].posts = projectSelected.posts.filter(function(post){return id == post.subject.id});
        }
        this.listSubjects = listSubjects;
        //console.log(this.listSubjects);
        //console.log("flag");
      })
    .catch(error => this.errorMessage = error)
    
  }
  getListUser(){
    this.userService
    .findAll()
    .then(
      users => {this.users = users}
    ).catch(error => this.errorMessage = error)

  }
  search(username:string) {
    if(username.length == 0){
      this.ListUserSearch = null;
      return;
    }
    let members: Array<User> = this.members;
    this.ListUserSearch = this.users.filter(function(user){
      return user.username.includes(username)||user.email.includes(username);
    }).filter(function(user){
      return members.filter(function(member){
        return user.id == member.id;
      }).length == 0;
    })
    //TODO
  }
  addUSer(user:User){
    let project_member:any = {project_id : this.projectSelected.id,user_id:user.id} 
    this.projectMemberService.
    insert({project_member:project_member})
    .then(
      res => {
        this.members.push(user);
        this.getListMemberInProject();
      }
    ).catch(error => this.errorMessage);
    this.ListUserSearch.splice(this.ListUserSearch.indexOf(user),1);
    this.selectedIndex2 = Math.min(this.ListUserSearch.indexOf(user),this.ListUserSearch.length-1);
  }
  delete(user: User){
    let userDelete: any = this.listUserInProject.filter(function(userInProject){return userInProject.user_id == user.id})[0];
    this.projectMemberService.delete(userDelete.id)
    .then(
        res =>{},
        error => this.errorMessage = error
      );
    this.members.splice(this.members.indexOf(user),1);
    this.selectedIndex = Math.min(this.members.indexOf(user), this.members.length - 1);
  }

  getListMemberInProject(){
   this.projectMemberService.findAll()
    .then(
        users=>{
          this.listUserInProject = users;
        },
        error => this.errorMessage = error
      )
  }

  confirmClose(forgiveDebt: boolean, user: User) {
    if (forgiveDebt) 
      this.delete(user);
  }

  checkExistedLeader(){
    let project_id = this.routeParams.get('id');
    let id_project = this.listProjects.filter(function(check){return check.id == project_id})[0].id_number;
    let listUserJoinProject: Array<ProjectMember> = this.listUserInProject.filter(function(check){return check.project_id == id_project});

    let check: boolean = false;
    for(let i=0; i<listUserJoinProject.length; i++ ){
      if(listUserJoinProject[i].leader ) {
        check = true;
        break;
      }
    }
    //console.log(check);
    return check;
  }

  checkIsLeader(member:any){
    if(member.leader)
      return true;
    return false;
  }

  onChange($event,member:User,index: number){
    let project_id = this.routeParams.get('id');
    let id_project = this.listProjects.filter(function(check){return check.id == project_id})[0].id_number;
    let listUserJoinProject: Array<ProjectMember> = this.listUserInProject.filter(function(check){return check.project_id == id_project});
    console.log(index);
    let id = listUserJoinProject.filter(function(value){
      return value.user_id == member.id;
    })[0];
    let project_member : any = {leader:false};
    project_member.leader = $event;
    this.projectMemberService.update(id.id,{project_member:project_member}).then(
      res => {
        this.members[index].leader = res.status ? $event: !$event;
      }
    ).catch(
      error => this.members[index].leader = !$event 
    );
  }



  addSubject(title: string){
    let subject: any={title: title,project_id: this.projectSelected.id_number};
    //console.log(subject);
    this.subjectService.insert({subject: subject}).then(
      res => {
        this.listSubjects.push(subject);
        this.getProjectSelected(this.projectSelected.id);
      }
    ).catch(
      error => error
    );
  }


  deleteSubject(subject: Subject){
    //console.log(subject);
    this.subjectService.delete(subject.id).then(
        res => {}
      ).catch(
        error => error
      );
    this.listSubjects.splice(this.listSubjects.indexOf(subject),1);
    this.selectedIndex1 = Math.min(this.listSubjects.indexOf(subject), this.listSubjects.length - 1);
  }


  updateSubject(title: string, subjectObj: Subject){
    //console.log(subject);
    let subject: any={title: title};
    let subjectEdited: Subject = subject;
    this.subjectService.update(subjectObj.id,{subject: subjectEdited}).then(
        res=>{}
      ).catch(error=>error)
    for(let i=0; i<this.listSubjects.length; i++){
      this.listSubjects[i].display = false;
    }
  }

  confirmCloseSubject(forgiveDebt: boolean, subject: Subject) {
    if (forgiveDebt) 
      this.deleteSubject(subject);
  }


  getPostBySubject(id: number){
    console.log(id);
    this.posts = this.listSubjects.filter(function(subject){return subject.id == id})[0].posts;
  }

  getAllPost(){
    this.posts = this.postsAll;
  }

  goToEdit(id: number){
    for(let i=0; i<this.listSubjects.length; i++){
      this.listSubjects[i].display = false;
    }
    this.listSubjects.filter(function(subject){return subject.id == id})[0].display = true;
  }

  displayFull(){
    console.log(this.short);
    this.short = false;
  }

  displayShort(){
    console.log(this.short);
    this.short = true;
  }


  displayDes(){
    if(this.short == true ) this.short = false;
    else this.short = true;
  }


  updateValue(val) {
      if (!val) { return ''; }
      this.html = this.md.parse(val);
    }

  goEditDescription(){
    if(this.editDescription == false) this.editDescription = true;
    else this.editDescription = false;
  }

  updateDescription(des: string){
    let project : any = this.projectSelected;
    project.description = des;
    this.projectService.update(this._routeParam.get('id'),{project:project}).then(
      res => {
        
      }
    ).catch(
      error => this.errorMessage = error
    );
    this.editDescription = false;
  }


}

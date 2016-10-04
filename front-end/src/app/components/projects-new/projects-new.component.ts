import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/common';
import {Router, RouteParams} from '@angular/router-deprecated';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

import { ProjectService } from '../../services/project.service'
import { Project } from '../../models/project.model'
import { MdDatePicker } from '../../shared/datepicker'
import { PictureUploaderComponent } from '../picture-uploader';

import * as moment from 'moment';
@Component({
  moduleId: module.id,
  selector: 'app-projects-new',
  templateUrl: 'projects-new.component.html',
  styleUrls: ['projects-new.component.css'],
  directives: [MD_INPUT_DIRECTIVES,MATERIAL_DIRECTIVES,MdDatePicker,PictureUploaderComponent],
  providers: [ ProjectService ]
})
export class ProjectsNewComponent implements OnInit {
  public project : Project = {logo :"",name:"",description:"",start_at:"",end_at:""};
  public errorMessage : any;
  button: string;
  title: string;
  uploaderOptions:any = {
  	url:"http://localhost:3456/api/v1/uploads/",
  	// withCredentials: true,
  	// authToken: localStorage.getItem('X-AUTH-TOKEN'),
  	// authTokenPrefix : "X-AUTH-TOKEN",
  	customHeaders: {
  		"X-AUTH-TOKEN" : localStorage.getItem('X-AUTH-TOKEN')
  	}
  };

  constructor(private projectService:ProjectService,private router:Router,private _routeParam: RouteParams) {

  }

  ngOnInit() {
  	if (this._routeParam.get('id')) {
			this.projectService.find(this._routeParam.get('id')).then(
				project => { 
					this.project = project;
					let date1 = moment(project.start_at,moment.ISO_8601);
					project.start_at = date1.format("DD-MM-YYYY");
					let date2 = moment(project.end_at,moment.ISO_8601);
					project.end_at = date2.format("DD-MM-YYYY");
					//#TODO if post is null
				}
			).catch(error => this.errorMessage = error);
			this.title = "Update Project";
			this.button = "Update";
		}
	else {
		this.title = "New Project";		
		this.button = "Create";
	}
  }

  save(project:Project){
  	// console.log(project);
  	if (this._routeParam.get('id')) {
			this.projectService.update(this._routeParam.get('id'),{ project: project })
				.then(
					res => {
						this.router.navigate(["Projectdetail", { id: res.id }]);
					},
					error => this.errorMessage = <any>error
			);
		} else {
			this.projectService.insert({ project: project })
					.then(
					response => {
						this.router.navigate(["Projectdetail", { id: response.id }]);
					})
					.catch(
					error => this.errorMessage = <any>error
					);
			
		}
  }
}

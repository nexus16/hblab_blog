/// <reference path="../../../../typings/globals/marked/index.d.ts"/>
import {Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Router, RouteParams} from '@angular/router-deprecated';
import {FORM_PROVIDERS, FormBuilder, NgForm, Validators} from '@angular/common';

import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import * as marked from 'marked';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import {Post} from '../../models/post.model';
import {PostService, strip_tags} from '../../services/post.service';

import {SELECT_DIRECTIVES} from 'ng2-select';
import {TagInputComponent} from'../tag-input';
import {TagService} from '../../services/tag.service';
import {PosttagService} from '../../services/posttag.service';
import {Tag} from '../../models/tag.model'
@Component({
  moduleId: module.id,
  selector: 'hb-posts-new',
  templateUrl: 'posts-new.component.html',
  styleUrls: ['posts-new.component.css'],
  directives: [ MATERIAL_DIRECTIVES,MD_INPUT_DIRECTIVES,SELECT_DIRECTIVES,TagInputComponent ],
	providers: [ HTTP_PROVIDERS, PostService ,TagService,PosttagService]
})
export class PostsNewComponent implements OnInit {
 	post: Post = {title: "", content: ""};
	public html: string;
	private md: MarkedStatic;
	public dataConfig: any = {};
	public file : any;
	isprivate: boolean = false;
	select : boolean = false;
	checkTitle: boolean = true;
	subjectSelected: any = {title:"",id:""};
  	projects:Array<Project>;
	errorMessage: any;
	
	public tags:Array<string> = [];
 	listAllTag: Array<Tag>;
  
	@ViewChild('fileUrl') fileUrl : ElementRef;
	constructor(
		private _postService: PostService,
		private _router: Router,
		private _routeParam: RouteParams,
		private _projectService:ProjectService,
		private _tagService: TagService,
		private _posttagService: PosttagService
	) { 
		this.html = '';
		this.md = marked;
	}
	ngOnInit() {
		if (this._routeParam.get('id')) {
			//get post if update
			this._postService.find(this._routeParam.get('id')).then(
				post => {
					this.post = post;
					this.subjectSelected = this.post.subject || {title:"",id:""};
					if(this.subjectSelected.id != "") this.isprivate = true;
					this.updateValue(post.content);
				}
			).catch(error => this.errorMessage = error);
			//get all project member acces
		}
		this._projectService.findAll().then(
				projects => this.projects = projects
		).catch(error => this.errorMessage = error);

		this._tagService.findAll().then(
			tags=>{this.listAllTag = tags;console.log(tags);}
		)
		.catch(error => console.log(error));
	}

	listTagInsert(){
		console.log(this.tags);
		
			let posttag:any={post_id:138,tag_id:9};
			this._posttagService.insert({posttag:posttag});
		
	}


	updateValue(val) {
		if (!val) { return ''; }
		this.html = this.md.parse(val);
	}

	save(event:Event,post: Post) {
		event.preventDefault();
		//remove html tag of content html
		//this.listTagInsert();


		let short_content = strip_tags(this.md.parse(post.content));
		// remove break line
		short_content = short_content.replace(new RegExp("\n", "g"), "");
		post.short_content = short_content.substring(0, 200);
		if (this._routeParam.get('id')) {
			this._postService.update(this._routeParam.get('id'),{ post: post })
				.then(
					res => {
						this._router.navigate(["PostDetail", { id: res.id }]);
					}
					
			).catch(error => {this._router.navigate(["Posts"])});
		} else {
			this._postService.insert({ post: post })
					.then(
					response => {
						
						//console.log(response.number_id);
						//console.log(this.tags);
						for(let i=0; i< this.tags.length; i++){
							let tag_name = this.tags[i];
							let tag_id = this.listAllTag.filter(function(key){return key.name == tag_name})[0].id;
							let posttag = {tag_id:tag_id, post_id:response.number_id};
							this._posttagService.insert({posttag:posttag});
						}
						this._router.navigate(["PostDetail", { id: response.id }]);
					})
					.catch(
					error => this.errorMessage = <any>error
					);
		}
		
	}
	show(subject:any){
		this.select = true;
	}
	choseSelect(subject:any){
		this.subjectSelected = subject;
		this.select = false;
	}
	isSelected(subject:any){
		return this.subjectSelected.id == subject.id || this.subjectSelected.title_id == subject.id; 
	}
	close(){
		this.select = false;
	}

	checkTitleLength(title: string){
		if(title.length < 10)
			this.checkTitle = false;
		else this.checkTitle = true;
	}


	// searchTag(){
	// 	console.log(this.tags);
	// }




}

import { Component, OnInit,Input } from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import { Router, RouteConfig } from '@angular/router-deprecated';


import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  directives: [MATERIAL_DIRECTIVES],
})
export class SearchComponent implements OnInit {
	@Input() key:string;
	posts: Array<Post>;
	allPost: Array<Post>;
  errorMessage: any;
  post: Post;
  constructor(private postService: PostService,private router:Router) {this.router = router;}

  ngOnInit() {
  	this.postService
      .findAll({sort:"updated_at desc"})
      .then( posts => {
        this.allPost = posts;
        let dkm = this.key;
        this.posts = posts.filter(function(value){
          return value.short_content.includes(dkm);
        });    
      }).catch(error => console.log(error));
  	  
    //this.getPost();
  }

  getPost() {

    this.postService
      .findAll({sort:"updated_at desc"})
      .then( posts => {
      	let dkm = this.key;
        this.posts = posts.filter(function(value){
        	return value.short_content.includes(dkm);
        })      
        console.log(this.posts);
      }).catch(error => console.log(error));
  }


 get debug() {
    return JSON.stringify(this.key)
  }





}

import {FORM_DIRECTIVES} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { Router, RouteConfig } from '@angular/router-deprecated';

import {MATERIAL_DIRECTIVES} from 'ng2-material';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import {MdProgressCircle} from '@angular2-material/progress-circle';

@Component({
  moduleId: module.id,
  selector: 'hblab-posts',
  templateUrl: 'posts.component.html',
  styleUrls:['posts.component.css'],
  directives: [MATERIAL_DIRECTIVES,MdProgressCircle],
  providers: [PostService]
})

export class PostsComponent implements OnInit {
  posts: Array<Post>;
  allPosts: Array<Post>;
  errorMessage: any;
  post: Post;
  postSearch:Array<Post>;
  onSearch:boolean = false;
  page: number = 0;
  isload: Boolean = true;
  constructor(private postService: PostService,private router:Router) {

  }
  ngOnInit() {
    this.getPost();
  }
  getPost() {
    this.isload = true;
    this.postService
      .findAll({page:++this.page,sort:"updated_at desc"})
      .then( posts => {
        this.isload = false;
        this.allPosts = posts;
        this.posts = this.posts ? this.posts.concat(posts) : posts;      
        console.log(posts);
      }).catch(error => console.log(error));
  }

  searchPost(key:string){
    this.onSearch = true;
    this.postSearch = this.allPosts.filter(function(value){
          return value.short_content.includes(key);
        }) 
    console.log(this.postSearch);
  }


}

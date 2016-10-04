import {FORM_DIRECTIVES} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {MATERIAL_DIRECTIVES} from 'ng2-material';



import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model'


@Component({
  moduleId: module.id,
  selector: 'hblab-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  providers: [ProjectService]
})


export class ProjectsComponent implements OnInit{
  projects: Array<Project>;
  errorMessage: any;
  project: Project;
  constructor(private projectService: ProjectService) {

  }

  ngOnInit() {
    this.getProject();

  }
  getProject() {
    this.projectService
    .findAll()
    .then(
      projects => {this.projects = projects;console.log(this.projects)
      })
    .catch(
      error => this.errorMessage = error
      );
  }



  

}

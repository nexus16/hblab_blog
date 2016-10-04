import { Component, OnInit } from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  errorMessage: any;
  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService
    .findAll()
    .then(users => this.users = users)
    .catch( error => this.errorMessage = error)
  }

}

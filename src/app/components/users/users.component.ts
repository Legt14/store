import { Component } from '@angular/core';
import { Users, CreateUsersDTO, UserLoginDTO, AuthToken } from 'src/app/models';

import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  active = false;

  token = '';
  loginUser: UserLoginDTO = {
    email: '',
    password: '',
  };

  createUser: CreateUsersDTO = {
    name: '',
    email: '',
    password: '',
  };

  userInfo: Users = {
    name: '',
    email: '',
    password: '',
    id: 0,
  };

  profile:Users| null = null;

  constructor(private authService: AuthService, private users: UsersService) {}

  onRegister() {
    this.users.create(this.createUser).subscribe((data) => {
      console.log(data);
    });
  }

  allUsers() {
    this.users.getUsers().subscribe((data) => {
      console.log(data);
    });
  }

  login() {
    this.authService.loginAnGet(this.loginUser.email, this.loginUser.password).subscribe((data) => {
      console.log('inside login');
      this.profile = data;
    });
  }
}

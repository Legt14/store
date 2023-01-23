import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users, CreateUsersDTO } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private urlApi = 'https://young-sands-07814.herokuapp.com/api/users';
  constructor(
    private http: HttpClient) {

    }

  create(dto:CreateUsersDTO){
    return this.http.post<Users>(this.urlApi, dto)
  }
  getUsers(){
    return this.http.get<Users[]>(this.urlApi)
  }

}

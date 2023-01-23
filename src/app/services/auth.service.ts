import { Injectable } from '@angular/core';
import { Users, UserLoginDTO, AuthToken } from '../models';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = 'https://young-sands-07814.herokuapp.com/api/auth/';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email:string, password:string) {
    return this.http.post<AuthToken>(`${this.urlApi}login`, { email, password }).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
      })
    );
  }

  getProfile() {
    return this.http.get<Users>(`${this.urlApi}profile`);
  }

  loginAnGet(email:string, password:string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }
}

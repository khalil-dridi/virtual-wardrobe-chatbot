import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl="http://localhost:8080/api/auth/"
  constructor(private httpClient : HttpClient){}

  
  login(loginData: { username: String, password: String }): Observable<any> {
    return this.httpClient.post(this.apiUrl + "login", loginData);
  }


  sign_up(user:User) {
    return(this.httpClient.post<User>(this.apiUrl+"register",user))
  }
}
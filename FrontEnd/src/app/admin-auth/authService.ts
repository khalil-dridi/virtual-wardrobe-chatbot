import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl="http://localhost:8080/api/auth/"
  constructor(private httpClient : HttpClient){}

  
  login(loginData:any): Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/auth/login", loginData);
  }


  
}
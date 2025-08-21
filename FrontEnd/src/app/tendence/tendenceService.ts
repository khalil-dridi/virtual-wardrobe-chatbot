import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendenceService {
  private myToken=localStorage.getItem('accessToken');
  private apiUrl="http://localhost:8080/tendency/"
  constructor(private httpClient : HttpClient){}


  

  getAllTendence(): Observable<any[]>{
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
    return this.httpClient.get<any[]>(`${this.apiUrl}getAll`,{headers});
  }
}

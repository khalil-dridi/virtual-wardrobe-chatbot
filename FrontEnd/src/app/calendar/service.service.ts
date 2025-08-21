import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private myToken=localStorage.getItem('accessToken');
  private apiUrl="http://localhost:8080/events/"
  constructor(private httpClient : HttpClient){}

  addEvent(event: any,id:any): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.post<any>(`${this.apiUrl}add/${id}`, event,{headers});
  }

  deleteEvents(id:string): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.delete<any>(`${this.apiUrl}delete/${id}`, {headers});
  }
  updateEvents(event:any,id:string): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.put<any>(`${this.apiUrl}update/${id}`, event,{headers});
  }
  getAllEvents(id:number): Observable<any[]>{
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
    return this.httpClient.get<any[]>(`${this.apiUrl}getAll/${id}`,{headers});
  }
}

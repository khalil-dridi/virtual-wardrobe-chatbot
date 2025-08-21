import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendenceService {
  private myToken=localStorage.getItem('accessToken1');
  private apiUrl="http://localhost:8080/tendency/"
  constructor(private httpClient : HttpClient){}


  addTendence(formData: FormData): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.post<any>(`${this.apiUrl}add`, formData,{headers});
  }
  deleteTendence(id:string): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.delete<any>(`${this.apiUrl}delete/${id}`, {headers});
  }
  updateTendence(formData: FormData,id:string): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.put<any>(`${this.apiUrl}update/${id}`, formData,{headers});
  }
  getAllTendence(): Observable<any[]>{
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
    return this.httpClient.get<any[]>(`${this.apiUrl}getAll`,{headers});
  }
}

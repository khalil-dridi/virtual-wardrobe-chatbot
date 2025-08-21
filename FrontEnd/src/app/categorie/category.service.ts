import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private myToken=localStorage.getItem('accessToken');
  private apiUrl="http://localhost:8080/clothes/"
  constructor(private httpClient : HttpClient){}


  addClothes(formData: FormData): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.post<any>(`${this.apiUrl}add`, formData,{headers});
  }
  deleteClothes(id:string): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.delete<any>(`${this.apiUrl}delete/${id}`, {headers});
  }
  updateClothes(formData: FormData,id:string): Observable<any> {
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
   

    return this.httpClient.put<any>(`${this.apiUrl}update/${id}`, formData,{headers});
  }
  getAllClothes(id:number): Observable<any[]>{
    const  headers= new HttpHeaders({
        
      'Authorization': `Bearer ${this.myToken}`
    })
    return this.httpClient.get<any[]>(`${this.apiUrl}getAll/${id}`,{headers});
  }
}

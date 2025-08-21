import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myToken=localStorage.getItem('accessToken');
  private myToken1=localStorage.getItem('accessToken1');
  private apiUrl="http://localhost:8080/user/"
  constructor(private httpClient : HttpClient){}
  deleteUser1(id:number ) : Observable<User>
  {
   

  const headers= new HttpHeaders({
        
    'Authorization': `Bearer ${this.myToken1}`
  })

    return this.httpClient.delete<User>(`${this.apiUrl}delete/${id}`,{headers});
  }

  deleteUser(id:number ) : Observable<User>
  {
   

  const headers= new HttpHeaders({
        
    'Authorization': `Bearer ${this.myToken}`
  })

    return this.httpClient.delete<User>(`${this.apiUrl}delete/${id}`,{headers});
  }
 
    
     
    
  


  getUser(id:number,token:String ): Observable<any>
  {
    const headers = new HttpHeaders ({
      "Autorization" : `Bearer ${token}`
    });
    return this.httpClient.get<any>(this.apiUrl+"getUserById"+id,{headers})
  }
  updateUserImage(id: number, imageFile: File): Observable<any> {
    const url = `${this.apiUrl}updateUserImage/${id}`;
    
    const formData: FormData = new FormData();
    formData.append('imagefile', imageFile);
console.log(this.myToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.myToken}`
    });

    return this.httpClient.put(url, formData, { headers });
  }
  updateUser(userData: any) : Observable<any>{
    const url = `${this.apiUrl}updateUserP/${userData.id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.myToken}`
    });
    return this.httpClient.put(url, userData,{ headers });
  }
  getAllUsers(myToken: string): Observable<any[]> { // Return type is Users[]
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.httpClient.get<any[]>(this.apiUrl + 'getAllUsers', { headers });
  }
}



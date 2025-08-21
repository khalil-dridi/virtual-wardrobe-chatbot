import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:5000/reply';  // Adjust URL as needed

  constructor(private http: HttpClient) {}

  getReply(question: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify({ question: question });

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }
}

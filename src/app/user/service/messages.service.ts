import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _HttpClient:HttpClient) { }
  getAllMessages(): Observable<any[]> {
    const token = localStorage.getItem('adminToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this._HttpClient.get<any[]>("http://localhost:8000/api/messages", httpOptions);
  }
}

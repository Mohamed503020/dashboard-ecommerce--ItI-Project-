import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      })
    };
    return this.httpClient.get<User[]>("http://localhost:8000/api/users",httpOptions);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8000/api/showUser/${id}`);
  }

  updateUser(userInfo:User,id:number)  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      })
    };
    return this.httpClient.post<User>(`http://localhost:8000/api/updateUser/${id}`,
    userInfo,httpOptions)
    


  }
  deleteUser(id:number): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      })
    };
    return this.httpClient.delete<User>(`http://localhost:8000/api/delete/${id}`,httpOptions);

  }
}

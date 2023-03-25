import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor( private _httpClient:HttpClient) { }

login(data:Login):Observable<any>{
  return this._httpClient.post(`http://localhost:8000/api/adminLogin`,data,{
    headers:new HttpHeaders({
      Accept:"application/json"})}
      )
}
}

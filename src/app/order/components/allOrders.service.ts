import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn:'any'})
export class AllOrdersService {

constructor(private http: HttpClient) { }
getAllOrders():Observable<any[]>{
    // const token = localStorage.getItem('token');
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${token}`
    //   })
    // };
  
   return this.http.get<any[]>('http://localhost:8000/api/getAllOrders');
   
   
   }

   getOrderDetail(id:number):Observable<any[]>{
    // const token = localStorage.getItem('token');
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${token}`
    //   })
    // };
  
   return this.http.get<any[]>(`http://localhost:8000/api/getOrderDetailById/${id}`);
   
   
   }
 
}

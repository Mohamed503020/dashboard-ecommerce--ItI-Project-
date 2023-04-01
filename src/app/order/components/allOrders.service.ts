import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderStatus } from './OrderStatus';

@Injectable({providedIn:'any'})
export class AllOrdersService {

constructor(private http: HttpClient) { }
getAllOrders():Observable<any[]>{
    const token = localStorage.getItem('adminToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  
   return this.http.get<any[]>('http://localhost:8000/api/getAllOrders',httpOptions);
   
   
   }

   getOrderDetail(id:number):Observable<any[]>{
    const token = localStorage.getItem('adminToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  
   return this.http.get<any[]>(`http://localhost:8000/api/getOrderDetailById/${id}`,httpOptions);
   
   
   }
   
   changeOrderStatus(id:number,status:number):Observable<OrderStatus>{
    const token = localStorage.getItem('adminToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<OrderStatus>(`http://localhost:8000/api/changeOrderStatus/${id}`,{status},httpOptions);  
   }
}

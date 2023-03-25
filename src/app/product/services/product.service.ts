import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  token=localStorage.getItem('adminToken')

  constructor(
  private _httpClient:HttpClient
    ) { }
    createProduct(product:any):Observable<any>{
     let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
return this._httpClient.post('http://localhost:8000/api/products',product,{headers})
    }
}

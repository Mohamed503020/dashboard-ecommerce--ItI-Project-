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


    geTAllproducts():Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',

           }) }
  return this._httpClient.get<any>("http://localhost:8000/api/products",httpOptions)
}
      createProduct(product:any):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
           }) }
return this._httpClient.post('http://localhost:8000/api/products',product,httpOptions)

}

}

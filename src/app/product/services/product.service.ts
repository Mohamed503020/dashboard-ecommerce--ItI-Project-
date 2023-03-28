import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  token = localStorage.getItem('adminToken');

  constructor(private _httpClient: HttpClient) {}
  createProduct(product: any): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this._httpClient.post(
      'http://localhost:8000/api/products',
      product,
      { headers }
    );
  }

  getAllProduct(): Observable<any[]> {
    return this._httpClient.get<any[]>('http://localhost:8000/api/products');
  }

  getSingleProduct(id: number): Observable<any> {
    return this._httpClient.get<any>(
      `http://localhost:8000/api/products/${id}`
    );
  }

  deleteProduct(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      }),
    };
    return this._httpClient.delete<any>(
      `http://localhost:8000/api/products/${id}`,
      httpOptions
    );
  }

  updateProduct(id: number, product: any): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this._httpClient.post(
      `http://localhost:8000/api/product/update/${id}`,
      product,
      { headers }
    );
  }
}

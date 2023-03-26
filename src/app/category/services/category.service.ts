import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient:HttpClient) { }

  saveNewCategory(cat:Category):Observable<Category>{
    console.log(cat);
    
    return   this._httpClient.post<Category>(`http://localhost:8000/api/categories`,cat,{
      headers:new HttpHeaders({
        'accept':'application/json'
      })
    })
   }

   updateCategoryById(cat:Category,catId:number|null):Observable<Category>{
    console.log(cat);
    return   this._httpClient.put<Category>(`http://localhost:8000/api/categories/${catId}`,cat,{
      headers:new HttpHeaders({
        'accept':'application/json'
      })
    })
   }

   getCategories():Observable<Category[]>{
    
    return this._httpClient.get<Category[]>(`http://localhost:8000/api/categories`);
}

getByCatId(catId:string):Observable<Category>{
  return   this._httpClient.get<Category>(`http://localhost:8000/api/categories/${catId}`);
 }


 deleteCategory(catId:number):Observable<Category>{
  console.log(catId);
  
  return   this._httpClient.delete<Category>(`http://localhost:8000/api/categories/${catId}`,{
    headers:new HttpHeaders({
      'accept':'application/json'
    })
  })
 }

 



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products, CreateProduct, UpdateProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private urlApi = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(
    private http: HttpClient){}

  getAllProducts(){
    return this.http.get<Products[]>(this.urlApi)
  }

  getProduct(id:number){
    return this.http.get<Products>(`${this.urlApi}/${id}`)
  }

  create(dto:CreateProduct){
    return this.http.post<Products>(this.urlApi, dto)
  }

  update(dto:UpdateProduct, id:number){
    return this.http.put<Products>(`${this.urlApi}/${id}`,dto)
  }

  delete(id:number){
    return this.http.delete<Products[]>(`${this.urlApi}/${id}`)
  }
}

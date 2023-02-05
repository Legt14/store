import { Injectable } from '@angular/core';
import { Category, Products } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private urlApi = 'https://young-sands-07814.herokuapp.com/api/categories/';
  constructor(private http: HttpClient) {}

  getAll(limit:number, offset:number){
    let params = new HttpParams();
    params = params.append('limit', limit);
    params = params.append('offset', offset);

    const requestOptions = { params: params };

    return this.http.get<Category[]>(`${this.urlApi}`, requestOptions);
  }

  getByCategory(category_id: string|null, limit: number, offset: number) {
    let params = new HttpParams();
    params = params.append('limit', limit);
    params = params.append('offset', offset);

    const requestOptions = { params: params };

    return this.http.get<Products[]>(`${this.urlApi}${category_id}/products`, requestOptions);
  }
}

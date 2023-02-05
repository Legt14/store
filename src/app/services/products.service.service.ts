import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Products, CreateProduct, UpdateProduct } from '../models';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private urlApi = 'https://young-sands-07814.herokuapp.com/api/';

  constructor(private http: HttpClient) {}

  getAll(limit: number, offset: number): Observable<Products[]>{
    let params = new HttpParams();
    params = params.set('limit', limit);
    params = params.set('offset', offset);

    const requestOptions = { params: params };

    return this.http.get<Products[]>(`${this.urlApi}products`, requestOptions)
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getAllProducts() {
    return this.http.get<Products[]>(`${this.urlApi}products`);
  }


  getProduct(id: string) {
    return this.http.get<Products>(`${this.urlApi}products/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err);
      })
    );
  }

  create(dto: CreateProduct): Observable<Products> {
    return this.http.post<Products>(`${this.urlApi}products`, dto);
  }

  update(dto: UpdateProduct, id: string) {
    return this.http.put<Products>(`${this.urlApi}products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<Products[]>(`${this.urlApi}products/${id}`);
  }

  handleErrors(error: HttpErrorResponse): Observable<never> {
    if (error.status == 403)
      return throwError('No tiene permisos para realizar la solicitud.');
    if (error.status == 400) return throwError('El producto no existe.');
    if (error.status == 500) return throwError('Error en el servidor.');
    return throwError('Un error inesperado ha ocurrido.');
  }
}

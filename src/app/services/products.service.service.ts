import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Products, CreateProduct, UpdateProduct } from '../models';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private urlApi = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Products[]>(this.urlApi);
  }

  getProductByPage(limit: number, offset: number): Observable<Products[]> {
    return this.http
      .get<Products[]>(`${this.urlApi}`, {
        params: { limit, offset },
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: .16 * item.price
            };
          })
        )
      );
  }

  getProduct(id: number) {
    return this.http.get<Products>(`${this.urlApi}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err);
      })
    );
  }

  create(dto: CreateProduct): Observable<Products> {
    return this.http.post<Products>(this.urlApi, dto);
  }

  update(dto: UpdateProduct, id: number) {
    return this.http.put<Products>(`${this.urlApi}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete<Products[]>(`${this.urlApi}/${id}`);
  }

  handleErrors(error: HttpErrorResponse): Observable<never> {
    if (error.status == 403)
      return throwError('No tiene permisos para realizar la solicitud.');
    if (error.status == 400) return throwError('El producto no existe.');
    if (error.status == 500) return throwError('Error en el servidor.');
    return throwError('Un error inesperado ha ocurrido.');
  }
}

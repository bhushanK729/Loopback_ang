import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { environment } from '@environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  insertProduct(name: string, desc: string, price: number) {
    return this.http.post<Product>(`${environment.baseUrl}products`,
      {
        name: name,
        description: desc,
        price: price
      }).pipe(map(product => {
        return product;
      }));
  }

  getProducts() {
    return this.http.get<Product[]>(`${environment.baseUrl}products`)
      .pipe(map(product => {
        return product;
      }));
  }
}

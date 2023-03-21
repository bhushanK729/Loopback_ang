import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '@app/models/sale';
import { environment } from '@environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  insertSale(id: number, price: number, qty: number, date: string) {
    return this.http.post<Sale>(`${environment.baseUrl}sales`,
      {
        product_id: id,
        quantity: qty,
        total_price: (price * qty),
        sale_date: new Date(date),
        productId: id
      }).pipe(map(sale => {
        return sale;
      }));
  }

  getSales() {
    return this.http.get<Sale[]>(`${environment.baseUrl}sales?filter[include][][relation]=product`)
      .pipe(map(sale => {
        return sale;
      }));
  }
}

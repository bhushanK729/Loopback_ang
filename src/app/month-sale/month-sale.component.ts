import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/models/product';
import { Sale } from '@app/models/sale';
import { first } from 'rxjs';
import { SaleService } from '../service/sale/sale.service';

@Component({
  selector: 'app-month-sale',
  templateUrl: './month-sale.component.html',
  styleUrls: ['./month-sale.component.css']
})
export class MonthSaleComponent implements OnInit {

  sales : Sale[];
  data : any[] = [];

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  //Send request to api using service and fetch all sale record.
  // records are kept into array 
  getSales() {
    this.saleService.getSales().subscribe((response) => {
      if (response.length > 0) {
        this.sales = response;
        this.setMonthYear(this.sales);
        const usernames = new Map<string, number>();

        for (const { sale_date, total_price } of this.sales)
          usernames.set(sale_date, (usernames.get(sale_date) || 0) + total_price);

        usernames.forEach((value: number, key: string) => {
          this.data.push({'sale_date': key, 'total_price': value})
        });
      }
    })
  }

  // function for replace date(y-m-d) format to date(y-m) format
  setMonthYear(arr: any) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].sale_date = arr[i].sale_date.substring(0, 7);
    }
  }
}

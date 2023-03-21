import { Component, OnInit, ViewChild } from '@angular/core';
import { Sale } from '@app/models/sale';
import { SaleService } from '@app/service/sale/sale.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sales: Sale[];
  labels: string[] = [];
  data: number[] = [];
  canvas: any;
  ctx: any;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };

  pieChart: any;

  constructor(private saleService: SaleService) { }
  ngOnInit(): void {
    
  }

  // Send request to api using service and fetch all sale record.
  // records are kept into array 
  getSales() {
    this.saleService.getSales().subscribe((response) => {
      if (response.length > 0) {
        this.sales = response;
        const usernames = new Map<string, number>();

        for (const { product, total_price } of this.sales)
          usernames.set(product.name, (usernames.get(product.name) || 0) + total_price);
        // Push label and values into seprete array
        usernames.forEach((value: number, key: string) => {
          this.labels.push(key);
          this.data.push(value)
        });
        // set data to pie charts
        this.pieChartBrowser();
      }
    })
  }

  //fetch data from api
  ngAfterViewInit(): void {
    this.getSales();
  }

  // draw pie chart from data and binding data to html
  pieChartBrowser(): void {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
          },
        ],
      },
    });
  }

}

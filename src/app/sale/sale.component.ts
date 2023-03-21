import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/models/product';
import { Sale } from '@app/models/sale';
import { ProductService } from '@app/service/product/product.service';
import { first } from 'rxjs';
import { SaleService } from '../service/sale/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
  saleForm: FormGroup;
  isSubmitted = false;
  products : Product[];
  sales : Sale[];
  productSelected: string;
  product_id: number;

  constructor(private formBuilder: FormBuilder, private saleService: SaleService, private productService: ProductService) { }

  ngOnInit(): void {
    this.saleForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      saleQty: ['', Validators.required],
      saleDate: ['', Validators.required]
    });
    // fetch all inserted product records and shown name into dropdown
    this.getProducts();
    // fetch all inserted sales log and shown into list
    this.getSales();
  }

  // common code get form control
  get f() { return this.saleForm.controls; }

  // with help service, fetch all records and pass to html
  getSales() {
    this.saleService.getSales().subscribe((response) => {
      if (response.length > 0) {
        this.sales = response;
      }
    })
  }

  // with help service, fetch all records and pass to dropdown
  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      if (response.length > 0) {
        this.products = response;
      }
    })
  }

  // get product id and price on product selection in dropdown and assign price to from control and product id to varible
  productChange(event: any) {
    this.productSelected = event.target.options[event.target.options.selectedIndex].text;
    this.products.forEach( (value) => {
      if (this.productSelected == value.name){
        this.saleForm.controls['productPrice'].setValue(value.price);
        this.product_id = value.id;
      }
    }); 
  }

  //on click on submit store record/ pass record to api
  submit() {
    this.isSubmitted = true;
    // stop here if form is invalid
    if (this.saleForm.invalid) {
      return;
    }
    console.log(this.saleForm.value)
    this.saleService.insertSale(this.product_id, this.saleForm.controls['productPrice'].value, this.saleForm.controls['saleQty'].value, this.saleForm.controls['saleDate'].value).pipe(first())
      .subscribe(data => {
        if (data !== null) {
          this.closeModal.nativeElement.click();
          this.saleForm.reset()
          this.isSubmitted = false;
          // after adding product, sales list refresh
          setTimeout(() => {
            this.getSales()
          }, 1000)
        }
      })
  }

  // close modal and remove backdrop of modal
  onClose(): void {
    this.saleForm.reset();
    this.closeModal.nativeElement.click();
  }

}

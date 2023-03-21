import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/models/product';
import { first } from 'rxjs';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
  productForm: FormGroup;
  isSubmitted = false;
  products : Product[];

  constructor(private formBuilder: FormBuilder, private service: ProductService) { }

  ngOnInit(): void {
    //add validator to form field and add required validation for all fields
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDesc: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
    // fetch all inserted product and shown into list
    this.getProducts();
  }

  // common code get form controls
  get f() { return this.productForm.controls; }

  // Send request to api using service and fetch all products record.
  // records are kept into array 
  getProducts() {
    this.service.getProducts().subscribe((response) => {
      if (response.length > 0) {
        this.products = response;
      }
    })
  }

  // Function call when submit button is called and pass product record to api
  submit() {
    this.isSubmitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    console.log(this.productForm.value)
    this.service.insertProduct(this.productForm.controls['productName'].value, this.productForm.controls['productDesc'].value, this.productForm.controls['productPrice'].value).pipe(first())
      .subscribe(data => {
        if (data !== null) {
          this.closeModal.nativeElement.click();
          this.productForm.reset()
          this.isSubmitted = false;
          // after adding product, product list refresh
          setTimeout(() => {
            this.getProducts()
          }, 1000)
        }
      })
  }

  // close modal and remove backdrop of modal
  onClose(): void {
    this.productForm.reset();
    this.closeModal.nativeElement.click();
  }
}

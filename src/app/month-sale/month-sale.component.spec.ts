import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSaleComponent } from './month-sale.component';

describe('MonthSaleComponent', () => {
  let component: MonthSaleComponent;
  let fixture: ComponentFixture<MonthSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

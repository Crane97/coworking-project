import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPaymentComponent } from './reservation-payment.component';

describe('ReservationPaymentComponent', () => {
  let component: ReservationPaymentComponent;
  let fixture: ComponentFixture<ReservationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

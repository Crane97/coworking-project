import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysReservationComponent } from './days-reservation.component';

describe('DaysReservationComponent', () => {
  let component: DaysReservationComponent;
  let fixture: ComponentFixture<DaysReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

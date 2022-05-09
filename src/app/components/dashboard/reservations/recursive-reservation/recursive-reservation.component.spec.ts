import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveReservationComponent } from './recursive-reservation.component';

describe('RecursiveReservationComponent', () => {
  let component: RecursiveReservationComponent;
  let fixture: ComponentFixture<RecursiveReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursiveReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

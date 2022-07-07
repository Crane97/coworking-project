import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSwapComponent } from './admin-swap.component';

describe('AdminSwapComponent', () => {
  let component: AdminSwapComponent;
  let fixture: ComponentFixture<AdminSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

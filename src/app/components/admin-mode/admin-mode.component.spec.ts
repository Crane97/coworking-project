import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModeComponent } from './admin-mode.component';

describe('AdminModeComponent', () => {
  let component: AdminModeComponent;
  let fixture: ComponentFixture<AdminModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

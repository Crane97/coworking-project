import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasComponent } from './salas.component';

describe('SalasComponent', () => {
  let component: SalasComponent;
  let fixture: ComponentFixture<SalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

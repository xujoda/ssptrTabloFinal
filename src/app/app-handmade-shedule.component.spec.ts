import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHandmadeSheduleComponent } from './app-handmade-shedule.component';

describe('AppHandmadeSheduleComponent', () => {
  let component: AppHandmadeSheduleComponent;
  let fixture: ComponentFixture<AppHandmadeSheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHandmadeSheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHandmadeSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

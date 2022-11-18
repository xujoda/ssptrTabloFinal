import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjaculationContainerComponent } from './ejaculation-container.component';

describe('EjaculationContainerComponent', () => {
  let component: EjaculationContainerComponent;
  let fixture: ComponentFixture<EjaculationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjaculationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjaculationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

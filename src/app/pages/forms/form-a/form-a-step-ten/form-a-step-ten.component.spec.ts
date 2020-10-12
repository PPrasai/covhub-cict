import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAStepTenComponent } from './form-a-step-ten.component';

describe('FormAStepTenComponent', () => {
  let component: FormAStepTenComponent;
  let fixture: ComponentFixture<FormAStepTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAStepTenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAStepTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

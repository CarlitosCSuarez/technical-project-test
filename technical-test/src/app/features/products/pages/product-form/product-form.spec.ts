import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProduct } from './form-product';

describe('FormProduct', () => {
  let component: FormProduct;
  let fixture: ComponentFixture<FormProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

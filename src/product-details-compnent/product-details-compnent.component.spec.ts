import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsCompnentComponent } from './product-details-compnent.component';

describe('ProductDetailsCompnentComponent', () => {
  let component: ProductDetailsCompnentComponent;
  let fixture: ComponentFixture<ProductDetailsCompnentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsCompnentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsCompnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

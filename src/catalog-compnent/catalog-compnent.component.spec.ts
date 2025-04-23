import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCompnentComponent } from './catalog-compnent.component';

describe('CatalogCompnentComponent', () => {
  let component: CatalogCompnentComponent;
  let fixture: ComponentFixture<CatalogCompnentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCompnentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogCompnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDetailComponent } from './tax-detail.component';

describe('TaxDetailComponent', () => {
  let component: TaxDetailComponent;
  let fixture: ComponentFixture<TaxDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxDetailComponent]
    });
    fixture = TestBed.createComponent(TaxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

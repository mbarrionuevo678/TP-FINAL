import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxItemComponent } from './tax-item.component';

describe('TaxItemComponent', () => {
  let component: TaxItemComponent;
  let fixture: ComponentFixture<TaxItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxItemComponent]
    });
    fixture = TestBed.createComponent(TaxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

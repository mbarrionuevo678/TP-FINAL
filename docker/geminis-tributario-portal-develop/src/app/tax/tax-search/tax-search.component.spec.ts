import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSearchComponent } from './tax-search.component';

describe('TaxSearchComponent', () => {
  let component: TaxSearchComponent;
  let fixture: ComponentFixture<TaxSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxSearchComponent]
    });
    fixture = TestBed.createComponent(TaxSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

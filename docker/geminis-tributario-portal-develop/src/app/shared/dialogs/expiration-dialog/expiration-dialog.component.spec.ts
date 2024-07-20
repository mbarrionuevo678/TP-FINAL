import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationDialogComponent } from './expiration-dialog.component';

describe('ExpirationDialogComponent', () => {
  let component: ExpirationDialogComponent;
  let fixture: ComponentFixture<ExpirationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpirationDialogComponent]
    });
    fixture = TestBed.createComponent(ExpirationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

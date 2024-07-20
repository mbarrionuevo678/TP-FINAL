import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuiteComponent } from './lawsuite.component';

describe('LawSuiteComponent', () => {
  let component: LawsuiteComponent;
  let fixture: ComponentFixture<LawsuiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawsuiteComponent]
    });
    fixture = TestBed.createComponent(LawsuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

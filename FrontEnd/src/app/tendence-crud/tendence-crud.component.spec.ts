import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendenceCrudComponent } from './tendence-crud.component';

describe('TendenceCrudComponent', () => {
  let component: TendenceCrudComponent;
  let fixture: ComponentFixture<TendenceCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TendenceCrudComponent]
    });
    fixture = TestBed.createComponent(TendenceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

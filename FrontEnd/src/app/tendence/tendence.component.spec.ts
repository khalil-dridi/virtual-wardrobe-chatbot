import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendenceComponent } from './tendence.component';

describe('TendenceComponent', () => {
  let component: TendenceComponent;
  let fixture: ComponentFixture<TendenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TendenceComponent]
    });
    fixture = TestBed.createComponent(TendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

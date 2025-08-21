import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebareComponent } from './sidebare.component';

describe('SidebareComponent', () => {
  let component: SidebareComponent;
  let fixture: ComponentFixture<SidebareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebareComponent]
    });
    fixture = TestBed.createComponent(SidebareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

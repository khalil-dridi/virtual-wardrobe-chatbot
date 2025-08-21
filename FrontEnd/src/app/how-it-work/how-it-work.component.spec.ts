import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorkComponent } from './how-it-work.component';

describe('HowItWorkComponent', () => {
  let component: HowItWorkComponent;
  let fixture: ComponentFixture<HowItWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowItWorkComponent]
    });
    fixture = TestBed.createComponent(HowItWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

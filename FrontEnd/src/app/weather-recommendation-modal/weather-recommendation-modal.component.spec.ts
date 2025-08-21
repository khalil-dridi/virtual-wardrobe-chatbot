import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherRecommendationModalComponent } from './weather-recommendation-modal.component';

describe('WeatherRecommendationModalComponent', () => {
  let component: WeatherRecommendationModalComponent;
  let fixture: ComponentFixture<WeatherRecommendationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherRecommendationModalComponent]
    });
    fixture = TestBed.createComponent(WeatherRecommendationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

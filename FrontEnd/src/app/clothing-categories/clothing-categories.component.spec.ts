import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingCategoriesComponent } from './clothing-categories.component';

describe('ClothingCategoriesComponent', () => {
  let component: ClothingCategoriesComponent;
  let fixture: ComponentFixture<ClothingCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothingCategoriesComponent]
    });
    fixture = TestBed.createComponent(ClothingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

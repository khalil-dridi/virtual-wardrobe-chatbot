import { TestBed } from '@angular/core/testing';
import { PatternValidatorsService } from './pattern-validators.service';
describe('PatternValidatorsService', () => {
  let service: PatternValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
